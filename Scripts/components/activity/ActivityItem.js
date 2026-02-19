import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { timeAgo } from "../../utils/time";
import { useAuth } from "../../context/AuthProvider";

const ActivityItem = ({ item }) => {
  const { user } = useAuth();

  const isYou = Number(item.user_id) === Number(user.id);

  return (
    <View style={styles.card}>
      <Avatar.Text
        size={40}
        label={(isYou ? "Y" : item.name[0]).toUpperCase()}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.text}>
          <Text style={styles.bold}>{isYou ? "You" : item.name} </Text>
          {item.description}
        </Text>

        <Text style={styles.time}>{timeAgo(item.created_at)}</Text>
      </View>
    </View>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: "#1e2420",
    borderRadius: 14,
    alignItems: "center",
  },
  text: { color: "white", fontSize: 14 },
  bold: { fontWeight: "700" },
  time: { color: "#aaa", marginTop: 4, fontSize: 12 },
});
