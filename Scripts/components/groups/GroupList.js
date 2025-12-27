import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthProvider";
import { useEffect } from "react";
import { GET_GROUPS_OF_USER } from "../../sql/group-members/queries";
import getGroupsOfUser from "../../sql/group-members/get";

const dummyGroups = ["Friends", "Family", "Work"]; // replace later with DB

const GroupList = () => {
  const {user:{id}}=useAuth()
  useEffect(()=>{
    getGroupsOfUser(+id)
  },[])
  return (
    <View style={styles.box}>
      {dummyGroups.map((g, i) => (
        <Text key={i} style={styles.item}>• {g}</Text>
      ))}
    </View>
  );
};
export default GroupList;

const styles = StyleSheet.create({
  box: { padding: 10 },
  item: { fontSize: 18, marginVertical: 4 },
});
