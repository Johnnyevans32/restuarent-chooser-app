import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../../components/customButton";

const WhosGoingScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem("people");
      const parsed = data ? JSON.parse(data) : [];
      setPeople(parsed);
      setSelected(parsed.map(() => false));
    };
    load();
  }, []);

  const confirmLeave = useCallback(() => {
    Alert.alert(
      "Are you sure?",
      "Leave this screen and start over?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => navigation.navigate("DecisionTimeScreen"),
        },
      ],
    );
    return true;
  }, [navigation]);

  useEffect(() => {
    if (Platform.OS !== "android") return;
    const sub = BackHandler.addEventListener("hardwareBackPress", confirmLeave);
    return () => sub.remove();
  }, [confirmLeave]);

  const toggleSelection = (index) => {
    const updated = [...selected];
    updated[index] = !updated[index];
    setSelected(updated);
  };

  const handleNext = () => {
    const selectedParticipants = people
      .map((person, index) =>
        selected[index] ? { ...person, vetoed: "no" } : null,
      )
      .filter(Boolean);

    if (selectedParticipants.length === 0) {
      if (Platform.OS === "web") {
        window.alert("Please select at least one person.");
      } else {
        Alert.alert("Hold up!", "Please select at least one person.");
      }
      return;
    }

    navigation.navigate("PreFiltersScreen", {
      participants: selectedParticipants,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.headline}>Who's Going?</Text>
        <FlatList
          style={styles.list}
          data={people}
          keyExtractor={(item) => item.key}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No people added yet.</Text>
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => toggleSelection(index)}
              activeOpacity={0.7}
            >
              <Checkbox
                value={selected[index] || false}
                onValueChange={() => toggleSelection(index)}
                style={styles.checkbox}
              />
              <Text style={styles.name}>
                {item.firstName} {item.lastName} ({item.relationship})
              </Text>
            </TouchableOpacity>
          )}
        />
        <CustomButton text="Next" onPress={handleNext} width="94%" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  headline: {
    fontSize: 30,
    marginBottom: 20,
  },
  list: {
    width: "94%",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  checkbox: {
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: 20,
    color: "#888",
  },
});

export default WhosGoingScreen;
