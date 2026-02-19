import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import { GroupScreens } from "../../utils/constants";

const GroupAppBar = () => {
  const nav = useNavigation();

  const navigateToAddScreen = () => {
    nav.navigate(GroupScreens.AddGroup);
  };

  return (
    <View>
      <Appbar.Header style={styles.appBar}>

        {/* 🔍 SEARCH ICON (same logic) */}
        {/* <Appbar.Action
          icon={"magnify"}
          onPress={() => alert("Search")}
        /> */}

        {/* ➕ CREATE GROUP BUTTON (same logic) */}
        <TouchableOpacity
          style={styles.createBtn}
          onPress={navigateToAddScreen}
        >
          <Appbar.Action
            icon={"account-multiple-plus-outline"}
            color="#6C5CE7"
            style={{ margin: 0 }}
          />

          <Text style={styles.createText}>Create Group</Text>
        </TouchableOpacity>

      </Appbar.Header>
    </View>
  );
};

export default GroupAppBar;

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    elevation: 0,
  },

  createBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEAFE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 10,
  },

  createText: {
    color: "#6C5CE7",
    fontWeight: "600",
    fontSize: 13,
    marginLeft: -6, // pulls text closer to icon
  },
});
