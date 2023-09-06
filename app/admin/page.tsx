import { redirect } from "next/navigation";
import { checkPasswordAndStore, isAdmin } from "@/lib/auth";
import Button from "@/components/button.jsx";

export default function Login() {
  if (isAdmin()) {
    redirect("/admin/transactions");
  }

  async function submitPassword(formData: FormData) {
    "use server";
    if (checkPasswordAndStore(formData.get("password"))) {
      redirect("/admin/transactions");
    }
  }

  return (
    <form action={submitPassword} className="flex">
      <input
        type="password"
        name="password"
        placeholder="Password"
        required={true}
        className="bg-white text-gray-700 border focus:border-teal-500 rounded-full px-4 py-2 sm:mx-2 focus:outline-none focus:ring focus:ring-teal-200 focus:ring-opacity-40"
      />
      <Button type="submit">Enter</Button>
    </form>
  );
}
