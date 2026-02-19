import { View, Text, StyleSheet } from "react-native";

const ExpenseDetails = ({
  expenseData,
  totalAmount,
  users,
  paidBy,
  currentUserId,
}) => {
  const getName = (uid) => {
    const user = users.find((u) => u.id === uid);
    if (!user) return "";
    return uid === currentUserId ? "You" : user.name;
  };

  const payerName = getName(paidBy);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Split Details</Text>

      <Text style={styles.paidBy}>
        Paid by {payerName}: ₹{totalAmount}
      </Text>

      {Object.keys(expenseData)
        .filter((uid) => Number(uid) !== Number(paidBy))
        .map((uid) => {
          const percent = expenseData[uid];
          const amount = (percent / 100) * totalAmount;

          return (
            <Text key={uid} style={styles.oweText}>
              {getName(Number(uid))} owes ₹{amount.toFixed(2)}
            </Text>
          );
        })}
    </View>
  );
};

export default ExpenseDetails;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  title: {
    fontWeight: "600",
    marginBottom: 6,
  },
  paidBy: {
    fontWeight: "600",
    marginBottom: 4,
  },
  oweText: {
    color: "#444",
  },
});
