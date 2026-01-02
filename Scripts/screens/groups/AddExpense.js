import { useState } from "react";
import { View ,Text, StyleSheet} from "react-native"
import { Chip, FAB, PaperProvider } from "react-native-paper";
import SplitByPercentage from "../../components/expenses/SplitByPercentage";

const SplitType={percentage:"percentage",equally:'equally'}

const AddExpense=()=>{
    const [modalVisible,setModalVisible]=useState(false)
    const [splitsType,setSplitsType]=useState(SplitType.equally)
    const splitByPercentage=()=>{
         setSplitsType(SplitType.percentage)
         setModalVisible(true)
    }
    const splitEqually=()=>{
         setSplitsType(SplitType.equally)
    }
    return (
        <PaperProvider>
           {splitsType===SplitType.percentage && <SplitByPercentage visible={modalVisible} closeModal={()=>setModalVisible(false)} />}
        <View >
            <Text>Select Split Type</Text>
            <View style={styles.selectionView}>
                <Chip icon={SplitType===SplitType.equally ?'check':""} onPress={splitEqually}>Equally</Chip>
                <Chip icon={SplitType===SplitType.percentage ?'check':""} onPress={splitByPercentage}>Percentage</Chip>
            </View>
            <Text>
                 AddExpense
            </Text>
        </View>
        </PaperProvider>
    )
}
export default AddExpense;

const styles=StyleSheet.create({
    selectionView:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        gap:10
    }
})