import React, { useContext } from "react";
import { View, Text, Switch } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function SettingsScreen() {
  const { dark, toggleTheme, theme } = useContext(ThemeContext);

  const s = styles(theme);

  return (
    <View style={s.container}>
      <Text style={s.text}>Modo Escuro</Text>
      <Switch value={dark} onValueChange={toggleTheme} />
    </View>
  );
}

const styles = (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: theme.text, fontSize: 18 },
});