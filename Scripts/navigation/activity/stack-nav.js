import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ActivityScreen } from "../../utils/constants";
import AllActivities from "../../screens/Activity/AllActivities";


const Stack=createNativeStackNavigator()
const ActivityStackNav=()=>{
    return <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name={ActivityScreen.AllActivities} component={AllActivities}/>

    </Stack.Navigator>
}

export default ActivityStackNav;