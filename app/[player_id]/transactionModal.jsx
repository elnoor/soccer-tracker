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

export default function TransactionModal({
  transaction,
  isNew,
  children,
  className,
  allowClick = true,
}) {
  const [transactionData, setTransactionData] = useState({
    ...transaction,
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function onClick() {
    if (allowClick) {
      setOpen(true);
    }
  }

  function onChange(e) {
    const { name, value, checked, type } = e.target;
    const val =
      type === "checkbox" ? checked : type === "date" ? new Date(value) : value;
    setTransactionData({ ...transactionData, [name]: val });
  }

  function onCancel() {
    setTransactionData({
      ...transaction,
    });
    setOpen(false);
  }

  async function onSave() {
    if (isNew) {
      await createTransaction(transactionData);
    } else {
      await updateTransaction(transactionData);
    }
    onCancel();
    router.refresh();
  }

  async function onDelete() {
    if (confirm("Are you sure ?")) {
      await deleteTransaction(transaction.id);
      router.refresh();
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
        <Modal
          open={open}
          showCloseButton={false}
          onClose={() => setOpen(false)}
        >
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
              value={transactionData.created_at.toISOString().substring(0, 10)}
              type="date"
              onChange={onChange}
              placeholder="Date"
              required={true}
              className="col-span-2 md:col-span-1"
            />
            <Input
              name="amount"
              value={transactionData.amount}
              onChange={onChange}
              placeholder="Amount"
              required={true}
              className={`col-span-2 md:col-span-1 ${
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
              rows={4}
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
