"use client";

import Modal from "../../components/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../../components/input";
import TextArea from "../../components/textarea";
import Button from "../../components/button";
import { createBulkTransactions } from "./actions";

export default function BulkTransactionsModal({
  players,
  children,
  className = "",
}) {
  const defaultTransactionData = {
    created_at: new Date(),
    note: "",
    amount: 0,
  };
  const [transactionData, setTransactionData] = useState({
    ...defaultTransactionData,
  });
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function onChange(e) {
    const { name, value, checked, type } = e.target;
    const val =
      type === "checkbox" ? checked : type === "date" ? new Date(value) : value;
    setTransactionData({ ...transactionData, [name]: val });
  }

  function onPlayersSelect(e) {
    const selectedOnes = Object.values(e.target.selectedOptions).map(
      (opt) => opt.value
    );
  }

  function onCancel() {
    setTransactionData({
      ...defaultTransactionData,
    });
    setOpen(false);
  }

  async function onSave() {
    await createBulkTransactions(selectedPlayers, transactionData);
    onCancel();
    router.refresh();
  }

  return (
    <>
      <div onClick={() => setOpen(true)} className={className}>
        {children}
      </div>

      {open && (
        <Modal open={open} showCloseButton={false} onClose={onCancel}>
          <div className="grid grid-flow-row grid-cols-2 md:items-center text-center gap-2">
            <select multiple onChange={onPlayersSelect} className="col-span-1">
              {players
                .filter((p) => p.is_active === true)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>{" "}
            <p className="text-xs text-gray-500 col-span-1">
              {selectedPlayers.reduce((p) => p.name, "")}
            </p>
            <Input
              name="created_at"
              value={
                transactionData.created_at &&
                transactionData.created_at.toISOString().substring(0, 10)
              }
              type="date"
              onChange={onChange}
              placeholder="Date"
              required={true}
              className="col-span-1"
            />
            <Input
              name="amount"
              value={transactionData.amount}
              onChange={onChange}
              placeholder="Amount"
              required={true}
              className={`col-span-1 ${
                transactionData.amount < 0
                  ? "!bg-red-100/60"
                  : "!bg-emerald-100/60"
              }`}
            />
            <TextArea
              name="note"
              value={transactionData.note}
              onChange={onChange}
              placeholder="Note"
              rows={5}
              required={true}
              className="col-span-2"
            />
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
      )}
    </>
  );
}
