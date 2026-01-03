import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";

const SelectPercentage = ({ user, value, onChange }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{user.name}</Text>
      <TextInput
        value={String(value)}
        keyboardType="numeric"
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
};

export default SelectPercentage;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  name: { width: 120 },
  input: { width: Dimensions.get("window").width / 2 },
});
