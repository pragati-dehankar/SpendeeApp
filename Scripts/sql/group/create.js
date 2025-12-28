import Connection from '../connection'
import { createGroupMembers } from '../group-members/create'
import { CREATE_NEW_GROUP_QUERY } from './queries'

export const CreateNewGroup = async (name, creator_id) => {
  let db;
  try {
    db = await Connection.getConnection();
    console.log("🚀 Starting TXN");
    
    await db.execAsync("BEGIN");

    // Insert new group
    const group = await db.runAsync(CREATE_NEW_GROUP_QUERY, [name, +creator_id]);
    console.log("Group created:", group);

    // ⛔ FIX HERE — correct key name
    const groupId = group.lastInsertRowId;   

    if (!groupId) throw new Error("⚠ Failed to get groupId");

    // Add creator as member
    await createGroupMembers([+creator_id], Number(groupId), db);
    console.log("Group members added!");

    console.log("📌 Committing TXN");
    await db.execAsync("COMMIT");

    return groupId;

  } catch (error) {
    console.log("❌ TXN Failed:", error);

    // avoid crash if db is unavailable
    try { 
      if (db) await db.execAsync("ROLLBACK");
    } catch (rollbackErr) {
      console.log("Rollback error →", rollbackErr);
    }

    throw error;
  }
};
