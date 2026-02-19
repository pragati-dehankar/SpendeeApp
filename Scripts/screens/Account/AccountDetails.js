import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../context/AuthProvider";
import { Avatar, Card, Button, Divider } from "react-native-paper";

const AccountDetails = () => {
  const { user, authLoading, logout } = useAuth();

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

  return (
    <View style={styles.container}>

      {/* 👤 PROFILE HEADER */}
      <View style={styles.profileSection}>
        <Avatar.Text
          size={80}
          label={user.name?.charAt(0).toUpperCase()}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* 📄 DETAILS CARD */}
      <Card style={styles.card}>
        <Card.Content>

          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>User ID</Text>
            <Text style={styles.value}>{user.id}</Text>
          </View>

        </Card.Content>
      </Card>

      {/* 🚪 LOGOUT BUTTON */}
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
    marginBottom: 30,
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
    fontWeight: "600",
  },

  divider: {
    marginVertical: 6,
  },

  logoutBtn: {
    borderRadius: 30,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
