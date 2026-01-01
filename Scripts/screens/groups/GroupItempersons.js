import { View, Text } from "react-native";
import SelectContacts from "../../components/friends/SelectContacts";
import { useAppState } from "../../context/AppStateProvider";
import { useLayoutEffect, useState } from "react";
import { getMembersOfGroup } from "../../sql/group-members/get";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { GroupScreens } from "../../utils/constants";

const GroupItemPersons = () => {
    const nav=useNavigation()
  const [members, setMembers] = useState([]);
  const { selectedGroup } = useAppState();
  console.log(selectedGroup);

  useLayoutEffect(() => {
    getMembersOfGroup(+selectedGroup)
      .then(setMembers)
      .catch((err) => console.log(err));
  }, []);

  const navigateToAddmembers=()=>{
    nav.navigate(GroupScreens.AddGroupMembers,{members})
  }
  return (
    <View>
      <Button
        onPress={navigateToAddmembers}
        style={{ width: 300, marginVertical: 10, marginHorizontal: "auto" }}
        mode="contained-tonal"
      >
        Add New members
      </Button>
      <Text>GroupItemPersons</Text>
      <Text style={{ borderWidth: 1, padding: 10 }}>
        {JSON.stringify(members)}
      </Text>
    </View>
  );
};
export default GroupItemPersons;
