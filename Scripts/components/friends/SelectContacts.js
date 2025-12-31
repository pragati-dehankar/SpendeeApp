import { useEffect, useState } from "react";
import { View,Text } from "react-native";
import * as Contacts from 'expo-contacts';
import MultiSelect from 'react-native-multiple-select'


const getContactsPermission=async()=>{

    const permission=await Contacts.getPermissionsAsync()
    if(permission.granted){
        return true
    }

    const firstPermission=await Contacts.requestPermissionsAsync()
    if(firstPermission.granted){
        return true
    }
   const secondPermission= await Contacts.requestPermissionsAsync()
   if(secondPermission.granted){
    return true
   }
    if(!firstPermission.canAskAgain){
     return false
    }

   return false
}
const SelectContacts = () => {
  const [contacts,setContacts]=useState([])
  const [selectedContacts,setSelectedContacts]=useState([])
  const onItemChange=(data)=>{
    setSelectedContacts(data)
  }

    useEffect(()=>{
      async function getContacts() {
        const hasPermissions=await getContactsPermission()
        if(!hasPermissions) return
        const contacts=await Contacts.getContactsAsync({fields:[Contacts.Fields.Name,Contacts.Fields.PhoneNumbers]})
        // console.log(contacts.data);
        setContacts(contacts.data)
      }
      getContacts()
    },[])
  return (
    <View>
      <Text>SelectContacts</Text>
     { contacts.length>0 && <MultiSelect uniqueKey="id" items={contacts} onSelectedItemsChange={onItemChange} selectedItems={selectedContacts} />}
    </View>
  );
};
export default SelectContacts;
