import { View, Text, StyleSheet, ScrollView } from "react-native";
import GroupAppBar from "./GroupAppBar";

const GroupLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <GroupAppBar />
      <Text style={styles.title}>All Groups</Text>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};
export default GroupLayout;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 20, fontWeight: "600", marginVertical: 5 },
});
