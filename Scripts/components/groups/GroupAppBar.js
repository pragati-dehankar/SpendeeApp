import { useNavigation } from "@react-navigation/native";
import { View , StyleSheet} from "react-native"
import { Appbar } from 'react-native-paper';
import { GroupScreens } from "../../utils/constants";


const GroupAppBar=()=>{
    const nav=useNavigation()
    const navigateToAddScreen=()=>{
        nav.navigate(GroupScreens.AddGroup)
    }
    return (
        <View>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Action  icon={'magnify'} onPress={()=>alert("Serach")} />
                <Appbar.Action  icon={'account-multiple-plus-outline'} onPress={navigateToAddScreen} />
            </Appbar.Header>
        </View>
    )
}
export default GroupAppBar;

const styles=StyleSheet.create({
    appBar:{
        backgroundColor:"transparent",marginLeft:'auto'
    }
})