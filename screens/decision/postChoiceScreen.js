import { useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/customButton";

const PostChoiceScreen = ({ navigation }) => {
  const route = useRoute();
  const { chosenRestaurant } = route.params || {};

  if (!chosenRestaurant) {
    return (
      <View style={styles.container}>
        <Text>No restaurant selected.</Text>
      </View>
    );
  }

  const starCount = Number(chosenRestaurant.rating) || 0;
  const dollarCount = Number(chosenRestaurant.price) || 0;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headline}>Enjoy your meal!</Text>

        <View style={styles.detailsBox}>
          <Text style={styles.name}>{chosenRestaurant.name}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Cuisine:</Text>
            <Text style={styles.value}>{chosenRestaurant.cuisine}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>{"$".repeat(dollarCount)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Rating:</Text>
            <Text style={styles.value}>{"★".repeat(starCount)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{chosenRestaurant.phone}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{chosenRestaurant.address}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Website:</Text>
            <Text style={styles.value}>{chosenRestaurant.website}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Delivery:</Text>
            <Text style={styles.value}>{chosenRestaurant.delivery}</Text>
          </View>
        </View>

        <CustomButton
          text="All Done"
          width="94%"
          onPress={() => navigation.navigate("DecisionTimeScreen")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  headline: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailsBox: {
    width: "94%",
    borderWidth: 2,
    borderColor: "#c0c0c0",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
  },
  label: {
    fontWeight: "bold",
    width: 90,
  },
  value: {
    flex: 1,
  },
});

export default PostChoiceScreen;
