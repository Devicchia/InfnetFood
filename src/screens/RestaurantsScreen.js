import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { ThemeContext } from '../context/ThemeContext';
import restaurants from '../data/restaurants';

export default function RestaurantsScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const s = styles(theme);

  return (
    <View style={s.container}>
      <Text style={s.title}>Restaurantes</Text>

      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={s.card}
            onPress={() =>
              navigation.navigate('RestaurantDetails', {
                restaurant: item,
              })
            }
            ><Text style={s.name}>{item.name}</Text>
            <Text style={s.address}>{item.address}</Text>
          </TouchableOpacity>
        )}
      />
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
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 15,
  },

  card: {
    backgroundColor: theme.card,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
  },

  address: {
    fontSize: 14,
    color: theme.text,
    marginTop: 5,
  },
});
