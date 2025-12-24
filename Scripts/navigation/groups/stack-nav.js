import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GroupScreens } from "../../utils/constants"
import AllGroups from "../../screens/groups/AllGroups"
import AddGroup from "../../screens/groups/AddGroup"
import GroupItem from "../../screens/groups/GroupItem"
import GroupMembers from "../../screens/groups/GroupMember"

const Stack=createNativeStackNavigator()
const GroupStackNav=()=>{
    return <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name={GroupScreens.AllGroups} component={AllGroups}/>
        <Stack.Screen name={GroupScreens.AddGroup} component={AddGroup}/>
        <Stack.Screen name={GroupScreens.GroupItem} component={GroupItem}/>
        <Stack.Screen name={GroupScreens.GroupMembers} component={GroupMembers}/>
    </Stack.Navigator>
}

export default GroupStackNav;