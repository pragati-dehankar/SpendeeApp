import { View ,Text} from "react-native"
import { ActivityIndicator } from "react-native-paper";


const Fallback=()=>{
    return (
        <View style={{alignItems:'center', justifyContent:'center'}}>
            <Text>
         Spendee=Split Bill App
         <ActivityIndicator/>
            </Text>
        </View>
    )
}
export default Fallback;