import Connection from "../connection"
import { GET_GROUPS_OF_USER } from "./queries"

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