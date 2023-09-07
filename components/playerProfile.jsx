"use client";

import { useState } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { timeAgo } from "@/lib/utils";

export default function PlayerProfile({ player, isAdmin }) {
  const [disabled, setDisabled] = useState(true);

  return (
    <form className="flex flex-col md:flex-row md:items-center text-center gap-2 w-full md:w-auto px-3">
      <p className="text-sm text-gray-500">
        Created{" "}
        <span
          title={player.created_at.toLocaleString()}
          className="hover:cursor-pointer underline"
        >
          {timeAgo(player.created_at, false)}
        </span>
        .
      </p>
      <Input
        name="name"
        placeholder="Name"
        required={true}
        value={player.name}
        disabled={disabled}
      />
      <Input
        name="phone"
        placeholder="Phone"
        required={true}
        value={player.phone}
        disabled={disabled}
      />
      <Input
        name="email"
        placeholder="Email"
        required={true}
        value={player.email}
        disabled={disabled}
      />
      {isAdmin && (
        <>
          {disabled ? (
            <Button secondary onClick={() => setDisabled(false)}>
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                secondary
                className="w-full"
                onClick={() => setDisabled(true)}
              >
                Cancel
              </Button>
              <Button className="md:order-first w-full">Save</Button>
            </div>
          )}
        </>
      )}
    </form>
  );
}
