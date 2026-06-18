import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

export const ADMIN_COOKIE_NAME = "mcsa_admin_session";

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function isAdminAccessConfigured() {
  return Boolean(env.adminAccessKey);
}

export function verifyAdminAccessKey(candidate: string) {
  if (!env.adminAccessKey) {
    return false;
  }

  const expected = Buffer.from(digest(env.adminAccessKey));
  const received = Buffer.from(digest(candidate));
  return timingSafeEqual(expected, received);
}

export function getAdminSessionValue() {
  if (!env.adminAccessKey) {
    return "";
  }

  return digest(`mcsa-admin:${env.adminAccessKey}`);
}

export function isAdminAuthenticated() {
  const expected = getAdminSessionValue();
  const received = cookies().get(ADMIN_COOKIE_NAME)?.value;

  if (!expected || !received || expected.length !== received.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(expected), Buffer.from(received));
}
