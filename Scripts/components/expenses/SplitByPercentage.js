
import { View ,Text, StyleSheet} from "react-native"
import { Modal, Portal } from "react-native-paper";


const SplitByPercentage=({visible,closeModal})=>{
    
    return (
         <Portal>
            <Modal visible={visible} onDismiss={closeModal} >
                 <Text>Hello</Text>
                 <Text>Hello</Text>
                 <Text>Hello</Text>
                 <Text>Hello</Text>
            </Modal>
         </Portal>
    )
}
export default SplitByPercentage;

const styles=StyleSheet.create({
   
})