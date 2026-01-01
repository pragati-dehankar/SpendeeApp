import { View ,Text, StyleSheet, Dimensions} from "react-native"
import SelectContacts from "../../components/friends/SelectContacts";
import { useNavigation } from "@react-navigation/native";
import { useAppState } from "../../context/AppStateProvider";
import { useLayoutEffect, useState } from "react";
import { Button } from "react-native-paper";
import { CreateNewGroupMembersTransaction } from "../../sql/group/create";


const AddGroupMembers=()=>{
    const [selectedContacts,setSelectContacts]=useState([])
    const nav=useNavigation()
    const SelectedGroup=useAppState()

    const addnewMembers=async()=>{
        alert(">>>>")
        // console.log( "selectedContacts);
        
       if(selectedContacts.length === 0){
        console.log("no contacts");
            return
       }
       console.log("adding members",selectedContacts);
       
       try {
        // await CreateNewGroupMembersTransaction(selectedContacts,SelectedGroup.id)
        alert("Success")
       } catch (error) {
        console.log(error);
       }
    }

    useLayoutEffect(()=>{
        nav.setOptions({title:SelectedGroup?.name , headerShadowColor:"", headerRight:
            (props)=>(
                <Button {...props} mode="text" onPress={addnewMembers.bind(this)}>
                     Done
                </Button>
            )
        })
    }
    ,[])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add new members </Text>
            <Button onPress={addnewMembers}>Add Contacts</Button>
                    <SelectContacts selectedContacts={selectedContacts} setSelectContacts={setSelectContacts} />
           
        </View>
    )
}
export default AddGroupMembers;

const styles=StyleSheet.create({
    text:{
        fontSize:20,
        fontWeight:"500"
      
    },
    container:{
        // justifyContent:"center",
        // margin:"auto",
        // alignItems:"center",
        width:Dimensions.get("window").width-50,
          marginHorizontal:"auto",
        paddingTop:20
    }
})