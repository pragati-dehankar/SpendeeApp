import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { useAuth } from "../../context/AuthProvider";

const ExpenseDetails = ({ expenseData, totalAmount, users }) => {
  const {
    user: { id: loggedInUserId },
  } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Split Details</Text>

      {Object.keys(expenseData).map((userId) => {
        const user = users.find((u) => u.id === +userId);
        if (!user) return null;

        const share = (totalAmount * expenseData[userId]) / 100;

        const isMe = loggedInUserId === user.id;

        return (
          <View key={userId} style={styles.row}>
            <Avatar.Text
              size={36}
              label={user.name[0].toUpperCase()}
              style={styles.avatar}
            />

            <Text style={styles.text}>
              {isMe
                ? `Paid by you: ₹${totalAmount}`
                : `You Owe ${user.name}: ₹${share.toFixed(2)}`}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default ExpenseDetails;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    gap: 10,
  },
  avatar: {
    backgroundColor: "#6a5acd",
  },
  text: {
    fontSize: 14,
  },
});
