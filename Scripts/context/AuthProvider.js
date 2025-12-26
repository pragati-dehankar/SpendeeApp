import { createContext, useContext, useState } from "react";
import { isStringValid } from "../utils/helpers";
import { createUser } from "../sql/auth/user";
import { createNewSession, deleteSession } from "../sql/auth/session";

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

  const login = async (id, password) => {
    if ((!id && id.trim() === "" && !password) || password.trim() === "") {
      console.log("Id or password empty");
      return;
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
