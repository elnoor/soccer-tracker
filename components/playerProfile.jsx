"use client";

import { useState } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { timeAgo } from "@/lib/utils";

export default function PlayerProfile({ player }) {
  const [disabled, setDisabled] = useState(true);

  return (
    <form
      disabled={disabled}
      className="flex flex-col md:flex-row md:items-center text-center gap-2 md:gap-0 w-full md:w-auto px-3"
    >
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
        className="bg-white text-gray-700 border focus:border-teal-500 rounded-full px-4 py-2 sm:mx-2 focus:outline-none focus:ring focus:ring-teal-200 focus:ring-opacity-40"
      />
      <Input
        name="phone"
        placeholder="Phone"
        required={true}
        value={player.phone}
      />
      <Input name="email" placeholder="Email" required={true} value={"sss"} />
      {disabled ? (
        <Button secondary onClick={() => setDisabled(false)}>
          Edit
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button
            secondary
            className="w-full"
            onClick={() => setDisabled(false)}
          >
            Cancel
          </Button>
          <Button
            className="md:order-first w-full"
            onClick={() => setDisabled(false)}
          >
            Save
          </Button>
        </div>
      )}
    </form>
  );
}
