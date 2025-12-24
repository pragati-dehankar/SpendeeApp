import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { FriendScreens } from "../../utils/constants";
import AllFriend from "../../screens/friend/AllFriend";
import AddFriend from "../../screens/friend/AddFriend";
import FriendPage from "../../screens/friend/FriendPage";


const Stack=createNativeStackNavigator()
const FriendStackNav=()=>{
    return <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name={FriendScreens.AllFriends} component={AllFriend}/>
        <Stack.Screen name={FriendScreens.AddFriend} component={AddFriend}/>
        <Stack.Screen name={FriendScreens.FriendPage} component={FriendPage}/>
    </Stack.Navigator>
}

export default FriendStackNav;