import Connection from '../../sql/connection'
import { GET_EXPENSE_OF_A_GROUP } from './query'

export const getExpensesOfGroup=async(groupId)=>{
   try {
    const db=await Connection.getConnection()
    const result=await db.getAllAsync(GET_EXPENSE_OF_A_GROUP,[groupId])
    console.log("Expense of groupId: ",groupId,JSON.stringify(result));
    return result
   } catch (error) {
    console.log("Error occured in getExpenseOfGrp: ",error);
    throw error
   }
}