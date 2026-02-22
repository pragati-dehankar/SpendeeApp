import Connection from "../connection";
import { GET_ACTIVITY_OF_USER } from "./query";

export const getAllActivities = async (userId) => {
  const db = await Connection.getConnection();

  return await db.getAllAsync(
    `
    SELECT * FROM activities
    WHERE user_id = ?
    ORDER BY id DESC
    `,
    [userId]
  );
};



export const getActivityOfUser = async (userId) => {
  const db = await Connection.getConnection();

  const result = await db.getAllAsync(
    GET_ACTIVITY_OF_USER,
    [userId]
  );

  return result;
};