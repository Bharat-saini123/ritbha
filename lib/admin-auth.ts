import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_EMAIL = "sainibharat277@gmail.com";
const COOKIE_NAME = "ritbha_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "ritbha-admin-development-secret";
}

function signature(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function createAdminSession() {
  const payload = `${ADMIN_EMAIL}:${Date.now()}`;
  return `${payload}.${signature(payload)}`;
}

export function isValidAdminSession(value?: string) {
  if (!value) return false;
  const separator = value.lastIndexOf(".");
  if (separator < 1) return false;

  const payload = value.slice(0, separator);
  const providedSignature = value.slice(separator + 1);
  const [email, createdAt] = payload.split(":");
  const expectedSignature = signature(payload);

  if (email !== ADMIN_EMAIL || !createdAt || !/^\d+$/.test(createdAt)) return false;
  if (Date.now() - Number(createdAt) > SESSION_MAX_AGE * 1000) return false;
  if (providedSignature.length !== expectedSignature.length) return false;

  return timingSafeEqual(Buffer.from(providedSignature), Buffer.from(expectedSignature));
}

export function adminCookieName() {
  return COOKIE_NAME;
}

export function adminSessionMaxAge() {
  return SESSION_MAX_AGE;
}
