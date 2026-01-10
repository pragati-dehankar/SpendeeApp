import { useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ActivityIndicator, Button, Chip, Icon } from "react-native-paper";
import { getExpensesSplits } from "../../sql/expenses/get";
import { PaymentStatus } from "../../utils/constants";
import {useAuth} from '../../context/AuthProvider'
import { updatePaymentRecord } from "../../sql/payments/update";

const RenderItem=({data,expense,userId})=>{
  const isUserDuePending=()=>{
     if(data.user_id === userId && data.status === PaymentStatus.PENDING){
      return true
     }
    return false
  }
  const settleUsersDues=async()=>{
     try {
      await updatePaymentRecord(expense.id,userId)
      alert("SUCCESS")
     } catch (error) {
      alert("ERROR")
      console.log(error);
      
     }
  }
 return (
    <View style={{margin:10,
        borderWidth:1,
        borderRadius:10,
        padding:10,
        backgroundColor: data.status===PaymentStatus.PENDING ?'#E75A7C':'#7FC6A4',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }}>
        <View>
            <Text> {data.name} </Text>
            <Text> {data.status} </Text>
            <Text> {data.amount_owed} </Text>
        </View>
        {/* <Text> {JSON.stringify(data)} </Text> */}
        <View style={{justifyContent:'center', alignItems:'center', marginLeft:'auto',padding:10,gap:5}}>
        <Icon
        color="#0B132B" size={20} name={"hourglass"}
        />
        </View>
        {isUserDuePending() && <Button onPress={settleUsersDues} mode="elevated" textColor="black">Settle</Button>}
    </View>
 )
}

const GroupExpenseItem = () => {
  const {
    params: { expense },
  } = useRoute();
  const {
    user:{id}
  }=useAuth()

  const [expenses, setExpenses] = useState([]);
  const [loading, setLaoding] = useState(true);

  useLayoutEffect(() => {
    getExpensesSplits(expense.id)
      .then(setExpenses)
      .then(() => setLaoding(false))
      .catch((err) => console.log(err));
  }, []);

  return loading ? (
    <ActivityIndicator style={{ margin: "auto" }} size={30} />
  ) : (
    <View >
      <Text style={{fontSize:20,padding:20}}>
        Expense Amount: {expense.amount}
      </Text>
      <Text  style={{fontSize:20,padding:20}}>
       Expense Paid By: {expense.name}
      </Text>

    <FlatList
  data={expenses}
  keyExtractor={(item) => item.user_id.toString()}
  renderItem={({ item }) => (
    <RenderItem data={item} expense={expense} userId={id} />
  )}
/>


    </View>
  );
};

export default GroupExpenseItem;

const styles = StyleSheet.create({});
