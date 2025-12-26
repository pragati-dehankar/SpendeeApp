import { View, Text, StyleSheet } from "react-native";

const dummyGroups = ["Friends", "Family", "Work"]; // replace later with DB

const GroupList = () => {
  return (
    <View style={styles.box}>
      {dummyGroups.map((g, i) => (
        <Text key={i} style={styles.item}>• {g}</Text>
      ))}
    </View>
  );
};
export default GroupList;

const styles = StyleSheet.create({
  box: { padding: 10 },
  item: { fontSize: 18, marginVertical: 4 },
});
