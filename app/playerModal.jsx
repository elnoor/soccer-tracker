"use client";

import Modal from "../components/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../components/input";
import CheckBox from "../components/checkbox";
import Button from "../components/button";
import { createPlayer, deletePlayer, updatePlayer } from "./actions";

export default function PlayerModalButton({
  player,
  isNew,
  children,
  className,
}) {
  const [open, setOpen] = useState(false);
  const [playerData, setPlayerData] = useState({ ...player });
  const router = useRouter();

  function onChange(e) {
    const { name, value, checked, type } = e.target;
    const val = type === "checkbox" ? checked : value;
    setPlayerData({ ...playerData, [name]: val });
  }

  function onCancel() {
    setPlayerData({ ...player });
    setOpen(false);
  }

  async function onSave() {
    if (isNew) {
      await createPlayer(playerData);
    } else {
      await updatePlayer(playerData);
    }
    onCancel();
    router.refresh();
  }

  async function onDelete() {
    const playerName = prompt(
      `If you are sure to delete, type name "${player.name}" below to confirm:`
    );
    if (playerName === player.name) {
      await deletePlayer(player.id);
      router.refresh();
    } else if (playerName) {
      alert("Entered named didn't match player's name!");
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)} className={className}>
        {children}
      </div>

      <Modal open={open} showCloseButton={false} onClose={() => setOpen(false)}>
        {!isNew && (
          <div className="basis-full mb-3 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Created on {playerData.created_at.toLocaleDateString()}
            </p>
            <Button secondary onClick={onDelete} className="text-sm !py-1">
              Delete Player
            </Button>
          </div>
        )}
        <div className="grid grid-flow-row grid-cols-2 md:items-center text-center gap-2">
          <Input
            name="name"
            value={playerData.name}
            onChange={onChange}
            placeholder="Name"
            required={true}
            className="col-span-2 md:col-span-1"
          />
          <Input
            name="phone"
            value={playerData.phone}
            onChange={onChange}
            placeholder="Phone"
            required={true}
            className="col-span-2 md:col-span-1"
          />
          <Input
            name="email"
            value={playerData.email}
            onChange={onChange}
            placeholder="Email"
            required={true}
            className="col-span-2 md:col-span-1"
          />

          <div className="col-span-2 md:col-span-1 flex gap-2">
            <CheckBox
              name="is_active"
              checked={playerData.is_active}
              onChange={onChange}
              className="flex-1 justify-center"
            >
              Active
            </CheckBox>
            <CheckBox
              name="is_guest"
              checked={playerData.is_guest}
              onChange={onChange}
              className="flex-1 justify-center"
            >
              Guest
            </CheckBox>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button onClick={onSave} className="w-full">
            Save
          </Button>
          <Button secondary className="w-full" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
