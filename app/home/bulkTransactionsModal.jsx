"use client";

import Modal from "../../components/modal";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Input from "../../components/input";
import Select from "../../components/select";
import TextArea from "../../components/textarea";
import Button from "../../components/button";
import { createBulkTransactions } from "./actions";
import { checkResult } from "@/lib/utils";

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
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const indexedPlayers = useMemo(() => {
    return players.reduce((acc, cur) => {
      if (cur.is_active) {
        return { ...acc, [cur.id]: cur.name };
      }
      return acc;
    }, {});
  }, players);

  function onChange(e) {
    const { name, value, type } = e.target;
    const val = type === "date" && value ? new Date(value) : value;
    setTransactionData({ ...transactionData, [name]: val });
  }

  function onCancel() {
    setSelectedPlayerIds([]);
    setTransactionData({
      ...defaultTransactionData,
    });
    setOpen(false);
  }

  async function onSave() {
    const success = await createBulkTransactions(
      selectedPlayerIds,
      transactionData
    );
    checkResult(success, () => {
      onCancel();
      router.refresh();
    });
  }

  return (
    <>
      <div onClick={() => setOpen(true)} className={className}>
        {children}
      </div>

      {open && (
        <Modal open={open} showCloseButton={false} onClose={onCancel}>
          <div className="grid grid-flow-row grid-cols-2 md:items-center text-center gap-2">
            <Select
              multiple
              onChange={(ids) => setSelectedPlayerIds(ids)}
              className="col-span-2 md:col-span-1"
              required={true}
            >
              {Object.keys(indexedPlayers).map((id) => (
                <option key={id} value={id}>
                  {indexedPlayers[id]}
                </option>
              ))}
            </Select>
            <p className="text-sm text-gray-500 col-span-2 md:col-span-1">
              {selectedPlayerIds.length === 0
                ? "No selected player"
                : `${selectedPlayerIds.length}: ${selectedPlayerIds
                    .map((i) => indexedPlayers[i])
                    .join(", ")}`}
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
              type="number"
              onChange={onChange}
              placeholder="Amount"
              required={true}
              className={`col-span-1 ${
                !transactionData.amount || !Number(transactionData.amount)
                  ? "!bg-neutral-200/60"
                  : transactionData.amount < 0
                  ? "!bg-red-100/60"
                  : "!bg-emerald-100"
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
            <Button
              onClick={onSave}
              className="w-full"
              disabled={
                !(transactionData.amount || transactionData.amount === 0) ||
                !transactionData.note ||
                !transactionData.created_at ||
                selectedPlayerIds.length === 0
              }
            >
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
