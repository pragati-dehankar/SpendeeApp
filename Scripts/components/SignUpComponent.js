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
import { Button, TextInput } from "react-native-paper";   // <-- FIX HERE
import { AuthScreen } from "../utils/constants";
import { useAuth } from "../context/AuthProvider";

const { width } = Dimensions.get("window");

const SignUpComponent = () => {
  const auth=useAuth()
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async() => {
    console.log({ name, phone, password,email });
    try {
      await auth.sigup(name,email,phone,password)
    } catch (error) {
      console.log(error);
      throw error
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Welcome! Register</Text>
        <Text style={styles.subtitle}>Signup to continue</Text>

        <TextInput
          mode="outlined"
          style={styles.input}
          label="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          mode="outlined"
          style={styles.input}
          label="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          mode="outlined"
          style={styles.input}
          label="Phone"
          keyboardType="numeric"
          value={phone}
          onChangeText={setPhone}
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
          onPress={handleSignUp}
        >
          Register
        </Button>

        <Button
          mode="text"
          style={styles.signupBtn}
          onPress={() => navigation.navigate(AuthScreen.Login)}
        >
          Already a user? Login instead
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpComponent;

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