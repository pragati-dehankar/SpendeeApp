import Connection from "../connection"
import { GET_ALL_GROUP_MEMBERS_BY_ID, GET_GROUPS_OF_USER } from "./queries"

const getGroupsOfUser=async(userId)=>{
    try {
        const db=await Connection.getConnection()
 const result=db.getAllAsync(GET_GROUPS_OF_USER,+userId)
 console.log("Groups of user: ",result);
 return result 
    } catch (error) {
     console.log("error in getGroupOfUser",error);
        throw error
    }

}
export default getGroupsOfUser

export const getMembersOfGroup=async(groupId)=>{
    try {
        const db=await Connection.getConnection()
 const result=db.getAllAsync(GET_ALL_GROUP_MEMBERS_BY_ID,+groupId)
 console.log("members of Group: ",result);
 return result 
    } catch (error) {
     console.log("error in getMembersOfGroup",error);
        throw error
    }

}