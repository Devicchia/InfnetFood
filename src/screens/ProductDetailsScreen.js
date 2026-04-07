import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  const [quantity, setQuantity] = useState(1);

  const s = styles(theme);

  return (
    <View style={s.container}>
      <Text style={s.title}>{product.name}</Text>

      <Text style={s.description}>
        {product.description || "Sem descrição disponível"}
      </Text>

      <Text style={s.price}>R$ {product.price.toFixed(2)}</Text>

      <View style={s.quantityContainer}>
        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
          <Text style={s.qtdBtn}>-</Text>
        </TouchableOpacity>

        <Text style={s.quantity}>{quantity}</Text>

        <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
          <Text style={s.qtdBtn}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={s.button}
        onPress={() => {
          addToCart({ ...product, quantity });

          Alert.alert("Sucesso", "Item adicionado ao carrinho!");

          navigation.reset({
            index: 0,
            routes: [
              {
                name: "Main",
                state: {
                  index: 2,
                  routes: [
                    { name: "Home" },
                    { name: "Restaurants" },
                    { name: "Cart" },
                    { name: "Orders" },
                    { name: "Profile" },
                    { name: "Settings" },
                  ],
                },
              },
            ],
          });
        }}
      >
        <Text style={s.buttonText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = (theme) => ({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.background,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 10,
    textAlign: "center",
  },

  description: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 15,
    textAlign: "center",
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.primary,
    marginBottom: 25,
    textAlign: "center",
  },

  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  qtdBtn: {
    fontSize: 28,
    marginHorizontal: 25,
    color: theme.primary,
    fontWeight: "bold",
  },

  quantity: {
    fontSize: 20,
    color: theme.text,
  },

  button: {
    backgroundColor: theme.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});