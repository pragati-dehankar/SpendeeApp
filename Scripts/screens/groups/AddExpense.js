import { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  Button,
  Chip,
  Icon,
  PaperProvider,
  TextInput,
} from "react-native-paper";
import { useAppState } from "../../context/AppStateProvider";
import { getMembersOfGroup } from "../../sql/group-members/get";
import ExpenseDetails from "../../components/expenses/ExpenseDetails";
import { addNewExpense } from "../../sql/expenses/add";
import { useAuth } from "../../context/AuthProvider";
import SplitByUnequal from "../../components/expenses/SplitByUnequal";
import { isExpenseDescriptionExists } from "../../sql/expenses/get";

const SplitType = { unequal: "unequal", equally: "equally" };

const AddExpense = () => {
  const { selectedGroup } = useAppState();
  const { user: { id } } = useAuth();

  const [users, setUsers] = useState([]);
  const [includedMembers, setIncludedMembers] = useState([]);

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const [splitType, setSplitType] = useState(SplitType.equally);
  const [showModal, setShowModal] = useState(false);
  const [splitResult, setSplitResult] = useState(null);

  const [paidBy, setPaidBy] = useState(id);

  const [savedExpenseData, setSavedExpenseData] = useState(null);
  const [savedAmount, setSavedAmount] = useState(null);
  const [savedPaidBy, setSavedPaidBy] = useState(id);

  /* ---------------- LOAD MEMBERS ---------------- */

  useLayoutEffect(() => {
    if (!selectedGroup?.id) return;

    getMembersOfGroup(selectedGroup.id)
      .then((rows) => {
        const mapped = rows.map((r) => ({
          id: r.user_id,
          name: r.name,
        }));

        setUsers(mapped);
        setIncludedMembers(mapped);
        setPaidBy(id);
      })
      .catch(console.log);
  }, [selectedGroup]);

  /* ---------------- EQUAL SPLIT ---------------- */

  const getEqualSplitPercentage = () => {
    if (!includedMembers.length) return null;

    const percent = 100 / includedMembers.length;

    const data = {};
    includedMembers.forEach((u) => {
      data[u.id] = percent;
    });

    return data;
  };

  const expenseData =
    splitType === SplitType.equally
      ? getEqualSplitPercentage()
      : splitResult;

  /* ---------------- SAVE ---------------- */

  const createSplitHandler = async () => {
    try {
      if (!desc.trim()) return alert("Enter description");
      if (!amount) return alert("Enter amount");
      if (!expenseData) return alert("Split not ready");

      const exists = await isExpenseDescriptionExists(
        selectedGroup.id,
        desc.trim()
      );

      if (exists) {
        return alert("This expense already exists in this group");
      }

      await addNewExpense(
        expenseData,
        Number(amount),
        desc.trim(),
        paidBy,
        selectedGroup.id
      );

      setSavedExpenseData(expenseData);
      setSavedAmount(Number(amount));
      setSavedPaidBy(paidBy);

      alert("Expense added successfully");

      setDesc("");
      setAmount("");
      setSplitResult(null);
      setSplitType(SplitType.equally);
      setPaidBy(id);

    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again.");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <PaperProvider>
      <SplitByUnequal
  visible={showModal}
  users={includedMembers}
  totalAmount={Number(amount)}
  onClose={(data) => {
    if (!data) {
      setShowModal(false);
      return;
    }

    setSplitResult(data);
    setShowModal(false);
  }}
/>


      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.container}>

          <Text style={styles.splitLabel}>Select Split Type</Text>

          <View style={styles.chips}>
            <Chip
              icon={splitType === SplitType.equally ? "check" : undefined}
              onPress={() => setSplitType(SplitType.equally)}
            >
              Equally
            </Chip>

            <Chip
              icon={splitType === SplitType.unequal ? "check" : undefined}
              onPress={() => {
                if (!amount) return alert("Enter total amount first");
                setSplitType(SplitType.unequal);
                setShowModal(true);
              }}
            >
              Unequally
            </Chip>
          </View>

          {/* 👤 PAID BY */}
          <Text style={styles.sectionTitle}>Paid by</Text>

          <View style={styles.payerRow}>
            {includedMembers.map((u) => (
              <Chip
                key={u.id}
                selected={paidBy === u.id}
                onPress={() => setPaidBy(u.id)}
              >
                {u.name}
              </Chip>
            ))}
          </View>

          {/* 👥 INCLUDED MEMBERS */}
          <Text style={styles.sectionTitle}>Included Members</Text>

          <View style={styles.payerRow}>
            {users.map((u) => {
              const selected = includedMembers.find(m => m.id === u.id);

              return (
                <Chip
                  key={u.id}
                  selected={!!selected}
                  onPress={() => {
                    if (selected) {
                      setIncludedMembers(prev =>
                        prev.filter(m => m.id !== u.id)
                      );
                    } else {
                      setIncludedMembers(prev => [...prev, u]);
                    }
                  }}
                >
                  {u.name}
                </Chip>
              );
            })}
          </View>

          {/* DESCRIPTION */}
          <View style={styles.inputRow}>
            <Icon source="receipt" size={24} />
            <TextInput
              placeholder="Description"
              value={desc}
              onChangeText={setDesc}
              style={styles.input}
            />
          </View>

          {/* AMOUNT */}
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

          <Button mode="contained" onPress={createSplitHandler}>
            Create Split
          </Button>

          {/* PREVIEW */}
          {savedExpenseData && savedAmount && (
            <ExpenseDetails
              expenseData={savedExpenseData}
              totalAmount={savedAmount}
              users={users}
              paidBy={savedPaidBy}
              currentUserId={id}
            />
          )}

          <Text style={{ marginTop: 10 }}>
            Members: {users.map((u) => u.name).join(", ")}
          </Text>

        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: { padding: 20 },

  splitLabel: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 6,
    fontSize: 15,
    fontWeight: "500",
  },

  chips: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
    marginBottom: 20,
  },

  payerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 10,
  },

  sectionTitle: {
    fontWeight: "600",
    marginTop: 10,
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
