export const CREATE_NEW_EXPENSE_QUERY = `
INSERT INTO expenses (description, amount, paid_by, group_id, is_settled)
VALUES( ?, ?, ?, ?, ?)
`;
export const CREATE_NEW_EXPENSE_SPLITS_QUERY = `
INSERT INTO expense_splits (expense_id, user_id, amount_owed)
VALUES( ?, ?, ?);
`;

export const GET_EXPENSE_OF_A_GROUP=`
SELECT e.*, u.name FROM expenses e
INNER JOIN users u ON u.id =e.paid_by
WHERE group_id =?
`