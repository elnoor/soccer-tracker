import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isAdmin } from "@/lib/utils.js";

export default function Login() {
  if (isAdmin()) {
    redirect("/admin/transactions");
  }

  async function create(formData: FormData) {
    "use server";
    const password = formData.get("password");
    if (password && process.env.ADMIN_PASSWORD === password) {
      cookies().set("admin_password", password);
      redirect("/admin/transactions");
    }
  }

  return (
    <form action={create}>
      <input type="password" name="password" placeholder="Password" required />
      <button
        type="submit"
        className="group rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-5 py-1 hover:shadow-lg active:shadow-sm transition-all"
      >
        Enter
      </button>
    </form>
  );
}
