import { CREATE_NEW_ACTIVITY_QUERY } from "./query"

export const addNewActivity=async(db,activity,userId)=>{
 try {
    const activityRecord=await db.runAsync(CREATE_NEW_ACTIVITY_QUERY,[
       activity,userId
    ])
    console.log("Activity created!",JSON.stringify(activityRecord));
    return activityRecord?.lastInsertedRowId
 } catch (error) {
    console.log("error in addNewactivit",error);
    throw error
 }
}