import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GroupScreens } from "../../utils/constants"
import AllGroups from "../../screens/groups/AllGroups"
import AddGroup from "../../screens/groups/AddGroup"
import GroupItem from "../../screens/groups/GroupItem"
// import AddGroupMembers from "../../screens/groups/AddGroupMember"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import GroupItemMain from "../../screens/groups/GroupItemMain"
import GroupItemPersons from "../../screens/groups/GroupItempersons"
import AddGroupMembers from "../../screens/groups/GroupMember"
import AddExpense from "../../screens/groups/AddExpense"

const Stack=createNativeStackNavigator()
const Tab=createMaterialTopTabNavigator()
const GroupItemNavigator=()=>{
    return <Tab.Navigator>
        <Tab.Screen options={{title:"Splits",animationEnabled:true}} name={GroupScreens.GroupItemMain} component={GroupItemMain} />
        <Tab.Screen options={{title:"Members"}} name={GroupScreens.GroupItemPersons} component={GroupItemPersons} />
    </Tab.Navigator>
} 
const GroupStackNav=()=>{
    return <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name={GroupScreens.AllGroups} component={AllGroups}/>
        <Stack.Screen name={GroupScreens.AddGroup} component={AddGroup}/>
        <Stack.Screen options={{headerShown:true}} name={GroupScreens.GroupItem} component={GroupItemNavigator}/>
        <Stack.Screen options={{headerShown:true,headerShadowVisible:false}} name={GroupScreens.AddGroupMembers} component={AddGroupMembers}/>
        <Stack.Screen options={{headerShown:true,headerShadowVisible:false}} name={GroupScreens.GroupAddExpense} component={AddExpense}/>
    </Stack.Navigator>
}

export default GroupStackNav;