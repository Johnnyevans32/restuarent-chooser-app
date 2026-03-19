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
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchPeople();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchPeople = async () => {
    const data = await AsyncStorage.getItem("people");
    if (data) {
      setPeople(JSON.parse(data));
    }
  };

  const performDelete = async (id) => {
    const updated = people.filter((p) => p.key !== id);
    await AsyncStorage.setItem("people", JSON.stringify(updated));
    setPeople(updated);
    Toast.show({
      type: "error",
      text1: "Person deleted",
      visibilityTime: 2000,
    });
  };

  const deletePerson = async (id) => {
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to delete this person?")) {
        performDelete(id);
      }
    } else {
      Alert.alert(
        "Delete Person",
        "Are you sure you want to delete this person?",
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
        text="Add Person"
        onPress={() => navigation.navigate("PeopleAdd")}
        buttonStyle={{ marginBottom: 20 }}
        width="100%"
      />
      <FlatList
        data={people}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.personItem}>
            <Text style={styles.text}>
              {item.firstName} {item.lastName}
            </Text>
            <CustomButton
              text="Delete"
              onPress={() => deletePerson(item.key)}
              buttonStyle={styles.deleteButton}
              width="80"
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No people yet. Add someone!</Text>
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
  personItem: {
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
