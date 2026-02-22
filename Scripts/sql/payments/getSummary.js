import Connection from "../connection";

export const getUserBalanceSummary = async (userId) => {
  const db = await Connection.getConnection();

  const lentRow = await db.getFirstAsync(
    `
    SELECT COALESCE(SUM(amount), 0) AS total
    FROM payments
    WHERE payee_id = ?
    AND payer_id != ?
    AND status = 'PENDING'
    `,
    [userId, userId]
  );
  
  const borrowedRow = await db.getFirstAsync(
    `
    SELECT COALESCE(SUM(amount), 0) AS total
    FROM payments
    WHERE payer_id = ?
    AND payee_id != ?
    AND status = 'PENDING'
    `,
    [userId, userId]
  );

  return {
    lent: Number(lentRow.total) || 0,
    borrowed: Number(borrowedRow.total) || 0,
  };
};