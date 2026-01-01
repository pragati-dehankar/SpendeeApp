import { useNavigation } from "@react-navigation/native";
import { View ,Text, StyleSheet} from "react-native"
import { FAB } from "react-native-paper";
import { GroupScreens } from "../../utils/constants";


const GroupItemMain=()=>{
    const nav=useNavigation()
    const navigatoToGroupExpense=()=>{
        nav.navigate(GroupScreens.GroupAddExpense)
    }
    return (
        <View style={styles.container}>
            <Text>
                 grou[ItemMain]
            </Text>
            <FAB onPress={navigatoToGroupExpense} style={styles.fab} label="Add expense" icon={'wallet-plus-outline'} />
        </View>
    )
}
export default GroupItemMain;

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    fab:{
        position:'absolute',
        bottom:15,
        right:5
    }
})