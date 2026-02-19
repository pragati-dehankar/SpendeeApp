import { PaymentStatus } from "../../utils/constants";
import Connection from "../connection";
import { addNewActivity } from "../activity/add";
import { addNewPaymentRecord } from "../payments/add";

import {
  CREATE_NEW_EXPENSE_QUERY,
  CREATE_NEW_EXPENSE_SPLITS_QUERY,
} from "./query";

export const addNewExpense = async (
  expenseData,
  amount,
  description,
  loggedInUserId,
  groupId
) => {
  if (!description || !amount || !loggedInUserId || !groupId) {
    throw new Error("Missing required expense fields");
  }

  const db = await Connection.getConnection();

  try {
    console.log("Transaction Start!");
    await db.execAsync("BEGIN");

    // 1️⃣ CREATE EXPENSE
    const expenseId = await addExpenseRecord(
      db,
      description,
      amount,
      loggedInUserId,
      groupId
    );

    // 2️⃣ CREATOR ACTIVITY
    await addNewActivity(
      db,
      `Added expense ₹${amount}`,
      loggedInUserId
    );

    // 3️⃣ SPLITS + PAYMENTS
    for (const userId of Object.keys(expenseData)) {
      if (+userId === loggedInUserId) continue;

      const share = (amount * expenseData[userId]) / 100;

      // split record
      await addExpenseSplitRecord(db, expenseId, +userId, share);

      // activity for owing user
      await addNewActivity(
        db,
        `You owe ₹${share}`,
        +userId
      );

      // ✅ CORRECT PAYMENT RECORD
      await addNewPaymentRecord(
  db,
  loggedInUserId,   // payer (who paid)
  +userId,          // payee (who owes)
  share,
  expenseId,
  PaymentStatus.PENDING
);

    }

    await db.execAsync("COMMIT");
    console.log("Transaction Completed!");

    return expenseId;
  } catch (error) {
    console.log("Transaction Failed!");
    await db.execAsync("ROLLBACK");
    throw error;
  }
};

/* ---------------- HELPERS ---------------- */

const addExpenseRecord = async (
  db,
  description,
  amount,
  paidBy,
  groupId
) => {
  const res = await db.runAsync(
    CREATE_NEW_EXPENSE_QUERY,
    [description, amount, paidBy, groupId, 0]
  );

  return res.lastInsertRowId;
};

const addExpenseSplitRecord = async (
  db,
  expenseId,
  userId,
  amountOwed
) => {
  await db.runAsync(
    CREATE_NEW_EXPENSE_SPLITS_QUERY,
    [expenseId, userId, amountOwed]
  );
};
