import { PaymentStatus } from "../../utils/constants";
import Connection from "../connection";
import { getPaymentStatusOfExpense } from "../expenses/get";
import { updateExpenseSettlement } from "../expenses/update";
import { UPDATE_PAYMENT_QUERY } from "./query";

export const updatePaymentRecord = async (
 expenseId,userId
) => {
    const db=await Connection.getConnection()
  try {
    db.execAsync("BEGIN")
    const updatePaymentRecord = await db.runAsync(
      UPDATE_PAYMENT_QUERY,
      [
        expenseId,userId
      ]
    );

    console.log("Payment Record Updated", JSON.stringify(updatePaymentRecord));

    const payments=await getPaymentStatusOfExpense(expenseId)
    if(payments.length===0){

    }else{
      let flag=0
      for(const payment of payments){
         if(payment.status===PaymentStatus.PENDING){
          flag=1
         }
      }
      if(flag ==0){
        await updateExpenseSettlement(expenseId)
      }
    }

    db.execAsync("COMMIT")
    return updatePaymentRecord;
  } catch (error) {
    console.log("Error in updateNewPaymentRecord:", error);
    db.execAsync("ROLLBACK")
    throw error;
  }
};
