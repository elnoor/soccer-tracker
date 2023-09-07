import { notFound, redirect } from "next/navigation";
import Button from "@/components/button.jsx";
import { isAdmin, checkPasswordAndSave } from "./actions";

export default async function Auth() {
  if (await isAdmin()) {
    notFound();
  }

  async function submitPassword(formData: FormData) {
    "use server";
    if (await checkPasswordAndSave(formData.get("password"))) {
      redirect("/");
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
      <Button type="submit" onClick={undefined}>
        Enter
      </Button>
    </form>
  );
}
