"use client";

import Modal from "../../components/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../../components/input";
import TextArea from "../../components/textarea";
import Button from "../../components/button";
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "./actions";
import { checkResult } from "@/lib/utils";

export default function TransactionModal({
  transaction,
  isNew,
  children,
  className = "",
  enabled = true,
}) {
  const [transactionData, setTransactionData] = useState({
    ...transaction,
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function onClick() {
    if (enabled) {
      setOpen(true);
    }
  }

  function onChange(e) {
    const { name, value, type } = e.target;
    const val = type === "date" && value ? new Date(value) : value;
    setTransactionData({ ...transactionData, [name]: val });
  }

  function onCancel() {
    setTransactionData({
      ...transaction,
    });
    setOpen(false);
  }

  async function onSave() {
    let success;
    if (isNew) {
      const id = await createTransaction(transactionData);
      success = id > -1;
    } else {
      success = await updateTransaction(transactionData);
    }

    checkResult(success, () => {
      onCancel();
      router.refresh();
    });
  }

  async function onDelete() {
    if (confirm("Are you sure ?")) {
      const success = await deleteTransaction(transaction.id);
      checkResult(success, () => router.refresh());
    }
  }

  return (
    <>
      {isNew ? (
        <div onClick={onClick} className={className}>
          {children}
        </div>
      ) : (
        <tr onClick={onClick} className={className}>
          {children}
        </tr>
      )}

      {open && (
        <Modal open={open} showCloseButton={false} onClose={onCancel}>
          {!isNew && (
            <div className="basis-full mb-3 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Transaction Id: {transactionData.id}
              </p>
              <Button secondary onClick={onDelete} className="text-sm !py-1">
                Delete Transaction
              </Button>
            </div>
          )}
          <div className="grid grid-flow-row grid-cols-2 md:items-center text-center gap-2">
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
            <Button
              onClick={onSave}
              className="w-full"
              disabled={
                !(transactionData.amount || transactionData.amount === 0) ||
                !transactionData.note ||
                !transactionData.created_at
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
