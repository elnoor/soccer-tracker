"use server";

import { cookies } from "next/headers";

const cookieName = "admin_password";

/**
 * Checks if admin is logged in
 */
export async function isAdmin() {
  let password = cookies().get(cookieName);
  if (password && password.value) {
    return process.env.ADMIN_PASSWORD === password.value;
  }
  return false;
}

/**
 * Will check if given password matches the records and if yes it will persist it in a cookie
 */
export async function checkPasswordAndSave(password) {
  if (password && process.env.ADMIN_PASSWORD === password) {
    cookies().set(cookieName, password, { secure: true });
    return true;
  }
  return false;
}

export async function logOut() {
  cookies().delete(cookieName);
}
