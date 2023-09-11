"use client";

import { useState } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import CheckBox from "@/components/checkbox";
import { createPlayer, updatePlayer, deletePlayer } from "./actions";
import { useRouter } from "next/navigation";

/**
 * @param {boolean} isNew tells whether player is new or existing one
 */
export default function PlayerProfile({ player, isAdmin, isNew }) {
  const router = useRouter();
  const [playerData, setPlayerData] = useState({ ...player });
  const [disabled, setDisabled] = useState(!isNew);
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    const { name, value, checked, type } = e.target;
    const val = type === "checkbox" ? checked : value;
    setPlayerData({ ...playerData, [name]: val });
  }

  function onCancel() {
    setPlayerData({ ...player });
    setDisabled(true);
  }

  async function onSave() {
    setLoading(true);
    if (isNew) {
      const id = await createPlayer(playerData);
      router.replace(`/player/${id}`); // redirect() doesn't work here for some reason, probably Nextjs bug, use router.replace() instead
    } else {
      await updatePlayer(playerData);
      setDisabled(true);
    }
    setLoading(false);
  }

  async function onDelete() {
    const playerName = prompt(
      `If you are sure to delete, type name "${player.name}" below to confirm:`
    );
    if (playerName === player.name) {
      await deletePlayer(player.id);
      router.replace("/"); // redirect() doesn't work here for some reason, probably Nextjs bug, use router.replace() instead
    } else if (playerName) {
      alert("Entered named didn't match player's name!");
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center text-center gap-2">
      {playerData.created_at && (
        <p className="text-xs text-gray-500 text-center">
          Created on <br />
          {playerData.created_at.toLocaleDateString()}
        </p>
      )}
      <Input
        name="name"
        value={playerData.name}
        onChange={onChange}
        placeholder="Name"
        required={true}
        disabled={disabled}
      />
      {isAdmin && (
        <>
          <Input
            name="phone"
            value={playerData.phone}
            onChange={onChange}
            placeholder="Phone"
            required={true}
            disabled={disabled}
          />
          <Input
            name="email"
            value={playerData.email}
            onChange={onChange}
            placeholder="Email"
            required={true}
            disabled={disabled}
          />
        </>
      )}

      <div className="flex gap-3">
        <CheckBox
          name="is_active"
          checked={playerData.is_active}
          onChange={onChange}
          className="flex-1 justify-center"
          disabled={disabled}
        >
          Active
        </CheckBox>
        <CheckBox
          name="is_guest"
          checked={playerData.is_guest}
          onChange={onChange}
          className="flex-1 justify-center"
          disabled={disabled}
        >
          Guest
        </CheckBox>
      </div>

      {isAdmin && (
        <div className="flex gap-2">
          {disabled ? (
            <>
              <Button
                secondary
                className="w-full"
                onClick={() => setDisabled(false)}
              >
                Edit
              </Button>
              {!isNew && (
                <Button secondary className="w-full" onClick={onDelete}>
                  Delete
                </Button>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <Button secondary className="w-full" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button onClick={onSave} className="w-full md:order-first">
                    Save
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
