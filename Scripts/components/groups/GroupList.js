import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthProvider";
import { useEffect, useState } from "react";
import getGroupsOfUser from "../../sql/group-members/get";
import GroupListRenderItem from "./groupListRenderItem";

const GroupList = () => {
  const { user, isLoggedIn } = useAuth();   // SAFE
  const [groups, setGroups] = useState([]);

  const id = user?.id;  // Prevent null crash

  useEffect(() => {
    if (!id) {
      console.log("⚠ User not loaded yet, skipping group fetch");
      return;
    }

    getGroupsOfUser(+id)
      .then(setGroups)
      .catch(err => console.log("Error fetching groups:", err));

  }, [id]);

  // Loading state UI
  if (!user || !id) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading user...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Groups</Text>

      {groups.length > 0 ? (
        <FlatList
          data={groups}
          renderItem={({ item }) => <GroupListRenderItem group={item} />}
        />
      ) : (
        <Text>No groups yet. Create one!</Text>
      )}
    </View>
  );
};

export default GroupList;

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" }
});
