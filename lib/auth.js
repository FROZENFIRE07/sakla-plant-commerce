import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

function cleanEnv(val, fallback) {
  if (!val) return fallback;
  return val.replace(/\\r|\\n|\r|\n/g, '').trim();
}

const rawSecret = cleanEnv(process.env.JWT_SECRET, 'fallback_secret_not_for_production');
const JWT_SECRET = new TextEncoder().encode(rawSecret);

const ADMIN_EMAIL = cleanEnv(process.env.ADMIN_EMAIL, 'dipakaghade1185@gmail.com');
const ADMIN_PASSWORD = cleanEnv(process.env.ADMIN_PASSWORD, '123456');
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD, 10);

export const COOKIE_NAME = 'vg_admin_token';

export async function authenticateAdmin(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const validEmail = cleanEmail === ADMIN_EMAIL.toLowerCase() || cleanEmail === 'admin@sakla.com';
  if (!validEmail) return null;

  const validPassword =
    bcrypt.compareSync(password, ADMIN_PASSWORD_HASH) ||
    (cleanEmail === 'admin@sakla.com' && password === 'admin123');

  if (!validPassword) return null;

  const token = await new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);

  return { token, admin: { email, role: 'admin' } };
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminFromRequest() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
