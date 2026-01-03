import { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button, Chip, Icon, PaperProvider, TextInput } from "react-native-paper";
import SplitByPercentage from "../../components/expenses/SplitByPercentage";
import { useAppState } from "../../context/AppStateProvider";
import { getMembersOfGroup } from "../../sql/group-members/get";

const SplitType = { percentage: "percentage", equally: "equally" };

const AddExpense = () => {
  const { selectedGroup } = useAppState();
  const [users, setUsers] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [splitType, setSplitType] = useState(SplitType.equally);
  const [showModal, setShowModal] = useState(false);
  const [splitResult, setSplitResult] = useState(null);

  useLayoutEffect(() => {
    getMembersOfGroup(selectedGroup)
      .then((rows) =>
        setUsers(rows.map((r) => ({ id: r.user_id, name: r.name })))
      )
      .catch(console.log);
  }, []);

  return (
    <PaperProvider>
      <SplitByPercentage
        visible={showModal}
        users={users}
        onSubmit={(data) => {
          setSplitResult(data);
          setShowModal(false);
        }}
      />

      <View style={styles.container}>
        <Text>Select Split Type</Text>

        <View style={styles.chips}>
          <Chip
            icon={splitType === SplitType.equally ? "check" : undefined}
            onPress={() => setSplitType(SplitType.equally)}
          >
            Equally
          </Chip>

          <Chip
            icon={splitType === SplitType.percentage ? "check" : undefined}
            onPress={() => {
              setSplitType(SplitType.percentage);
              setShowModal(true);
            }}
          >
            Percentage
          </Chip>
        </View>

        <View style={styles.inputRow}>
          <Icon source="receipt" size={24} />
          <TextInput
            placeholder="Description"
            value={desc}
            onChangeText={setDesc}
            style={styles.input}
          />
        </View>

        <View style={styles.inputRow}>
          <Icon source="currency-rupee" size={24} />
          <TextInput
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
          />
        </View>

        <Button mode="contained" onPress={() => console.log(splitResult)}>
          Create Split
        </Button>
      </View>
    </PaperProvider>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: { padding: 20 },
  chips: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  input: {
    width: Dimensions.get("window").width - 120,
  },
});
