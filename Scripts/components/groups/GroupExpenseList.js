import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Chip, Icon } from "react-native-paper";
import { GroupScreens } from "../../utils/constants";

const monthNames = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

const RenderItem = ({ data }) => {
  const nav = useNavigation();

  const onExpenseClick = () => {
    nav.navigate(GroupScreens.GroupExpenseItem, { expense: data });
  };

  // ✅ FIX DATE HERE
  const createdAt = data.created_at
    ? new Date(data.created_at.replace(" ", "T"))
    : null;

  const month = createdAt
    ? monthNames[createdAt.getMonth()]
    : "--";

  const day = createdAt
    ? createdAt.getDate()
    : "--";

  return (
    <TouchableOpacity style={styles.card} onPress={onExpenseClick}>
      
      {/* 📅 DATE BOX */}
      <View style={styles.dateBox}>
        <Text style={styles.dateText}>{month}</Text>
        <Text style={styles.dateText}>{day}</Text>
      </View>

      {/* 🧾 ICON */}
      <Icon source="receipt" size={40} color="#fff" />

      {/* 📄 DESCRIPTION */}
      <View style={styles.middle}>
        <Text style={styles.desc}>{data.description}</Text>

        <Text style={styles.sub}>
          {data.name} paid ₹{Number(data.amount).toLocaleString("en-IN")}
        </Text>
      </View>

      {/* ✅ STATUS */}
      <Chip
        style={{
          backgroundColor: data.is_settled ? "#2ecc71" : "#e74c3c",
        }}
        textStyle={{ color: "#fff", fontWeight: "600" }}
      >
        {data.is_settled ? "Settled" : "Unsettled"}
      </Chip>
    </TouchableOpacity>
  );
};

const GroupExpenseList = ({ expenses = [] }) => {
  return (
    <View style={{ marginTop: 40 }}>
      <Text style={styles.title}>Splits</Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => <RenderItem data={item} />}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 30 }}>
            No expenses yet
          </Text>
        }
      />
    </View>
  );
};

export default GroupExpenseList;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101915",
    width: Dimensions.get("window").width - 20,
    alignSelf: "center",
    borderRadius: 18,
    padding: 16,
    marginVertical: 8,
    gap: 14,
  },

  dateBox: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  dateText: {
    color: "#fff",
    fontWeight: "700",
  },

  middle: {
    flex: 1,
  },

  desc: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  sub: {
    color: "#cfcfcf",
    marginTop: 3,
  },
});
