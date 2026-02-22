import Connection from "../connection";

export const deleteGroup = async (groupId) => {
  const db = await Connection.getConnection();

  try {
    await db.execAsync("BEGIN");

    /* 1️⃣ get expense ids of this group */
    const expenses = await db.getAllAsync(
      `SELECT id FROM expenses WHERE group_id = ?`,
      [groupId]
    );

    const expenseIds = expenses.map(e => e.id);

    if (expenseIds.length > 0) {

      const placeholders = expenseIds.map(() => "?").join(",");

      /* 2️⃣ delete payments */
      await db.runAsync(
        `DELETE FROM payments WHERE expense_id IN (${placeholders})`,
        expenseIds
      );

      /* 3️⃣ delete splits */
      await db.runAsync(
        `DELETE FROM expense_splits WHERE expense_id IN (${placeholders})`,
        expenseIds
      );

      /* 4️⃣ delete activity related to those expenses */
      await db.runAsync(
        `DELETE FROM activities 
         WHERE activity LIKE '%expense%' 
         AND user_id IS NOT NULL`
      );
    }

    /* 5️⃣ delete expenses */
    await db.runAsync(
      `DELETE FROM expenses WHERE group_id = ?`,
      [groupId]
    );

    await db.runAsync(`
  DELETE FROM activities
  WHERE activity LIKE '%expense%'
  AND id NOT IN (
    SELECT a.id
    FROM activities a
    JOIN expenses e
    ON a.activity LIKE '%' || e.amount || '%'
  )
`);

    /* 6️⃣ delete group members */
    await db.runAsync(
      `DELETE FROM group_members WHERE group_id = ?`,
      [groupId]
    );

    /* 7️⃣ delete group */
    await db.runAsync(
      `DELETE FROM groups WHERE id = ?`,
      [groupId]
    );

    await db.execAsync("COMMIT");

  } catch (e) {
    await db.execAsync("ROLLBACK");
    throw e;
  }
};