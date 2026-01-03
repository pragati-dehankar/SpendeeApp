import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useLayoutEffect, useState } from "react";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthProvider";
import { CreateNewGroup } from "../../sql/group/create";
import { SafeAreaView } from "react-native-safe-area-context";

const AddNewGroup = () => {
  const { user } = useAuth();
  const [groupName, setGroupName] = useState("");
  const navigation = useNavigation();

  const addNewGroup = async () => {
    if (!groupName.trim()) {
      alert("Enter group name");
      return;
    }

    try {
      await CreateNewGroup(groupName, user.id);

      // ✅ CORRECT: return to AllGroups inside same stack
      navigation.goBack();

    } catch (err) {
      console.log("Error adding group:", err);
      alert("Error adding group");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "New Group",
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.row}>
            <IconButton icon="image-plus" size={35} />
            <TextInput
              mode="outlined"
              placeholder="Group name"
              value={groupName}
              onChangeText={setGroupName}
              style={styles.input}
            />
          </View>

          <Button mode="contained" onPress={addNewGroup} style={styles.btn}>
            Add Group
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddNewGroup;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  row: { flexDirection: "row", alignItems: "center" },
  input: { flex: 1, fontSize: 18, height: 50 },
  btn: { marginTop: 20 },
});
