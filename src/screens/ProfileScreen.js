import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [image, setImage] = useState(null);

  const s = styles(theme);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permissão necessária para acessar a galeria");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const firstLetter = user?.email?.charAt(0).toUpperCase();

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={s.avatar} />
        ) : (
          <View style={s.avatarPlaceholder}>
            <Text style={s.avatarText}>{firstLetter}</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={s.name}>Usuário</Text>
      <Text style={s.email}>{user?.email}</Text>

      <Text style={s.editHint}>Toque na foto para alterar</Text>
    </View>
  );
}

const styles = (theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.background,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  avatarText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.text,
  },

  email: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 10,
  },

  editHint: {
    fontSize: 14,
    color: theme.primary,
    marginTop: 10,
  },
});