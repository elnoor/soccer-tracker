import { cookies } from "next/headers";

export function isAdmin() {
  let password = cookies().get("admin_password");
  return password?.value && process.env.ADMIN_PASSWORD === password?.value;
}

export function checkPasswordAndStore(password) {
  if (password && process.env.ADMIN_PASSWORD === password) {
    cookies().set("admin_password", password);
    return true;
  }
  return false;
}
