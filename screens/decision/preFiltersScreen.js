import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomButton from "../../components/customButton";

const PreFiltersScreen = ({ navigation }) => {
  const route = useRoute();
  const { participants } = route.params;

  const [cuisine, setCuisine] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [delivery, setDelivery] = useState("");

  const showAlert = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleNext = async () => {
    const data = await AsyncStorage.getItem("restaurants");
    const parsedRestaurants = data ? JSON.parse(data) : [];

    const filteredRestaurants = parsedRestaurants.filter((restaurant) => {
      const matchesCuisine = !cuisine || restaurant.cuisine === cuisine;
      const matchesPrice =
        !price || Number(restaurant.price) <= Number(price);
      const matchesRating =
        !rating || Number(restaurant.rating) >= Number(rating);
      const matchesDelivery = !delivery || restaurant.delivery === delivery;
      return (
        matchesCuisine && matchesPrice && matchesRating && matchesDelivery
      );
    });

    if (filteredRestaurants.length === 0) {
      showAlert(
        "No matches",
        "No restaurants match the selected criteria. Adjust the filters and try again.",
      );
      return;
    }

    navigation.navigate("ChoiceScreen", {
      participants,
      restaurants: filteredRestaurants,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.formContainer}>
          <View style={styles.headlineContainer}>
            <Text style={styles.headline}>Pre-Filters</Text>
          </View>

          <Text style={styles.fieldLabel}>Cuisine</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={cuisine}
              onValueChange={(v) => setCuisine(v)}
              style={styles.picker}
            >
              <Picker.Item label="Any" value="" />
              <Picker.Item label="American" value="American" />
              <Picker.Item label="Italian" value="Italian" />
              <Picker.Item label="Chinese" value="Chinese" />
              <Picker.Item label="Indian" value="Indian" />
              <Picker.Item label="Mexican" value="Mexican" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          <Text style={styles.fieldLabel}>Max Price</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={price}
              onValueChange={(v) => setPrice(v)}
              style={styles.picker}
            >
              <Picker.Item label="Any" value="" />
              <Picker.Item label="$" value="1" />
              <Picker.Item label="$$" value="2" />
              <Picker.Item label="$$$" value="3" />
              <Picker.Item label="$$$$" value="4" />
              <Picker.Item label="$$$$$" value="5" />
            </Picker>
          </View>

          <Text style={styles.fieldLabel}>Min Rating</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={rating}
              onValueChange={(v) => setRating(v)}
              style={styles.picker}
            >
              <Picker.Item label="Any" value="" />
              <Picker.Item label="1 Star" value="1" />
              <Picker.Item label="2 Stars" value="2" />
              <Picker.Item label="3 Stars" value="3" />
              <Picker.Item label="4 Stars" value="4" />
              <Picker.Item label="5 Stars" value="5" />
            </Picker>
          </View>

          <Text style={styles.fieldLabel}>Delivery</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={delivery}
              onValueChange={(v) => setDelivery(v)}
              style={styles.picker}
            >
              <Picker.Item label="Any" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>

          <CustomButton text="Next" onPress={handleNext} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
  },
  formContainer: { width: "96%" },
  headlineContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headline: { fontSize: 30, marginBottom: 20 },
  fieldLabel: { marginLeft: 10 },
  pickerContainer: {
    ...Platform.select({
      ios: {},
      android: {
        width: "96%",
        borderRadius: 8,
        borderColor: "#c0c0c0",
        borderWidth: 2,
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 4,
      },
    }),
  },
  picker: {
    ...Platform.select({
      ios: {
        width: "96%",
        borderRadius: 8,
        borderColor: "#c0c0c0",
        borderWidth: 2,
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 4,
      },
      android: {},
    }),
  },
});

export default PreFiltersScreen;
