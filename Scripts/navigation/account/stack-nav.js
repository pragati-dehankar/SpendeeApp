import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {  AccountScreen, AuthScreen} from "../../utils/constants";
import AccountDetails from "../../screens/Account/AccountDetails";
import Login from "../../screens/auth/Login";
import SignUp from "../../screens/auth/SignUp";


const Stack=createNativeStackNavigator()
const AuthStackNav=()=>{
    return <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name={AuthScreen.Login} component={Login}/>
        <Stack.Screen name={AuthScreen.SignUp} component={SignUp}/>

    </Stack.Navigator>
}

export default AuthStackNav;