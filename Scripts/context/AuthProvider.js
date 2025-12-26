import { createContext, use, useContext, useEffect, useState } from "react";
import { isStringValid } from "../utils/helpers";
import { createUser, getUserById } from "../sql/auth/user";
import { createNewSession, deleteSession, getSession } from "../sql/auth/session";

const AuthContext = createContext({
  user: { id: 0, name: "", email: "", phone: "" },
  isLoggedIn: false,
  login: async (id, password) => {},
  sigup: async (name, password, phone) => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: 0, name: "", email: "", phone: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    async function checkSession(params) {
      const sessions=await getSession()
      console.log("Prev Sessions: ",JSON.stringify(sessions));
     
      if(!sessions && sessions.length===0){
        return
      }
      if(sessions.length>1){
        await deleteSession()
        return
      }
      const user=await getUserById(sessions[0].user_id)
      if(!user){
        return
      }
      setUser(user)
      setIsLoggedIn(true)
    }
    checkSession()
  },[])

  const login = async (id, password) => {
    if (!isStringValid([password]) || !id || id===0) {
      console.log("Id or password Invalid");
      return;
    }
    try {
       const user =await getUserById(id);
    console.log("User retrievd Successfully: ",JSON.stringify(user));

    const isPasswordCorrect=user.password===password
    if(!isPasswordCorrect){
      console.log("InCorrect Password");
      alert("Incorrect Password")
      return
    }
     console.log("creating session!");

      await deleteSession();

      const session = createNewSession(user?.id);
      console.log("Session created successfully: ", session);
      setUser(user)
      setIsLoggedIn(true)
    } catch (error) {
      console.log("Error while login: ",error);
      throw error
    }
  };

  const sigup = async (name, email, phone, password) => {
    if (!isStringValid([name, email, phone, password])) {
      console.log("Input params were empty");
      return;
    }
    try {
      const user = await createUser(name, email, phone, password);
      console.log("User is created successfully");

      console.log("creating session!");

      await deleteSession();

      const session = createNewSession(user?.id);
      console.log("Session created successfully: ", session);

      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Error while signUp: ", error);
      throw error;
    }
  };

  const logout = () => {};
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, sigup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
