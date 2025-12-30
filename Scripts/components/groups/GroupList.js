import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthProvider";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import getGroupsOfUser from "../../sql/group-members/get";
import GroupListRenderItem from "./groupListRenderItem";

const GroupList = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const data = await getGroupsOfUser(user.id);
      setGroups(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  // Run when screen opens every time
  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [user?.id])
  );

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Your Groups</Text> */}

      {groups.length > 0 ? (
        <FlatList
          data={groups}
          renderItem={({ item }) => <GroupListRenderItem group={item} />}
        />
      ) : (
        <Text>No groups yet. Tap + to create one</Text>
      )}
    </View>
  );
};

export default GroupList;

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
