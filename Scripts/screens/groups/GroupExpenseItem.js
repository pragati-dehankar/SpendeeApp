import { useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ActivityIndicator, Button, Icon } from "react-native-paper";
import { getExpensesSplits } from "../../sql/expenses/get";
import { PaymentStatus } from "../../utils/constants";
import { useAuth } from "../../context/AuthProvider";
import { updatePaymentRecord } from "../../sql/payments/update";

const RenderItem = ({ data, expense, loggedInUserId, refresh }) => {

  const normalizedStatus = (data.status || "")
    .toString()
    .trim()
    .toUpperCase();

  const isPending = normalizedStatus === PaymentStatus.PENDING;
  console.log("RAW STATUS →", data.status);


  const canComplete =
    Number(expense.paid_by) === Number(loggedInUserId) && isPending;

  const completePayment = async () => {
    try {
      await updatePaymentRecord(expense.id, data.user_id);
      refresh();
    } catch (err) {
      console.log(err);
      alert("ERROR");
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isPending ? "#E75A7C" : "#7FC6A4" },
      ]}
    >
      <View>
        <Text style={styles.name}>{data.name}</Text>

        <Text style={styles.amount}>
          ₹ {Number(data.amount_owed).toFixed(2)}
        </Text>

        <Text style={styles.status}>
          {isPending ? "Pending" : "Completed"}
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <Icon
          source={isPending ? "clock-outline" : "check-circle"}
          size={24}
        />

        {canComplete && (
          <Button
            mode="contained"
            onPress={completePayment}
            style={{ marginTop: 6 }}
          >
            Complete
          </Button>
        )}
      </View>
    </View>
  );
  
};



const GroupExpenseItem = () => {
  const {
    params: { expense },
  } = useRoute();

  const {
    user: { id },
  } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSplits = useCallback(() => {
    setLoading(true);

    getExpensesSplits(expense.id)
      .then(setExpenses)
      .finally(() => setLoading(false));
  }, [expense.id]);

  useLayoutEffect(() => {
  loadSplits();
}, [expense.id]);


  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Expense Amount: ₹ {expense.amount}
      </Text>

      <Text style={styles.header}>
        Paid By: {expense.name}
      </Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={({ item }) => (
          <RenderItem
            data={item}
            expense={expense}
            loggedInUserId={id}
            refresh={loadSplits}
          />
        )}
      />
    </View>
  );
};

export default GroupExpenseItem;

const styles = StyleSheet.create({
  container: { padding: 10 },

  header: {
    fontSize: 18,
    fontWeight: "600",
    padding: 12,
  },

  card: {
    marginVertical: 8,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: { color: "#fff", fontSize: 16, fontWeight: "600" },

  amount: { color: "#fff", marginTop: 4 },

  status: { color: "#fff", fontSize: 12 },
});
