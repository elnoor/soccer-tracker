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
    <form action={create} className="flex">
      <input
        type="password"
        name="password"
        className="px-4 py-2 text-gray-700 bg-white border rounded-md sm:mx-2 focus:border-teal-500 focus:outline-none focus:ring focus:ring-teal-200 focus:ring-opacity-40"
        placeholder="Password"
        required
      />
      <button
        type="submit"
        className="bg-teal-600 hover:shadow-lg px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-md mx-2 focus:outline-none"
      >
        Enter
      </button>
    </form>
  );
}
