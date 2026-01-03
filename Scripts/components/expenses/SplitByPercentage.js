import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import { useEffect, useState } from "react";
import SelectPercentage from "./SelectPercentage";

const generateSplitData = (users) => {
  const data = {};
  if (!users || users.length === 0) return data;

  const equalSplit = +(100 / users.length).toFixed(2);

  users.forEach((user) => {
    data[user.id] = equalSplit;
  });

  return data;
};

const SplitByPercentage = ({ visible, users = [], onSubmit }) => {
  const [splitData, setSplitData] = useState({});

  // Initialize split when modal opens
  useEffect(() => {
    if (visible && users.length > 0) {
      setSplitData(generateSplitData(users));
    }
  }, [visible, users]);

  // ✅ FIXED validation (floating point safe)
  const isInvalidPercentage = () => {
    const total = Object.values(splitData).reduce(
      (sum, val) => sum + Number(val || 0),
      0
    );
    return Math.round(total) !== 100;
  };

  const handleUpdate = () => {
    onSubmit(splitData);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => onSubmit(null)}
        contentContainerStyle={styles.modal}
      >
        <Text style={styles.heading}>Split by Percentage</Text>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SelectPercentage
              user={item}
              splitPercentage={splitData[item.id]}
              updateSplitPercentange={(val) =>
                setSplitData((prev) => ({
                  ...prev,
                  [item.id]: Number(val),
                }))
              }
            />
          )}
        />

        <Text style={styles.total}>
          Total:{" "}
          {Object.values(splitData).reduce(
            (sum, v) => sum + Number(v || 0),
            0
          )}
          %
        </Text>

        <Button
          mode="contained"
          disabled={isInvalidPercentage()}
          onPress={handleUpdate}
          style={styles.button}
        >
          Update
        </Button>
      </Modal>
    </Portal>
  );
};

export default SplitByPercentage;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    borderRadius: 12,
    maxHeight: "90%",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  total: {
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "500",
  },
  button: {
    marginTop: 10,
  },
});
