import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { getAllActivities } from "../../sql/activity/get";

const AllActivities = () => {
  const [data, setData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getAllActivities().then(setData);
    }, [])
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
          <Avatar.Text size={36} label={item.name[0]} />

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.activity}</Text>
            <Text style={styles.time}>{item.created_at}</Text>
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
  },
  text: { fontWeight: "500" },
  time: { fontSize: 12, color: "gray" },
  empty: { textAlign: "center", marginTop: 40 },
});
