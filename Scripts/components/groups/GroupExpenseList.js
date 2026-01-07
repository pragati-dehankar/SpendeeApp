import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const RenderItem=({data,expenses})=>{
  return   <TouchableOpacity>
        <View>
            <Text>{JSON.stringify(data)}</Text>
        </View>
     </TouchableOpacity>
} 

const GroupExpenselist = ({expenses}) => {
  return (
    <View >
      <FlatList data={expenses}
      renderItem={(info)=>(
        <RenderItem data={info.item} expenses={expenses} />
      )}
      />
    </View>
  );
};

export default GroupExpenselist;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 20, fontWeight: "600", marginVertical: 5 },
});
