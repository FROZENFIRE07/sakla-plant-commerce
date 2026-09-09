import fs from 'fs';
import path from 'path';
import seedData from '../data/seed.json';

// Helper to resolve writable storage path (local data/ or serverless /tmp/)
function getStoragePath(filename) {
  const localDir = path.join(process.cwd(), 'data');
  const localFile = path.join(localDir, filename);

  try {
    if (fs.existsSync(localFile)) {
      // Test writability in local development
      fs.accessSync(localFile, fs.constants.W_OK);
      return localFile;
    }
  } catch {
    // Read-only environment (e.g. AWS Lambda / Vercel Serverless runtime)
  }

  // Fallback to /tmp in serverless environments
  const tmpFile = path.join('/tmp', filename);
  if (!fs.existsSync(tmpFile)) {
    try {
      if (fs.existsSync(localFile)) {
        fs.copyFileSync(localFile, tmpFile);
      } else {
        const initialData = filename === 'plants.json' ? seedData.plants : [];
        fs.writeFileSync(tmpFile, JSON.stringify(initialData, null, 2), 'utf8');
      }
    } catch {}
  }
  return tmpFile;
}

function loadData(filename, fallback) {
  try {
    const filePath = getStoragePath(filename);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error loading ${filename}:`, err);
  }
  return fallback;
}

function saveData(filename, data) {
  try {
    const filePath = getStoragePath(filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error saving ${filename}:`, err);
    return false;
  }
}

// In-memory cache synced with persistent storage
let plants = loadData('plants.json', seedData.plants);
let categories = [...seedData.categories];
let services = [...seedData.services];
let inquiries = loadData('inquiries.json', []);

let nextPlantId = 100 + plants.length;

function generateId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + (nextPlantId++);
}

// ── Plants ──────────────────────────────────────────────

export function getPlants({ category, sort, size, search } = {}) {
  // Reload if cache is empty
  if (!plants || plants.length === 0) {
    plants = loadData('plants.json', seedData.plants);
  }

  let result = [...plants];

  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.scientificName.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  if (size && size !== 'any') {
    const sizeMap = {
      'small': ['4"', '6"', 'small'],
      'medium': ['8"', '10"', 'medium'],
      'large': ['12"', 'large', 'floor', 'specimen', 'mature'],
    };
    const keywords = sizeMap[size] || [];
    if (keywords.length) {
      result = result.filter(p =>
        keywords.some(k => (p.shortDesc || '').toLowerCase().includes(k) || (p.description || '').toLowerCase().includes(k))
      );
    }
  }

  if (sort) {
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.reverse();
        break;
    }
  }

  return result;
}

export function getPlant(id) {
  if (!plants || plants.length === 0) {
    plants = loadData('plants.json', seedData.plants);
  }
  return plants.find(p => p.id === id) || null;
}

export function createPlant(data) {
  const plant = {
    id: generateId(data.name),
    name: data.name,
    scientificName: data.scientificName || '',
    category: data.category || 'show-plants',
    price: parseFloat(data.price) || 0,
    stock: parseInt(data.stock) || 0,
    description: data.description || '',
    shortDesc: data.shortDesc || '',
    tags: data.tags || [],
    careIcons: data.careIcons || [],
    care: data.care || { light: '', water: '', soil: '', temp: '' },
    image: data.image || '',
    gallery: data.gallery || [],
    featured: data.featured || false,
  };
  plants.push(plant);
  saveData('plants.json', plants);
  return plant;
}

export function updatePlant(id, data) {
  const index = plants.findIndex(p => p.id === id);
  if (index === -1) return null;

  plants[index] = {
    ...plants[index],
    ...data,
    id, // preserve ID
    price: data.price !== undefined ? parseFloat(data.price) : plants[index].price,
    stock: data.stock !== undefined ? parseInt(data.stock) : plants[index].stock,
    tags: data.tags || plants[index].tags,
    care: data.care || plants[index].care,
  };
  saveData('plants.json', plants);
  return plants[index];
}

export function deletePlant(id) {
  const index = plants.findIndex(p => p.id === id);
  if (index === -1) return false;
  plants.splice(index, 1);
  saveData('plants.json', plants);
  return true;
}

export function getFeaturedPlants() {
  return plants.filter(p => p.featured);
}

// ── Inquiries & Leads ───────────────────────────────────

export function getInquiries() {
  if (!inquiries) {
    inquiries = loadData('inquiries.json', []);
  }
  return [...inquiries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getInquiry(id) {
  return inquiries.find(i => i.id === id) || null;
}

export function createInquiry(data) {
  const inquiry = {
    id: 'inq_' + Date.now().toString(36),
    name: data.name,
    phone: data.phone,
    email: data.email || '',
    city: data.city || 'India',
    type: data.type || 'purchase',
    plantId: data.plantId || '',
    plantName: data.plantName || '',
    quantity: parseInt(data.quantity) || 1,
    notes: data.notes || '',
    status: 'new', // 'new' | 'contacted' | 'completed' | 'cancelled'
    createdAt: new Date().toISOString(),
  };
  inquiries.unshift(inquiry);
  saveData('inquiries.json', inquiries);
  return inquiry;
}

export function updateInquiry(id, data) {
  const index = inquiries.findIndex(i => i.id === id);
  if (index === -1) return null;

  inquiries[index] = {
    ...inquiries[index],
    ...data,
    id, // preserve id
  };
  saveData('inquiries.json', inquiries);
  return inquiries[index];
}

export function deleteInquiry(id) {
  const index = inquiries.findIndex(i => i.id === id);
  if (index === -1) return false;
  inquiries.splice(index, 1);
  saveData('inquiries.json', inquiries);
  return true;
}

// ── Categories ──────────────────────────────────────────

export function getCategories() {
  return [...categories];
}

// ── Services ────────────────────────────────────────────

export function getServices() {
  return [...services];
}

// ── Dashboard Stats ─────────────────────────────────────

export function getDashboardStats() {
  const totalPlants = plants.length;
  const totalStock = plants.reduce((sum, p) => sum + p.stock, 0);
  const lowStock = plants.filter(p => p.stock <= 5).length;
  const totalCategories = categories.length;
  const totalServices = services.length;
  const avgPrice = totalPlants > 0
    ? Math.round(plants.reduce((sum, p) => sum + p.price, 0) / totalPlants)
    : 0;
  const pendingInquiries = inquiries.filter(i => i.status === 'new').length;
  const totalInquiries = inquiries.length;

  return {
    totalPlants,
    totalStock,
    lowStock,
    totalCategories,
    totalServices,
    avgPrice,
    pendingInquiries,
    totalInquiries,
  };
}

// ── Hero Images ─────────────────────────────────────────

export function getHeroImages() {
  return seedData.heroImages;
}
