import { CREATE_NEW_PAYMENT_QUERY } from "./query";

export const addNewPaymentRecord = async (
  db,
  payerId,   // 👈 who OWES money
  payeeId,   // 👈 who PAID money
  amount,
  expenseId,
  status
) => {
  try {
    const result = await db.runAsync(
      CREATE_NEW_PAYMENT_QUERY,
      [
        payerId,   // ✅ CORRECT
        payeeId,   // ✅ CORRECT
        amount,
        expenseId,
        status,
      ]
    );

    console.log("Payment Record Created!", result);
    return result?.lastInsertRowId;
  } catch (error) {
    console.log("Error in addNewPaymentRecord:", error);
    throw error;
  }
};
