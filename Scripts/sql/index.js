import Connection from './connection'
import { CreateActivityTable } from './tables/activity'
import { CreateExpensesTable } from './tables/expenses'
import { CreateExpenseSplitsTable } from './tables/expenses-splits'
import { CreateTableFriends } from './tables/friends'
import { CreateGroupTable } from './tables/group'
import { CreateGroupMembersTable } from './tables/groupMembers'
import { CreatePaymentTable } from './tables/payments'
import { SessionTable } from './tables/session'
import { alterTableUsers, tableDefUsers, UsersTable } from './tables/users'

const getAllTables=async()=>{
    try {
        const db=await Connection.getConnection()
        const QUERY=`SELECT name FROM sqlite_master WHERE type='table'`;
        const result=await db.getAllAsync(QUERY)
        console.log(JSON.stringify(result));
        
    } catch (error) {
        console.log("Error while getting all tables:",error);
        throw error
    }
}

export const onInitDatabse=async()=>{
   try {
    const db=await Connection.getConnection()
    await db.execAsync(UsersTable) 
    await db.execAsync(SessionTable) 
    await db.execAsync(CreateGroupTable) 
    await db.execAsync(CreateGroupMembersTable) 
    await db.execAsync(CreateActivityTable) 
    await db.execAsync(CreateExpensesTable) 
    await db.execAsync(CreateExpenseSplitsTable) 
    await db.execAsync(CreateTableFriends) 
    await db.execAsync(CreatePaymentTable) 
    // await db.execAsync(alterTableUsers) 
    await getAllTables()
    // return
   } catch (error) {
    console.log("Error while initializing Databse Tables",error);
    throw error
   }
}
export const onErrorInitializationDatabse=async()=>{
   alert("Something went wrong!")
}
