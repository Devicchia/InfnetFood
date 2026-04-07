import React, { useContext } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ThemeContext } from "../context/ThemeContext";

export default function RestaurantDetailsScreen({ route }) {
  const { restaurant } = route.params;
  const { theme } = useContext(ThemeContext);

  const latitude = -22.9068;
  const longitude = -43.1729;

  const s = styles(theme);

  return (
    <View style={s.container}>
      <Text style={s.title}>{restaurant.name}</Text>
      <Text style={s.info}>📍 Instituto Infnet - Rio de Janeiro, RJ</Text>

      <Text style={s.menuTitle}>🍽️ Exemplo do cardápio:</Text>
      <Text style={s.menuItem}>{restaurant.menuItem}</Text>

      <View style={s.mapContainer}>
        <MapView
          style={s.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title="Instituto Infnet"
            description="Sede no Rio de Janeiro"
          />
        </MapView>
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
  map: {
    flex: 1,
  },
});