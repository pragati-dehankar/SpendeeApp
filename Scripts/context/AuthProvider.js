import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isStringValid } from "../utils/helpers";
// import { createUser, getUserById } from "../sql/auth/user";
import { createUser, getUserById, getUserByEmail } from "../sql/auth/user";
import { createNewSession, deleteSession, getSession } from "../sql/auth/session";

const AuthContext = createContext({
  user: { id: 0, name: "", email: "", phone: "" },
  isLoggedIn: false,
  login: async (id, password) => {},
  sigup: async (name, email, phone, password) => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: 0, name: "", email: "", phone: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load session from AsyncStorage or DB
  useEffect(() => {
    async function checkSession() {
      try {
        // Check AsyncStorage first
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
          return;
        }

        // Fallback to DB session
        const sessions = await getSession();
        console.log("Prev Sessions: ", JSON.stringify(sessions));

        if (!sessions || sessions.length === 0) return;
        if (sessions.length > 1) {
          await deleteSession();
          return;
        }

        const dbUser = await getUserById(sessions[0].user_id);
        if (!dbUser) return;

        setUser(dbUser);
        setIsLoggedIn(true);
        await AsyncStorage.setItem("user", JSON.stringify(dbUser));
      } catch (error) {
        console.log("Error checking session:", error);
      }
    }
    checkSession();
  }, []);



const login = async (email, password) => {
  if (!isStringValid([email, password])) {
    alert("Enter email and password");
    return;
  }

  try {
    const dbUser = await getUserByEmail(email);

    // 🛑 USER NOT FOUND
    if (!dbUser) {
      alert("User not found");
      return;
    }

    // 🛑 PASSWORD MISMATCH
    if (dbUser.password !== password) {
      alert("Incorrect password");
      return;
    }

    await deleteSession();
    await createNewSession(dbUser.id);

    setUser(dbUser);
    setIsLoggedIn(true);
    await AsyncStorage.setItem("user", JSON.stringify(dbUser));

    console.log("Login successful");

  } catch (error) {
    console.log("Error while login:", error);
    alert("Login failed");
  }
};


  const sigup = async (name, email, phone, password) => {
    if (!isStringValid([name, email, phone, password])) {
      console.log("Input params were empty");
      return;
    }
    try {
      const dbUser = await createUser(name, email, phone, password);
      console.log("User is created successfully");

      console.log("creating session!");
      await deleteSession();
      await createNewSession(dbUser?.id);

      setUser(dbUser);
      setIsLoggedIn(true);
      await AsyncStorage.setItem("user", JSON.stringify(dbUser)); // persist
      console.log("Session created and user persisted");
    } catch (error) {
      console.log("Error while signUp: ", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await deleteSession();
      setUser({ id: 0, name: "", email: "", phone: "" });
      setIsLoggedIn(false);
      await AsyncStorage.removeItem("user"); // clear persisted user
      console.log("Logged out and AsyncStorage cleared");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, sigup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;