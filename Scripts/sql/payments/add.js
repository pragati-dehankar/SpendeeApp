import { CREATE_NEW_PAYMENT_QUERY } from "./query"

export const addNewPaymentRecord=async(db,payerId,payeeId,amount,expenseId,status)=>{
      try {
        const newPaymentRecord=await  db.runAsync(CREATE_NEW_PAYMENT_QUERY,[
            payeeId,payeeId,amount,expenseId,status
        ])
        console.log("Payment Record Created!",JSON.stringify(newPaymentRecord));
        return newPaymentRecord?.lastInsertedRowId
        
      } catch (error) {
        console.log("error occured in addNrewPaymentRecord!",error);
        throw error
      }
}