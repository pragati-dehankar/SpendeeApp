import Connection from '../../connection'
import { CREATE_USER, GET_USER,GET_USER_BY_EMAIL } from './queries'



export const createUser = async (name, email, phone, password) => {
  const db = await Connection.getConnection();

  const res = await db.runAsync(
    `
    INSERT INTO users (name, email, phone, password)
    VALUES (?, ?, ?, ?)
    `,
    [name, email, phone, password]
  );

  const insertedId = res.lastInsertRowId;

  const user = await db.getFirstAsync(
    `SELECT id, name, email, phone FROM users WHERE id = ?`,
    [insertedId]
  );

  return user; // ✅ MUST RETURN USER
};


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