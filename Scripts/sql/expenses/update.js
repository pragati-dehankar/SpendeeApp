import Connection from "../connection";
import { UPDATE_EXPENSE_SETTLEMENT } from "./query";

export const updateExpenseSettlement = async (expenseId) => {
  const db = await Connection.getConnection();
  return await db.runAsync(
    UPDATE_EXPENSE_SETTLEMENT,
    [expenseId]
  );
};



export const updateExpenseSplits = async (
  expenseId,
  splitAmounts // { userId : amount }
) => {
  const db = await Connection.getConnection();

  try {
    await db.execAsync("BEGIN");

    for (const userId of Object.keys(splitAmounts)) {
      const amount = splitAmounts[userId];

      // update split
      await db.runAsync(
        `
        UPDATE expense_splits
        SET amount_owed = ?
        WHERE expense_id = ? AND user_id = ?
        `,
        [amount, expenseId, userId]
      );

      // update payment & reset status
      await db.runAsync(
        `
        UPDATE payments
        SET amount = ?, status = 'PENDING'
        WHERE expense_id = ? AND payee_id = ?
        `,
        [amount, expenseId, userId]
      );
    }

    // mark expense unsettled again
    await db.runAsync(
      `UPDATE expenses SET is_settled = 0 WHERE id = ?`,
      [expenseId]
    );

    await db.execAsync("COMMIT");
  } catch (e) {
    await db.execAsync("ROLLBACK");
    throw e;
  }
};
