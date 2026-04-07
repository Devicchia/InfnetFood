import React, { useContext } from "react";
import { View, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function RestaurantDetailsScreen({ route }) {
  const { restaurant } = route.params;
  const { theme } = useContext(ThemeContext);

  const s = styles(theme);
  const mapUrl =
    "https://www.google.com/maps?q=Instituto+Infnet+Rio+de+Janeiro&output=embed";

  return (
    <View style={s.container}>
      <Text style={s.title}>{restaurant.name}</Text>
      <Text style={s.info}>📍 Instituto Infnet - Rio de Janeiro, RJ</Text>

      <Text style={s.menuTitle}>🍽️ Exemplo do cardápio:</Text>
      <Text style={s.menuItem}>{restaurant.menuItem}</Text>

      <View style={s.mapContainer}>
        <iframe
          src={mapUrl}
          title="Mapa Instituto Infnet"
          style={{
            width: "100%",
            height: "100%",
            border: 0,
          }}
          loading="lazy"
        />
      </View>
    </View>
  );
}

const styles = (theme) => ({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.primary,
    marginBottom: 4,
  },
  menuItem: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 15,
  },
  mapContainer: {
    height: 260,
    borderRadius: 12,
    overflow: "hidden",
  },
});