"use client";

import { useState } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { timeAgo } from "@/lib/utils";
import { createPlayer, updatePlayer } from "./actions";
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
    const { name, value } = e.target;
    setPlayerData({ ...playerData, [name]: value });
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

  return (
    <div className="flex flex-col md:flex-row md:items-center text-center gap-2 w-full md:w-auto px-3">
      {playerData.created_at && (
        <p className="text-sm text-gray-500">
          Created{" "}
          <span
            title={playerData.created_at.toLocaleString()}
            className="hover:cursor-pointer underline"
          >
            {timeAgo(playerData.created_at, false)}
          </span>
          .
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
      {isAdmin && (
        <>
          {disabled ? (
            <Button secondary onClick={() => setDisabled(false)}>
              Edit
            </Button>
          ) : (
            <>
              {loading ? (
                <span>Loading...</span>
              ) : (
                <div className="flex gap-2">
                  <Button secondary className="w-full" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button onClick={onSave} className="md:order-first w-full">
                    Save
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
