import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator, FAB } from "react-native-paper";
import { GroupScreens } from "../../utils/constants";
import { useLayoutEffect, useState } from "react";
import { getExpensesOfGroup } from "../../sql/expenses/get";
import { useAppState } from "../../context/AppStateProvider";
import GroupExpenselist from "../../components/groups/GroupExpenseList";

const GroupItemMain = () => {
  const [loading, setLoading] = useState(true);
  const [expense, setExpense] = useState([]);
  const { selectedGroup } = useAppState();
  const nav = useNavigation();
  const navigatoToGroupExpense = () => {
    nav.navigate(GroupScreens.GroupAddExpense);
  };
  useLayoutEffect(() => {
    getExpensesOfGroup(selectedGroup?.id)
      .then(setExpense)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return loading ? (
    <ActivityIndicator size={30} style={{ margin: "auto" }} />
  ) : (
    <View style={styles.container}>
      <Text>grou[ItemMain]</Text>
      <GroupExpenselist expenses={expense} />
      <FAB
        onPress={navigatoToGroupExpense}
        style={styles.fab}
        label="Add expense"
        icon={"wallet-plus-outline"}
      />
    </View>
  );
};
export default GroupItemMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 15,
    right: 5,
  },
});
