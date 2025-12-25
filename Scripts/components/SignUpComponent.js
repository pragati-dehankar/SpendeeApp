import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { AuthScreen } from "../utils/constants";

const { width } = Dimensions.get("window");

const SignUpComponent = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword]
=useState(false)
  const handleSignUp = () => {
    console.log({ userId, password ,phone});
  };
  const togglePasswordVisibility=()=>{
    setShowPassword((prev)=>!prev)
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Welcome! Register</Text>
        <Text style={styles.subtitle}>Signup to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />

        <TextInput
        keyboardType="numeric"
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        //   secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        //   right={<TextInput.Icon icon={showPassword?"eye-off":"eye"}/>}
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
          Already a user? LogIn instead
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpComponent;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    // backgroundColor: "#ffffff",
  },
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
    height: 50,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
  },
  loginBtn: {
    width: width - 80,
    marginTop: 20,
    borderRadius: 10,
  },
  btnContent: {
    height: 50,
  },
  signupBtn: {
    marginTop: 15,
  },
});
