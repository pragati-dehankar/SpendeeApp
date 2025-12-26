import Connection from '../connection'
import { createGroupMembers } from '../group-members/create'
import { CREATE_NEW_GROUP_QUERY } from './queries'

export const CreateNewGroup=async(name,creator_id)=>{
try {
    const db=await Connection.getConnection()
    console.log("Starting TXn ");
    

    await db.execAsync("BEGIN")

    const group=await db.runAsync(CREATE_NEW_GROUP_QUERY,[name,creator_id])
    console.log("Group created! :",JSON.stringify(group));
    
    const groupId=group.lastInsertedRowId

    await createGroupMembers([creator_id],groupId,db)
    console.log("Group members created");
    console.log("Comitting TXN");
    
    

    await db.execAsync("COMMIT")
    return groupId
} catch (error) {
    console.log("TXN failed");
    
    await db.execAsync("ROLLBACK")
    throw error
}
}