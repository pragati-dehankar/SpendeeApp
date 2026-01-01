import { createContext, useContext, useState } from "react";

// 1️⃣ CREATE context (NOT useContext)
const AppStateContext = createContext({
  selectedGroup: null,
  setSelectedGroup: () => {},
});

// 2️⃣ Custom hook to use context
export const useAppState = () => {
  return useContext(AppStateContext);
};

// 3️⃣ Provider component
const AppStateProvider = ({ children }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <AppStateContext.Provider value={{ selectedGroup, setSelectedGroup }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
