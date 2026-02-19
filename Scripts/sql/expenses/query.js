export const CREATE_NEW_EXPENSE_QUERY = `
INSERT INTO expenses (description, amount, paid_by, group_id, is_settled)
VALUES (?, ?, ?, ?, ?)
`;

export const CREATE_NEW_EXPENSE_SPLITS_QUERY = `
INSERT INTO expense_splits (expense_id, user_id, amount_owed)
VALUES (?, ?, ?)
`;

export const GET_EXPENSE_OF_A_GROUP = `
SELECT 
  e.id,
  e.description,
  e.amount,
  e.paid_by,
  e.group_id,
  e.is_settled,
  e.created_at,
  u.name
FROM expenses e
JOIN users u ON u.id = e.paid_by
WHERE e.group_id = ?
ORDER BY e.id DESC
`;

export const GET_SPLITS_OF_EXPENSE = `
SELECT 
  es.user_id,
  es.amount_owed,
  u.name,
  COALESCE(p.status, 'PENDING') AS status
FROM expense_splits es
JOIN users u 
  ON u.id = es.user_id
LEFT JOIN payments p 
  ON p.expense_id = es.expense_id
 AND p.payee_id = es.user_id  
WHERE es.expense_id = ?
`;


export const UPDATE_EXPENSE_SETTLEMENT = `
UPDATE expenses
SET is_settled = 1
WHERE id = ?
`;

export const CHECK_DUPLICATE_EXPENSE = `
SELECT id FROM expenses
WHERE group_id = ?
AND LOWER(description) = LOWER(?)
LIMIT 1
`;

