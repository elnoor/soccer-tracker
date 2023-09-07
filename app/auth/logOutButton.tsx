"use client";

import Button from "@/components/button";
import { logOut } from "./actions";

export default function LogOutButton() {
  async function onClick() {
    await logOut();
  }
  return (
    <Button onClick={onClick} secondary className="text-sm !py-1">
      Log Out
    </Button>
  );
}
