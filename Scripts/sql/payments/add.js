export const addNewPaymentRecord = async (
  db,
  payerId,
  payeeId,
  amount,
  expenseId,
  status
) => {
  return await db.runAsync(
    `
    INSERT INTO payments (payer_id, payee_id, amount, expense_id, status)
    VALUES (?, ?, ?, ?, ?)
    `,
    [payerId, payeeId, amount, expenseId, status]
  );
};
