import { View, StyleSheet, FlatList } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import { useEffect, useState } from "react";
import SelectPercentage from "./SelectPercentage";

const SplitByPercentage = ({ visible, users, onSubmit }) => {
  const [splitData, setSplitData] = useState({});

  useEffect(() => {
    if (users.length > 0) {
      const value = 100 / users.length;
      const obj = {};
      users.forEach((u) => (obj[u.id] = value.toFixed(2)));
      setSplitData(obj);
    }
  }, [users]);

  const total = Object.values(splitData).reduce(
    (s, v) => s + Number(v),
    0
  );

  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={styles.full}>
        <FlatList
          data={users}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
            <SelectPercentage
              user={item}
              value={splitData[item.id]}
              onChange={(v) =>
                setSplitData((p) => ({ ...p, [item.id]: v }))
              }
            />
          )}
        />

        <Button
          mode="contained"
          disabled={total !== 100}
          onPress={() => onSubmit(splitData)}
        >
          Update
        </Button>
      </Modal>
    </Portal>
  );
};

export default SplitByPercentage;

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "space-between",
  },
});
