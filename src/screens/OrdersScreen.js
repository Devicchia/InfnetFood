import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";

export default function OrdersScreen() {
  const { orders } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  const s = styles(theme);

  return (
    <View style={s.container}>
      <Text style={s.title}>Pedidos</Text>

      {orders.length === 0 ? (
        <View style={s.emptyBox}>
          <Text style={s.emptyText}>Nenhum pedido realizado ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Text style={s.orderId}>Pedido #{item.id}</Text>
              <Text style={s.status}>Status: {item.status}</Text>

              {item.createdAt ? (
                <Text style={s.info}>Data: {item.createdAt}</Text>
              ) : null}

              {item.address ? (
                <Text style={s.info}>Endereço: {item.address}</Text>
              ) : null}

              {item.paymentMethod ? (
                <Text style={s.info}>Pagamento: {item.paymentMethod}</Text>
              ) : null}

              {typeof item.total !== "undefined" ? (
                <Text style={s.total}>
                  Total: R$ {Number(item.total).toFixed(2)}
                </Text>
              ) : null}

              <Text style={s.itemsTitle}>Itens do pedido:</Text>

              {item.items?.map((product, index) => (
                <Text key={index} style={s.itemText}>
                  • {product.name}
                  {product.quantity ? ` x${product.quantity}` : ""} — R$ {Number(product.price).toFixed(2)}
                </Text>
              ))}
            </View>
          )}
        />
      )}
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
    fontSize: 24,
    color: theme.text,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: theme.text,
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center",
  },
  card: {
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 14,
    marginTop: 12,
  },
  orderId: {
    color: theme.text,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  status: {
    color: theme.primary,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },
  info: {
    color: theme.text,
    marginBottom: 4,
  },
  total: {
    color: theme.text,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 8,
  },
  itemsTitle: {
    color: theme.text,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 4,
  },
  itemText: {
    color: theme.text,
    marginBottom: 2,
  },
});