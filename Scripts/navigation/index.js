import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View ,Text} from "react-native"
import GroupStackNav from "./groups/stack-nav"
import { TabScreens } from "../utils/constants"
import FriendStackNav from "./friends/stack-nav"
import ActivityStackNav from "./activity/stack-nav"
import AccountStackNav from "./account/stack-nav"
import { Feather } from '@expo/vector-icons';
import AuthStackNav from "./account/stack-nav"
import { useAuth } from "../context/AuthProvider"

const Tab=createBottomTabNavigator()
const Stack=createNativeStackNavigator()

const MainNavigator=()=>{
  const auth=useAuth()
  if(!auth.isLoggedIn){
    return(<NavigationContainer>
      <AuthStackNav/>
    </NavigationContainer>)
  }
   return <NavigationContainer>
    <Tab.Navigator>
        <Tab.Screen
  name={TabScreens.Groups}
  component={GroupStackNav}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Feather name="users" color={color} size={size} />
    ),
  }}
/>

        <Tab.Screen options={{
    tabBarIcon: ({ color, size }) => (
      <Feather name="user" color={color} size={size} />
    ),
  }} name={TabScreens.Friends} component={FriendStackNav}/>
        <Tab.Screen options={{
    tabBarIcon: ({ color, size }) => (
      <Feather name="activity" color={color} size={size} />
    ),
  }} name={TabScreens.Activity} component={ActivityStackNav}/>
        <Tab.Screen options={{
    tabBarIcon: ({ color, size }) => (
      <Feather name="package" color={color} size={size} />
    ),
  }} name={TabScreens.Account} component={AccountStackNav}/>
    </Tab.Navigator>
   </NavigationContainer>
}

export default MainNavigator;