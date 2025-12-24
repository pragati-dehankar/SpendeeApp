import { createContext, useContext, useState } from "react";


const AuthContext=createContext({user:null,isLoggedIn:false,login:async(id,password)=>{},sigup:async(name,password,phone)=>{},logout:()=>{}})


export const useAuth=()=>useContext(AuthContext)
const AuthProvider=({children})=>{
const [user,setUser]=useState(null)
const [isLoggedIn,setIsLoggedIn]=useState(false)

const login=async(id,password)=>{
    
}
const sigup=async(name,password,phone)=>{

}
const logout=()=>{
  
}
return <AuthContext.Provider value={{user,isLoggedIn,login,sigup,logout}}>{children}</AuthContext.Provider>
}

export default AuthProvider