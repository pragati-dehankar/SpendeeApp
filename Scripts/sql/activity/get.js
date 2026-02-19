import Connection from "../connection";

export const getAllActivities = async () => {
  const db = await Connection.getConnection();

  return await db.getAllAsync(`
    SELECT 
      a.id,
      a.activity,
      a.created_at,
      u.name
    FROM activities a
    JOIN users u ON u.id = a.user_id
    ORDER BY a.id DESC
  `);
};
