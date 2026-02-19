import Connection from "../connection";

export const isGroupNameExists = async (groupName) => {
  const db = await Connection.getConnection();

  const result = await db.getFirstAsync(
    `
    SELECT id FROM groups
    WHERE LOWER(TRIM(group_name)) = LOWER(TRIM(?))
    `,
    [groupName]
  );

  return !!result;
};
