import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const s = styles(theme);

  return (
    <View style={s.container}>
      <Text style={s.title}>InfnetFood </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={s.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#888"
        style={s.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={s.button} onPress={() => login(email)}>
        <Text style={s.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: theme.text,
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: theme.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    color: theme.text,
  },
  button: {
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});