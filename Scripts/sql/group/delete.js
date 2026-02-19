import Connection from "../connection";

export const deleteGroup = async (groupId) => {
  const db = await Connection.getConnection();

  try {
    await db.execAsync("BEGIN");

    await db.runAsync("DELETE FROM group_members WHERE group_id = ?", [groupId]);
    await db.runAsync("DELETE FROM expenses WHERE group_id = ?", [groupId]);
    await db.runAsync("DELETE FROM groups WHERE id = ?", [groupId]);

    await db.execAsync("COMMIT");
  } catch (e) {
    await db.execAsync("ROLLBACK");
    throw e;
  }
};
