import { View, Text } from "react-native";
import { useAppState } from "../../context/AppStateProvider";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getMembersOfGroup } from "../../sql/group-members/get";
import { Button } from "react-native-paper";
import { GroupScreens } from "../../utils/constants";

const GroupItemPersons = () => {
  const nav = useNavigation();
  const { selectedGroup } = useAppState();
  const [members, setMembers] = useState([]);

  // 🔁 Reload EVERY TIME screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (!selectedGroup?.id) return;

      getMembersOfGroup(selectedGroup.id)
        .then(setMembers)
        .catch(console.log);
    }, [selectedGroup])
  );

  return (
    <View>
      <Button
        mode="contained-tonal"
        onPress={() => nav.navigate(GroupScreens.AddGroupMembers)}
      >
        Add New Members
      </Button>

      <Text>Group Members</Text>
      <Text style={{ borderWidth: 1, padding: 10 }}>
        {JSON.stringify(members, null, 2)}
      </Text>
    </View>
  );
};

export default GroupItemPersons;
