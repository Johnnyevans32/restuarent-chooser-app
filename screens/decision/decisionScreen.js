import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const decisionTimeImage =
  Platform.OS === "ios"
    ? require("../../assets/urfu/its-decision-time.ios.png")
    : require("../../assets/urfu/its-decision-time.android.png");

const DecisionScreen = ({ navigation }) => {
  const showAlert = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message, [{ text: "OK" }]);
    }
  };

  const handleStart = async () => {
    const people = await AsyncStorage.getItem("people");
    const restaurants = await AsyncStorage.getItem("restaurants");

    const noPeople = !people || JSON.parse(people).length === 0;
    const noRestaurants =
      !restaurants || JSON.parse(restaurants).length === 0;

    if (noPeople || noRestaurants) {
      let message = "That ain't gonna work, chief.\n\n";
      if (noPeople) message += "You need to add at least one person.\n";
      if (noRestaurants) message += "You need to add at least one restaurant.";
      showAlert("Hold up!", message);
      return;
    }

    navigation.navigate("WhosGoingScreen");
  };

  return (
    <View style={styles.decisionScreenContainer}>
      <TouchableOpacity onPress={handleStart} activeOpacity={0.7}>
        <Image source={decisionTimeImage} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  decisionScreenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default DecisionScreen;
