import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../../components/customButton";

const ChoiceScreen = ({ navigation }) => {
  const route = useRoute();
  const initialRestaurants = route.params?.restaurants || [];
  const initialParticipants = route.params?.participants || [];

  const [participants, setParticipants] = useState(initialParticipants);
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [chosenRestaurant, setChosenRestaurant] = useState(null);
  const [selectedVisible, setSelectedVisible] = useState(false);
  const [vetoVisible, setVetoVisible] = useState(false);

  const vetoDisabled = !participants.some((p) => p.vetoed === "no");
  const vetoText = vetoDisabled ? "No More Vetoes" : "Veto";

  const showAlert = (title, message, onOk) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(title, message, [
        { text: "OK", onPress: onOk || (() => {}) },
      ]);
    }
  };

  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const selectRandomRestaurant = () => {
    if (restaurants.length === 0) {
      showAlert("Game Over", "No restaurants left to choose from.");
      return;
    }
    const idx = getRandom(0, restaurants.length);
    setChosenRestaurant(restaurants[idx]);
    setSelectedVisible(true);
  };

  const handleAccept = () => {
    setSelectedVisible(false);
    navigation.navigate("PostChoiceScreen", { chosenRestaurant });
  };

  const handleVetoPress = () => {
    setSelectedVisible(false);
    setVetoVisible(true);
  };

  const handleVetoBy = (person) => {
    const updatedParticipants = participants.map((p) =>
      p.key === person.key ? { ...p, vetoed: "yes" } : p,
    );
    const updatedRestaurants = restaurants.filter(
      (r) => !!r && r.key !== chosenRestaurant.key,
    );

    setParticipants(updatedParticipants);
    setRestaurants(updatedRestaurants);
    setVetoVisible(false);
    setChosenRestaurant(null);

    if (updatedRestaurants.length === 0) {
      showAlert(
        "Game Over",
        "All restaurants have been vetoed. Nobody eats tonight!",
        () => navigation.navigate("DecisionTimeScreen"),
      );
      return;
    }

    if (updatedRestaurants.length === 1) {
      navigation.navigate("PostChoiceScreen", {
        chosenRestaurant: updatedRestaurants[0],
      });
      return;
    }

    const stillCanVeto = updatedParticipants.some((p) => p.vetoed === "no");
    if (!stillCanVeto) {
      const idx = getRandom(0, updatedRestaurants.length);
      navigation.navigate("PostChoiceScreen", {
        chosenRestaurant: updatedRestaurants[idx],
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={participants.filter((x) => !!x)}
        keyExtractor={(item) => item?.key || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemName}>
              {item.firstName} {item.lastName} ({item.relationship})
            </Text>
            <Text>Vetoed: {item.vetoed || "no"}</Text>
          </View>
        )}
      />
      <CustomButton
        text="Randomly Choose"
        width="94%"
        onPress={selectRandomRestaurant}
      />

      <Modal visible={selectedVisible} animationType="slide" transparent={false}>
        {chosenRestaurant ? (
          <View style={styles.selectedContainer}>
            <View style={styles.selectedInnerContainer}>
              <Text style={styles.selectedName}>{chosenRestaurant?.name}</Text>
              <View style={styles.selectedDetails}>
                <Text style={styles.selectedDetailsLine}>
                  This is a {"★".repeat(Number(chosenRestaurant?.rating) || 0)} star
                </Text>
                <Text style={styles.selectedDetailsLine}>
                  {chosenRestaurant?.cuisine} restaurant
                </Text>
                <Text style={styles.selectedDetailsLine}>
                  with a price rating of{" "}
                  {"$".repeat(Number(chosenRestaurant?.price) || 0)}
                </Text>
                <Text style={styles.selectedDetailsLine}>
                  that {chosenRestaurant?.delivery === "Yes" ? "DOES" : "DOES NOT"}{" "}
                  deliver
                </Text>
              </View>
              <CustomButton text="Accept" width="94%" onPress={handleAccept} />
              <CustomButton
                text={vetoText}
                width="94%"
                onPress={handleVetoPress}
                disabled={vetoDisabled}
              />
            </View>
          </View>
        ) : (
          <View style={styles.selectedContainer}>
            <Text>No restaurant selected.</Text>
          </View>
        )}
      </Modal>

      <Modal
        visible={vetoVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => {}}
      >
        <View style={styles.vetoContainer}>
          <View style={styles.vetoContainerInner}>
            <Text style={styles.vetoHeadline}>Who is vetoing?</Text>
            <ScrollView style={styles.vetoScrollViewContainer}>
              {participants
                .filter((p) => p.vetoed === "no")
                .map((p) => (
                  <TouchableOpacity
                    key={p.key}
                    style={styles.vetoParticipantContainer}
                    onPress={() => handleVetoBy(p)}
                  >
                    <Text style={styles.vetoParticipantName}>
                      {p.firstName} {p.lastName}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.vetoButtonContainer}>
              <CustomButton
                text="Never Mind"
                width="94%"
                onPress={() => {
                  setVetoVisible(false);
                  setSelectedVisible(true);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: { width: "94%" },
  listItem: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 4,
    paddingVertical: 6,
    borderBottomWidth: 2,
    borderColor: "#e0e0e0",
    alignItems: "center",
  },
  listItemName: { flex: 1 },
  selectedContainer: { flex: 1, justifyContent: "center" },
  selectedInnerContainer: { alignItems: "center" },
  selectedName: { fontSize: 32 },
  selectedDetails: {
    paddingTop: 80,
    paddingBottom: 80,
    alignItems: "center",
  },
  selectedDetailsLine: { fontSize: 18 },
  vetoContainer: { flex: 1, justifyContent: "center" },
  vetoContainerInner: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  vetoHeadline: { fontSize: 32, fontWeight: "bold" },
  vetoScrollViewContainer: { height: "50%" },
  vetoParticipantContainer: { paddingTop: 20, paddingBottom: 20 },
  vetoParticipantName: { fontSize: 24 },
  vetoButtonContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
  },
});

export default ChoiceScreen;
