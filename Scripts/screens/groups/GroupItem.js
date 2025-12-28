import { useRoute } from "@react-navigation/native";
import { View ,Text} from "react-native"


const GroupItem=()=>{
    const {params:{group}}=useRoute()
    return (
        <View>
            <Text>
           {group.group_name}
            </Text>
        </View>
    )
}
export default GroupItem;