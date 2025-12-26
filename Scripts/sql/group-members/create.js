import { GROUP_MEMBER_QUERY } from "./queries"

export const createGroupMembers=async(arrOfUsersId,groupId,db)=>{
    if(!arrOfUsersId || arrOfUsersId.length===0){
        throw new Error("No user id present")
    }
    try {
         for(const id of arrOfUsersId){
         const result=await db.runAsync(GROUP_MEMBER_QUERY,[groupId,id])
         console.log("New group member created! :", result);  
     }
    } catch (error) {
        console.log("Error occured while creating new group member :",error);
        throw error
    }
    
}