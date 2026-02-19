import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Modal, Portal, TextInput, Button, Avatar } from "react-native-paper";

const SplitByUnequal = ({
  visible,
  users,
  totalAmount,
  onClose,
}) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    const init = {};
    users.forEach((u) => (init[u.id] = ""));
    setValues(init);
  }, [users]);

  const enteredTotal = Object.values(values).reduce(
    (sum, v) => sum + Number(v || 0),
    0
  );

  const remaining = totalAmount - enteredTotal;

  const getPercentageData = () => {
    const data = {};

    Object.keys(values).forEach((uid) => {
      data[uid] = (values[uid] / totalAmount) * 100;
    });

    return data;
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable
        onDismiss={() => onClose(null)}
        contentContainerStyle={styles.modal}
      >
        <Text style={styles.title}>Split Unequally</Text>

        <Text>Total: ₹{totalAmount}</Text>

        <Text style={{ color: remaining === 0 ? "green" : "red" }}>
          Remaining: ₹{remaining}
        </Text>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Avatar.Text size={32} label={item.name[0]} />

              <Text style={{ flex: 1 }}>{item.name}</Text>

              <TextInput
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
                value={values[item.id]}
                onChangeText={(val) =>
                  setValues({ ...values, [item.id]: val })
                }
              />
            </View>
          )}
        />

        <Button
          mode="contained"
          disabled={remaining !== 0}
          onPress={() => onClose(getPercentageData())}
        >
          Update
        </Button>
      </Modal>
    </Portal>
  );
};

export default SplitByUnequal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 16,
    maxHeight: "85%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 10,
  },
  input: {
    width: 100,
  },
});
