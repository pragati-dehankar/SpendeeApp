import Connection from '../../sql/connection'
import { GET_PAYMENT_STATUS_OF_EXPENSES } from '../payments/query'
import { GET_EXPENSE_OF_A_GROUP, GET_SPLITS_OF_EXPENSE, GET_SPlITS_OF_EXPENSE } from './query'
import { CHECK_DUPLICATE_EXPENSE } from "./query";

// import Connection from "../connection";
// import { GET_EXPENSE_OF_A_GROUP, GET_SPLITS_OF_EXPENSE } from "./query";

export const getExpensesOfGroup = async (groupId) => {
  const db = await Connection.getConnection();
  return await db.getAllAsync(GET_EXPENSE_OF_A_GROUP, [groupId]);
};

export const getExpensesSplits = async (expenseId) => {
  const db = await Connection.getConnection();

  const result = await db.getAllAsync(
    GET_SPLITS_OF_EXPENSE,
    [expenseId]
  );

  console.log("SPLITS →", result);

  return result;
};





export const getPaymentStatusOfExpense=async(expenseId)=>{
    try {
    const db = await Connection.getConnection();
    const result = await db.getAllAsync(
      GET_PAYMENT_STATUS_OF_EXPENSES,
      [expenseId]
    );

    console.log("PAYMENTS:",expenseId, JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.log("Error in getExpensesSplits:", error);
    throw error;
  }
}




export const isExpenseDescriptionExists = async (groupId, description) => {
  const db = await Connection.getConnection();

  const result = await db.getFirstAsync(
    CHECK_DUPLICATE_EXPENSE,
    [groupId, description.trim()]
  );

  return !!result; // true if found
};
