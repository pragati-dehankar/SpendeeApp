import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Chip } from "react-native-paper";
import { GroupScreens } from "../../utils/constants";
import { useAppState } from "../../context/AppStateProvider";

const GroupListRenderItem = ({ group }) => {
  const { setSelectedGroup } = useAppState();
  const nav = useNavigation();

  const navigateToGroupscreen = () => {
    setSelectedGroup(group);           // ✅ FULL OBJECT
    nav.navigate(GroupScreens.GroupItem);
  };

  return (
    <TouchableOpacity onPress={navigateToGroupscreen} style={styles.container}>
      <View>
        <Text>{group.group_name}</Text>
        <Text>Created At: {new Date(group.created_at).toLocaleDateString()}</Text>
      </View>
      <Chip>Members</Chip>
    </TouchableOpacity>
  );
};

export default GroupListRenderItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 14,
    borderRadius: 14,
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    backgroundColor: "#ffffff",

    // Android shadow
    elevation: 4,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // layout
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

