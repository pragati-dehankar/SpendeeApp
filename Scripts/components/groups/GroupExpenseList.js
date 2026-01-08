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

const RenderItem = ({ data ,expenses}) => {
  const nav=useNavigation()
  const onExpenseClick=()=>{
    nav.navigate(GroupScreens.GroupExpenseItem,{expense:data})
  }

  const createdAt = new Date(data.created_at);

  return (
    <TouchableOpacity style={styles.card}
    onPress={onExpenseClick}
    >
      {/* Date box */}
      <View style={styles.dateBox}>
        <Text style={styles.dateText}>
          {monthNames[createdAt.getMonth()]}
        </Text>
        <Text style={styles.dateText}>
          {createdAt.getDate()}
        </Text>
      </View>

      {/* Icon */}
      <Icon source="receipt" size={44} color="white" />

      {/* Description */}
      <View style={styles.middle}>
        <Text style={styles.desc}>{data.description}</Text>
        <Text style={styles.sub}>
          {data.name} paid ₹{data.amount}
        </Text>
      </View>

      {/* Status */}
      <View style={styles.status}>
        <Chip
          compact
          style={{
            backgroundColor: data.is_settled ? "#2ecc71" : "#e74c3c",
          }}
          textStyle={{ color: "white" }}
        >
          {data.is_settled ? "Settled" : "Unsettled"}
        </Chip>
      </View>
    </TouchableOpacity>
  );
};

const GroupExpenseList = ({ expenses = [] }) => {
  return (
    <View style={{marginTop:40}}>
      <Text style={{fontWeight:'500', fontSize:20,padding:10}}>Splits</Text>
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id?.toString()}
      contentContainerStyle={{ paddingVertical: 10 }}
      renderItem={({ item }) => <RenderItem data={item} />}
    />
    </View>
  );
};

export default GroupExpenseList;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e2420",
    width: Dimensions.get("window").width - 20,
    alignSelf: "center",
    borderRadius: 15,
    padding: 15,
    marginVertical: 6,
    gap: 12,
  },
  dateBox: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    padding: 6,
    minWidth: 45,
  },
  dateText: {
    color: "white",
    fontWeight: "600",
  },
  middle: {
    flex: 1,
  },
  desc: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  sub: {
    color: "#dcdcdc",
    marginTop: 2,
  },
  status: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
