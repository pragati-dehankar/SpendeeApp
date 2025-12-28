import { useNavigation } from "@react-navigation/native";
import { View ,Text, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import { Chip } from "react-native-paper";
import { GroupScreens } from "../../utils/constants";

const GroupListRenderItem = ({group}) => {
    const nav=useNavigation()
    const navigateToGroupscreen=()=>{
        nav.navigate(GroupScreens.GroupItem,{group})
    }
  return (
    <TouchableOpacity onPress={navigateToGroupscreen} style={styles.conatiner}>
        {/* <Text>{JSON.stringify(group)}</Text> */}
        <View style={styles.itemContainer}>
           <View><Text>{group.group_name}</Text>
            <Text>Created At: {new Date(group.created_at).toLocaleDateString()}</Text></View> 
            <Chip>{4}</Chip>
        </View>
    </TouchableOpacity>
  );
};
export default GroupListRenderItem;

const styles=StyleSheet.create({
    conatiner:{
        marginVertical:10,
        padding:5,
        borderWidth:1,
        borderRadius:10,
        width:Dimensions.get('window').width-50,
        // justifyContent:'center',
        // alignItems:'center',
        margin:'auto',
        backgroundColor:'$1e2420',
        shadowColor:'#0000',
        shadowOffset:{height:10},
        shadowOpacity:10,
        shadowRadius:2,
        elevation:10
        },
    itemContainer:{
       flex:1
    }
})