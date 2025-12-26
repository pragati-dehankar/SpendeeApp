import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, TextInput } from "react-native-paper";   // <--- change TextInput import
import { AuthScreen } from "../utils/constants";

const { width } = Dimensions.get("window");

const LoginComponent = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log({ userId, password });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <TextInput
          mode="outlined"
          style={styles.input}
          label="User ID / Email"
          value={userId}
          onChangeText={setUserId}
          autoCapitalize="none"
        />

        <TextInput
          mode="outlined"
          style={styles.input}
          label="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <Button
          mode="contained"
          style={styles.loginBtn}
          contentStyle={styles.btnContent}
          onPress={handleLogin}
        >
          Login
        </Button>

        <Button
          mode="text"
          style={styles.signupBtn}
          onPress={() => navigation.navigate(AuthScreen.SignUp)}
        >
          New user? Sign up instead
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 30,
  },
  input: {
    width: width - 80,
    marginVertical: 10,
  },
  loginBtn: {
    width: width - 80,
    marginTop: 20,
    borderRadius: 10,
  },
  btnContent: { height: 50 },
  signupBtn: { marginTop: 15 },
});
