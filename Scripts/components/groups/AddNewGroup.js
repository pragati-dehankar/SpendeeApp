import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useState } from "react";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {useAuth} from '../../context/AuthProvider'
import { CreateNewGroup } from "../../sql/group/create";

const AddNewGroup = () => {
  const {user:{id}}=useAuth()
  const [groupName, setGroupName] = useState("");
  const nav = useNavigation();



  const addNewGroup = async() => {
    if(!groupName || groupName.trim()==="") return
    // if (!groupName.trim()) return alert("Enter group name");
    // alert("Group created: " + groupName);
    // nav.goBack(); // redirect after creating
    console.log("Group Name: ",groupName);
    try {
      const groupId=await CreateNewGroup(groupName,+id)
      alert( `Group created with id: ${groupId}`)
    } catch (error) {
      console.log("Error ocurred while creating new group",error);
      
    }
    
  };

  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: true,
      headerTitle: "New Group",
      headerShadowVisible: false,
      headerRight: () => <Button onPress={addNewGroup}>Done</Button>,
      headerLeft: () => (
        <IconButton icon="close" onPress={() => nav.goBack()} />
      ),
    });
  }, [nav, groupName]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <IconButton icon="image-plus" size={35} />
        <TextInput
          value={groupName}
          onChangeText={setGroupName}
          mode="outlined"
          placeholder="Group name"
          style={styles.input}
        />
      </View>
    </View>
  );
};
export default AddNewGroup;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  input: { width: 260, fontSize: 18 },
});
