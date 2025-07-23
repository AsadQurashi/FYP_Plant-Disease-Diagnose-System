import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://10.71.155.34:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.status === 201) {
        Alert.alert("Success", result.message || "Account created!");
        navigation.navigate("SignIn");
      } else if (response.status === 400 && result.errors) {
        const firstError = Object.values(result.errors)[0][0];
        Alert.alert("Validation Error", firstError);
      } else {
        Alert.alert("Error", result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert("Error", "Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        autoCapitalize="none"
        onChangeText={setUsername}
        value={username}
        placeholderTextColor="#a1a1a1"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor="#a1a1a1"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        placeholderTextColor="#a1a1a1"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.loginLink}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    height: 50,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#555",
  },
  loginLink: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
