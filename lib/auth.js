import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  (process.env.JWT_SECRET || 'fallback_secret_not_for_production').trim()
);

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@sakla.com').trim();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'admin123').trim();
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD, 10);


export const COOKIE_NAME = 'vg_admin_token';

export async function authenticateAdmin(email, password) {
  if (email !== ADMIN_EMAIL) return null;

  const valid = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
  if (!valid) return null;

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
