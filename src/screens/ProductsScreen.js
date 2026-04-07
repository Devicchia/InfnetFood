import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { products } from "../data/mockData";

export default function ProductsScreen({ route, navigation }) {
  const { theme } = useContext(ThemeContext);
  const { category } = route.params;

  const s = styles(theme);

  const filtered = products.filter(p => p.categoryId === category.id);

  return (
    <View style={s.container}>
      <Text style={s.title}>{category.name}</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={s.card}
            onPress={() => navigation.navigate("ProductDetails", { product: item })}
          >
            <Text style={s.text}>{item.name}</Text>
            <Text style={s.price}>R$ {item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = (theme) => ({
  container: { flex: 1, backgroundColor: theme.background, padding: 20 },
  title: { fontSize: 22, color: theme.text, marginBottom: 10 },
  card: {
    backgroundColor: theme.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  text: { color: theme.text },
  price: { color: theme.primary, marginTop: 5 },
});