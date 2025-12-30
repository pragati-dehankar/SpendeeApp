import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthProvider";

const AccountDetails = () => {
  const { user, isLoggedIn } = useAuth();

  // Loading state or user not available
  if (!isLoggedIn || !user) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading user details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Account Details</Text>

      <View style={styles.detail}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>

      <View style={styles.detail}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <View style={styles.detail}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{user.phone}</Text>
      </View>

      <View style={styles.detail}>
        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{user.id}</Text>
      </View>
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  detail: { flexDirection: "row", marginVertical: 8 },
  label: { fontWeight: "600", width: 100 },
  value: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
