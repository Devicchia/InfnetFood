import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { categories } from "../data/mockData";
import { getRioWeather } from "../services/weatherService";

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [weather, setWeather] = useState(null);

  const s = styles(theme);

  useEffect(() => {
    async function loadWeather() {
      const data = await getRioWeather();
      setWeather(data);
    }

    loadWeather();
  }, []);

  return (
    <View style={s.container}>
      <Text style={s.title}>Categorias</Text>

      {weather?.current && (
        <View style={s.weatherCard}>
          <Text style={s.weatherTitle}>Clima na região da InfnetFood</Text>
          <Text style={s.weatherText}>
            Temperatura atual: {weather.current.temperature_2m}°C
          </Text>
        </View>
      )}

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={s.card}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("Products", {
                category: item,
              })
            }
          >
            <Text style={s.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
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
    fontSize: 26,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 15,
  },
  weatherCard: {
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  weatherTitle: {
    color: theme.text,
    fontWeight: "bold",
    marginBottom: 6,
  },
  weatherText: {
    color: theme.text,
  },
  card: {
    backgroundColor: theme.card,
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 3,
  },
  text: {
    color: theme.text,
    fontSize: 16,
    fontWeight: "500",
  },
});