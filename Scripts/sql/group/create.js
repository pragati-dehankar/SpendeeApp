export const CreateNewGroup = async (name, creator_id) => {
  const db = await Connection.getConnection();
  
  try {
    await db.execAsync("BEGIN");

    // insert group
    const res = await db.runAsync(CREATE_NEW_GROUP_QUERY, [name, creator_id]);
    const groupId = res.lastInsertRowId;  // correct

    if (!groupId) throw new Error("Insert failed, no groupId returned");

    // add user in group members
    await createGroupMembers([creator_id], groupId, db);

    await db.execAsync("COMMIT");
    return groupId;

  } catch (err) {
    await db.execAsync("ROLLBACK").catch(()=>{});
    console.log("Create Group Failed →", err);
    throw err;
  }
};
