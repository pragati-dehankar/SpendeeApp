import Connection from '../../connection'
import { CREATE_USER, GET_USER,GET_USER_BY_EMAIL } from './queries'

export const createUser=async(name,email,phone,password,isRegistered=1)=>{
    try {
        const db=await Connection.getConnection()
        const result=db.runAsync(CREATE_USER,[name,email,phone,password,isRegistered])
        console.log(result.lastInsertRowId);
        return await getUserById(result.lastInsertRowId)
    } catch (error) {
        console.log("Error creating new user",error);
        throw error
    }
}

export const getUserById=async(id)=>{
    try {
        const db=await Connection.getConnection()
        const result=db.getFirstAsync(GET_USER,id)
        console.log(result.lastInsertRowId);
        return result
    } catch (error) {
        console.log("Error while getting user by id: ",error);
        throw error
    }
}

export const getUserByEmail = async (email) => {
  const db = await Connection.getConnection()
  return await db.getFirstAsync(GET_USER_BY_EMAIL, [email])
}