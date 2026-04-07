import { Platform } from "react-native";

let Screen;

if (Platform.OS === "web") {
  Screen = require("./RestaurantDetailsScreen.web").default;
} else {
  Screen = require("./RestaurantDetailsScreen.native").default;
}

export default Screen;