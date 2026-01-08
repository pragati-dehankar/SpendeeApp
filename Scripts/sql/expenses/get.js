import Connection from '../../sql/connection'
import { GET_EXPENSE_OF_A_GROUP, GET_SPLITS_OF_EXPENSE, GET_SPlITS_OF_EXPENSE } from './query'

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

export const getExpensesSplits = async (expenseId) => {
  try {
    const db = await Connection.getConnection();
    const result = await db.getAllAsync(
      GET_SPLITS_OF_EXPENSE,
      [expenseId]
    );

    console.log("FINAL expense splits:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.log("Error in getExpensesSplits:", error);
    throw error;
  }
};

