import Connection from "../connection";
import { UPDATE_EXPENSE_SETTLEMENT } from "../expenses/query";
import { PaymentStatus } from "../../utils/constants";

export const updatePaymentRecord = async (expenseId, userId) => {
  const db = await Connection.getConnection();



  try {
    await db.execAsync("BEGIN");

    await db.runAsync(
      `
      UPDATE payments
      SET status = ?
      WHERE expense_id = ? AND payee_id = ?
      `,
      [PaymentStatus.COMPLETE, expenseId, userId]
    );

    const pending = await db.getAllAsync(
      `
      SELECT * FROM payments
      WHERE expense_id = ? AND status = ?
      `,
      [expenseId, PaymentStatus.PENDING]
    );

    if (pending.length === 0) {
      await db.runAsync(
        `UPDATE expenses SET is_settled = 1 WHERE id = ?`,
        [expenseId]
      );
    }

    await db.execAsync("COMMIT");

  } catch (e) {
    await db.execAsync("ROLLBACK");
    throw e;
  }
};


