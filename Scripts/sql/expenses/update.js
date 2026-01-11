import Connection from "../connection";
import { UPDATE_EXPENSE_SETTLEMENT } from "./query";

export const updateExpenseSettlement = async (expenseId) => {
  const db = await Connection.getConnection();
  return await db.runAsync(
    UPDATE_EXPENSE_SETTLEMENT,
    [expenseId]
  );
};
