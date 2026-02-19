import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Chip, Icon } from "react-native-paper";
import { GroupScreens } from "../../utils/constants";
import { useAppState } from "../../context/AppStateProvider";
import { deleteGroup } from "../../sql/group/delete";

const GroupListRenderItem = ({ group, refreshGroups }) => {
  const { setSelectedGroup } = useAppState();
  const nav = useNavigation();

  const navigateToGroupscreen = () => {
    setSelectedGroup(group);
    nav.navigate(GroupScreens.GroupItem);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete group?",
      "This will remove all expenses of this trip",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteGroup(group.id);
              refreshGroups?.();
            } catch (e) {
              alert("Unable to delete group");
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={navigateToGroupscreen} style={styles.container}>
      
      {/* LEFT CONTENT */}
      <View>
        <Text style={styles.name}>{group.group_name}</Text>

        <Text style={styles.date}>
          Created: {new Date(group.created_at).toLocaleDateString()}
        </Text>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actions}>

        {/* ➜ NEXT BUTTON */}
        <Chip
          icon="arrow-right"
          onPress={navigateToGroupscreen}
          style={styles.nextChip}
          textStyle={{ color: "#fff" }}
        >
          Next
        </Chip>

        {/* 🗑 DELETE */}
        <Chip
          onPress={handleDelete}
          textStyle={{ color: "red" }}
        >
          Delete
        </Chip>

      </View>
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

    elevation: 4,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  date: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },

  actions: {
    gap: 8,
    alignItems: "flex-end",
  },

  nextChip: {
    backgroundColor: "#2ecc71",
  },
});
