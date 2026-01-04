import Connection from "../connection"
import { CREATE_NEW_EXPENSE_QUERY, CREATE_NEW_EXPENSE_SPLITS_QUERY } from "./query"

const addNewExpense=async({expenseData,users,amount,description,loggedInUserId,groupId=null})=>{
try {
    const db=await Connection.getConnection()
    db.execAsync("BEGIN")
    console.log("Transaction Start!");

    const expense= await addExpenseRecord(db,description,amount,loggedInUserId,groupId)
    console.log("Expense Record created ",expense);
    
    
    db.execAsync("COMMIT")
    console.log("Transaction Completed!");
    
} catch (error) {
db.execAsync("ROLLBACK")
console.log("Transaction Failed!");

}
}
const addExpenseRecord=async (db,description,amount,paidBy,groupId)=>{
   try {
    const newExpense=await db.runAsync(CREATE_NEW_EXPENSE_QUERY,[description,amount,paidBy,groupId,0])
    console.log("expense record created",JSON.stringify(newExpense));
    return newExpense?.lastInsertedRowId
    
   } catch (error) {
    console.log("Error occured in addexpenserecord:",error);
    throw error
   }
}
const addExpenseSplitRecord=async (db,expenseId,userId,amountOwed)=>{
   try {
    const newExpenseSplit=await db.runAsync(CREATE_NEW_EXPENSE_SPLITS_QUERY,[expenseId,userId,amountOwed])
    console.log("expense record created",JSON.stringify(newExpenseSplit));
    return newExpenseSplit?.lastInsertedRowId
    
   } catch (error) {
    console.log("Error occured in addexpenseSplitrecord:",error);
    throw error
   }
}