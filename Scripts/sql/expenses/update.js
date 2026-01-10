import Connection from "../connection";
import { UPDATE_EXPENSE_SETTLEMET } from "./query";

export const updateExpenseSettlement=async(expenseId)=>{
     try {
        const db = await Connection.getConnection();
        const result = await db.runAsync(
          UPDATE_EXPENSE_SETTLEMET,
          [expenseId]
        );
    
        console.log("updated expense details ",expenseId, JSON.stringify(result));
        return result;
      } catch (error) {
        console.log("Error in updateExpenseSettlement:", error);
        throw error;
      }
}