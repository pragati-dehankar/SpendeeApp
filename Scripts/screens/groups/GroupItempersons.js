import { View, Text, StyleSheet, FlatList } from "react-native";
import { useAppState } from "../../context/AppStateProvider";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getMembersOfGroup } from "../../sql/group-members/get";
import { FAB, Avatar, Chip } from "react-native-paper";
import { GroupScreens } from "../../utils/constants";
import { useAuth } from "../../context/AuthProvider";

const GroupItemPersons = () => {
  const nav = useNavigation();
  const { selectedGroup } = useAppState();
  const { user } = useAuth();

  const [members, setMembers] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (!selectedGroup?.id) return;

      getMembersOfGroup(selectedGroup.id)
        .then(setMembers)
        .catch(console.log);
    }, [selectedGroup])
  );

  const renderItem = ({ item }) => {
    const isYou = item.user_id === user.id;

    return (
      <View style={styles.card}>
        <Avatar.Text
          size={42}
          label={item.name?.charAt(0).toUpperCase()}
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>

          {isYou && (
            <Chip compact style={styles.youChip} textStyle={{ color: "#fff" }}>
              You
            </Chip>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 🔹 GROUP HEADER */}
      <View style={styles.header}>
        <Avatar.Icon icon="account-group" size={50} />

        <View>
          <Text style={styles.groupName}>
            {selectedGroup?.group_name}
          </Text>

          <Text style={styles.memberCount}>
            {members.length} Members
          </Text>
        </View>
      </View>

      {/* 🔹 MEMBERS LIST */}
      <FlatList
        data={members}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No members yet
          </Text>
        }
      />

      {/* 🔹 ADD MEMBER FAB */}
      <FAB
        icon="account-plus"
        label="Add Member"
        style={styles.fab}
        onPress={() => nav.navigate(GroupScreens.AddGroupMembers)}
      />
    </View>
  );
};

export default GroupItemPersons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },

  groupName: {
    fontSize: 20,
    fontWeight: "700",
  },

  memberCount: {
    color: "gray",
    marginTop: 2,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e2420",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  avatar: {
    marginRight: 12,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  youChip: {
    marginTop: 4,
    backgroundColor: "#2ecc71",
    alignSelf: "flex-start",
  },

  fab: {
    position: "absolute",
    right: 15,
    bottom: 20,
  },
});
