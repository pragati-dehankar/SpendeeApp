import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { useAuth } from "../../context/AuthProvider";
import { getActivityOfUser } from "../../sql/activity/get";

const AllActivities = () => {
  const { user } = useAuth(); 
  const [data, setData] = useState(null);

  const loadActivity = async () => {
    if (!user?.id) return;

    const result = await getActivityOfUser(user.id);
    setData(result);
  };

  useFocusEffect(
    useCallback(() => {
      loadActivity();
    }, [user?.id])
  );


  if (!data) return <ActivityIndicator style={{ marginTop: 40 }} />;


  if (data.length === 0)
    return <Text style={styles.empty}>No activity yet</Text>;


  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Avatar.Text size={36} label={item.name?.[0] || "A"} />

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.activity}</Text>

           <Text style={styles.time}>
  {new Date(item.created_at).toLocaleString([], {
    year: 'numeric',
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })}
</Text>
          </View>
        </View>
      )}
    />
  );
};

export default AllActivities;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 0.5,
    alignItems: "center",
  },

  text: {
    fontWeight: "500",
  },

  time: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
  },
});