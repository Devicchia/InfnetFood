import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";

export default function CheckoutScreen({ navigation }) {
  const { createOrder } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const s = styles(theme);

  function handleFinish() {
    if (!address.trim()) {
      Alert.alert("Erro", "Digite o endereço de entrega");
      return;
    }

    if (!paymentMethod.trim()) {
      Alert.alert("Erro", "Digite a forma de pagamento");
      return;
    }

    const success = createOrder({
      address,
      paymentMethod,
    });

    if (!success) {
      Alert.alert("Erro", "Seu carrinho está vazio");
      return;
    }

    Alert.alert("Pedido confirmado", "Seu pedido está em preparo 🍔");

    navigation.navigate("Orders");
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Checkout</Text>

      <TextInput
        placeholder="Endereço de entrega"
        placeholderTextColor="#888"
        style={s.input}
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        placeholder="Forma de pagamento"
        placeholderTextColor="#888"
        style={s.input}
        value={paymentMethod}
        onChangeText={setPaymentMethod}
      />

      <TouchableOpacity style={s.button} onPress={handleFinish}>
        <Text style={s.buttonText}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: theme.text,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: theme.card,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    color: theme.text,
  },
  button: {
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});