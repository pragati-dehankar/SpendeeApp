import { View, Text, StyleSheet, Dimensions } from "react-native";
import SelectContacts from "../../components/friends/SelectContacts";
import { useNavigation } from "@react-navigation/native";
import { useAppState } from "../../context/AppStateProvider";
import { useLayoutEffect, useState } from "react";
import { Button } from "react-native-paper";
import { CreateNewGroupMembersTransaction } from "../../sql/group/create";

const AddGroupMembers = () => {
  const [selectedContacts, setSelectContacts] = useState([]);
  const nav = useNavigation();
  const { selectedGroup } = useAppState();

  const addNewMembers = async () => {
    if (selectedContacts.length === 0) {
      console.log("no contacts");
      return;
    }

    console.log("adding members", selectedContacts);

    try {
      await CreateNewGroupMembersTransaction(
        selectedContacts,
        selectedGroup.id
      );

      nav.goBack(); // 🔥 THIS IS IMPORTANT
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Header button updates with latest state
  useLayoutEffect(() => {
    nav.setOptions({
      title: selectedGroup?.group_name ?? "Add Members",
      headerRight: () => (
        <Button mode="text" onPress={addNewMembers}>
          Done
        </Button>
      ),
    });
  }, [nav, selectedContacts]); // 🔥 DEPENDENCY FIX

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add new members</Text>

      <SelectContacts
        selectedContacts={selectedContacts}
        setSelectContacts={setSelectContacts}
      />
    </View>
  );
};

export default AddGroupMembers;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
  container: {
    width: Dimensions.get("window").width - 50,
    alignSelf: "center",
    paddingTop: 20,
  },
});
