import Connection from "../connection";
import {
  GET_ALL_GROUP_MEMBERS_BY_ID,
  GET_GROUPS_OF_USER
} from "./queries";

// ✅ FIXED
const getGroupsOfUser = async (userId) => {
  try {
    const db = await Connection.getConnection();

    // 🔴 THIS WAS THE MAIN BUG
    const result = await db.getAllAsync(GET_GROUPS_OF_USER, [userId]);

    console.log("Groups of user:", result);
    return result;
  } catch (error) {
    console.log("error in getGroupsOfUser", error);
    throw error;
  }
};

export default getGroupsOfUser;

// ✅ FIXED
export const getMembersOfGroup = async (groupId) => {
  try {
    const db = await Connection.getConnection();

    // 🔴 SAME BUG HERE
    const result = await db.getAllAsync(
      GET_ALL_GROUP_MEMBERS_BY_ID,
      [groupId]
    );

    console.log("Members of group:", result);
    return result;
  } catch (error) {
    console.log("error in getMembersOfGroup", error);
    throw error;
  }
};
