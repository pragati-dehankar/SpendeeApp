import { View ,Text} from "react-native"
import { useAuth } from "../../context/AuthProvider";


const AccountDetails=()=>{
    const auth=useAuth()
    return (
        <View>
            <Text>
                   {JSON.stringify(auth?.user)}
            </Text>
        </View>
    )
}
export default AccountDetails;