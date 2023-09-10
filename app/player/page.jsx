import { notFound } from "next/navigation";
import PlayerProfile from "./playerProfile";
import { isAdmin } from "../auth/actions";

export default async function NewPlayer() {
  const _isAdmin = await isAdmin();

  if (!_isAdmin) {
    notFound();
  }

  const newPlayer = {
    name: "",
    email: "",
    phone: "",
    is_guest: true,
    is_active: true,
  };

  return <PlayerProfile player={newPlayer} isAdmin={_isAdmin} isNew={true} />;
}
