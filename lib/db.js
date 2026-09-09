import seedData from '../data/seed.json';

// In-memory data store — loaded from seed.json on cold start
let plants = [...seedData.plants];
let categories = [...seedData.categories];
let services = [...seedData.services];
let nextId = 100;

function generateId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + (nextId++);
}

// ── Plants ──────────────────────────────────────────────

export function getPlants({ category, sort, size, search } = {}) {
  let result = [...plants];

  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.scientificName.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (size && size !== 'any') {
    // Filter by short description keywords
    const sizeMap = {
      'small': ['4"', '6"', 'small'],
      'medium': ['8"', '10"', 'medium'],
      'large': ['12"', 'large', 'floor', 'specimen', 'mature'],
    };
    const keywords = sizeMap[size] || [];
    if (keywords.length) {
      result = result.filter(p =>
        keywords.some(k => p.shortDesc.toLowerCase().includes(k) || p.description.toLowerCase().includes(k))
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
      // 'featured' is default order
    }
  }

  return result;
}

export function getPlant(id) {
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
  return plants[index];
}

export function deletePlant(id) {
  const index = plants.findIndex(p => p.id === id);
  if (index === -1) return false;
  plants.splice(index, 1);
  return true;
}

export function getFeaturedPlants() {
  return plants.filter(p => p.featured);
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
    ? (plants.reduce((sum, p) => sum + p.price, 0) / totalPlants).toFixed(2)
    : 0;

  return {
    totalPlants,
    totalStock,
    lowStock,
    totalCategories,
    totalServices,
    avgPrice: parseFloat(avgPrice),
  };
}

// ── Hero Images ─────────────────────────────────────────

export function getHeroImages() {
  return seedData.heroImages;
}
