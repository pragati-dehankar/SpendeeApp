import Connection from "../connection";
import { createGroupMembers } from "../group-members/create";
import { CREATE_NEW_GROUP_QUERY } from "./queries";

export const CreateNewGroup = async (name, creator_id) => {
  const db = await Connection.getConnection();

  try {
    await db.execAsync("BEGIN");

    const res = await db.runAsync(
      CREATE_NEW_GROUP_QUERY,
      [name, creator_id]
    );

    const groupId = res.lastInsertRowId;
    if (!groupId) throw new Error("Failed to insert group");

    // add creator as member
    await createGroupMembers([creator_id], groupId, db);

    await db.execAsync("COMMIT");
    return groupId;

  } catch (err) {
    await db.execAsync("ROLLBACK").catch(() => {});
    console.log("Create Group Failed →", err);
    throw err;
  }
};
