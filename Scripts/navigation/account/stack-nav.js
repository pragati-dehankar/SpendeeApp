import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../../context/AuthProvider";
import { AuthScreen, AccountScreen } from "../../utils/constants";

import AccountDetails from "../../screens/Account/AccountDetails";
import Login from "../../screens/auth/Login";
import SignUp from "../../screens/auth/SignUp";

const Stack = createNativeStackNavigator();

const AuthStackNav = () => {
  const { user } = useAuth(); // get current logged-in user

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user?.id ? (
        // User is logged in → show AccountDetails
        <Stack.Screen name={AccountScreen.AccountDetails} component={AccountDetails} />
      ) : (
        // User not logged in → show Login / Signup stack
        <>
          <Stack.Screen name={AuthScreen.Login} component={Login} />
          <Stack.Screen name={AuthScreen.SignUp} component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStackNav;
