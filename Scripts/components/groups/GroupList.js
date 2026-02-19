import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthProvider";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import getGroupsOfUser from "../../sql/group-members/get";
import GroupListRenderItem from "./groupListRenderItem";

const GroupList = () => {
  const { user } = useAuth();

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ✅ LOAD GROUPS */
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

  /* ✅ AUTO REFRESH WHEN SCREEN FOCUSED */
  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [user?.id])
  );

  /* ⏳ LOADING */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {groups.length > 0 ? (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <GroupListRenderItem
              group={item}
              refreshGroups={fetchGroups}   // ⭐ FIXED
            />
          )}
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
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
