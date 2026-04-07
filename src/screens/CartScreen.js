import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';

export default function CartScreen({ navigation }) {
  const { cart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const s = styles(theme);

  return (
    <View style={s.container}>
      <Text style={s.title}>Carrinho</Text>

      <FlatList
        data={cart}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <Text style={s.text}>
            {item.name} - R$ {item.price}
          </Text>
        )}
      />

      <Text style={s.total}>Total: R$ {total}</Text>

      <TouchableOpacity
        style={s.button}
        onPress={() => navigation.navigate("Checkout")}>
        <Text style={s.buttonText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = (theme) => ({
  container: { flex: 1, backgroundColor: theme.background, padding: 20 },
  title: { fontSize: 22, color: theme.text },
  text: { color: theme.text, marginTop: 10 },
  total: { marginTop: 20, color: theme.primary },
  button: {
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: { color: '#fff', textAlign: 'center' },
});
