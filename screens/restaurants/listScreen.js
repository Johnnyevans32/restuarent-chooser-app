import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/customButton";

const ListScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchRestaurants();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchRestaurants = async () => {
    const data = await AsyncStorage.getItem("restaurants");
    if (data) {
      setRestaurants(JSON.parse(data));
    }
  };

  const performDelete = async (id) => {
    const updated = restaurants.filter((r) => r.key !== id);
    await AsyncStorage.setItem("restaurants", JSON.stringify(updated));
    setRestaurants(updated);
    Toast.show({
      type: "error",
      text1: "Restaurant deleted",
      visibilityTime: 2000,
    });
  };

  const deleteRestaurant = async (id) => {
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to delete this restaurant?")) {
        performDelete(id);
      }
    } else {
      Alert.alert(
        "Delete Restaurant",
        "Are you sure you want to delete this restaurant?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", onPress: () => performDelete(id) },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <CustomButton
        text="Add Restaurant"
        onPress={() => navigation.navigate("RestaurantsAdd")}
        buttonStyle={{ marginBottom: 20 }}
        width="100%"
      />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.restaurantItem}>
            <Text style={styles.text}>{item.name}</Text>
            <CustomButton
              text="Delete"
              onPress={() => deleteRestaurant(item.key)}
              buttonStyle={styles.deleteButton}
              width="80"
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No restaurants yet. Add one!</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  restaurantItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 18,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "red",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
    fontSize: 16,
  },
});

export default ListScreen;
