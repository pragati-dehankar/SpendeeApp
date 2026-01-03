import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";

const SelectPercentage = ({ user, splitPercentage, updateSplitPercentange }) => {
  const [value, setValue] = useState(String(splitPercentage ?? 0));

  // ✅ sync when parent updates
  useEffect(() => {
    setValue(String(splitPercentage ?? 0));
  }, [splitPercentage]);

  return (
    <View style={styles.row}>
      <Text style={styles.name}>{user.name}</Text>
      <TextInput
        value={value}
        keyboardType="numeric"
        onChangeText={(val) => {
          setValue(val);
          updateSplitPercentange(val);
        }}
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
    marginVertical: 6,
  },
  name: { width: 120 },
  input: { width: Dimensions.get("window").width / 2 },
});
