import ms from "ms";
import { cookies } from "next/headers";

export const timeAgo = (timestamp, timeOnly) => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export function isAdmin() {
  let password = cookies().get("admin_password");
  return password?.value && process.env.ADMIN_PASSWORD === password?.value;
}
