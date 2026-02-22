import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../context/AuthProvider";
import { Avatar, Card, Button, Divider } from "react-native-paper";
import { getUserBalanceSummary } from "../../sql/payments/getSummary";

const AccountDetails = () => {
  const { user, authLoading, logout } = useAuth();

  const [summary, setSummary] = useState({
    lent: 0,
    borrowed: 0,
  });


  useEffect(() => {
    if (!user?.id) return;

    getUserBalanceSummary(user.id).then(setSummary);
  }, [user]);


  if (authLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Checking session...</Text>
      </View>
    );
  }

 
  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Please login</Text>
      </View>
    );
  }

  const totalBalance = summary.lent - summary.borrowed;

  return (
    <View style={styles.container}>

     
      <View style={styles.profileSection}>
        <Avatar.Text
          size={80}
          label={user.name?.charAt(0).toUpperCase()}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

   
      <Card style={styles.card}>
        <Card.Content>

          <View style={styles.row}>
            <Text style={styles.label}>You Lent</Text>
            <Text style={[styles.value, { color: "green" }]}>
              ₹ {summary.lent}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>You Borrowed</Text>
            <Text style={[styles.value, { color: "red" }]}>
              ₹ {summary.borrowed}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Total Balance</Text>
            <Text
              style={[
                styles.value,
                {
                  color: totalBalance >= 0 ? "green" : "red",
                },
              ]}
            >
              ₹ {totalBalance}
            </Text>
          </View>

        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>

          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>

        </Card.Content>
      </Card>

   
      <Button
        mode="contained"
        icon="logout"
        style={styles.logoutBtn}
        contentStyle={{ paddingVertical: 6 }}
        onPress={logout}
      >
        Logout
      </Button>

    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f6f7fb",
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 25,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },

  email: {
    color: "gray",
    marginTop: 4,
  },

  card: {
    borderRadius: 16,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  label: {
    color: "gray",
    fontWeight: "600",
  },

  value: {
    fontWeight: "700",
  },

  divider: {
    marginVertical: 6,
  },

  logoutBtn: {
    borderRadius: 30,
    marginTop: 10,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});