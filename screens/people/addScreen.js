import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/customButton";
import CustomTextInput from "../../components/customTextInput";
import Toast from "react-native-toast-message";
import { validateFirstName, validateLastName } from "./validators";

const AddScreen = ({ navigation }) => {
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    relationship: "",
    key: `p_${new Date().getTime()}`,
    errors: {},
  });

  const setField = (field, value) => {
    setPerson((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: null },
    }));
  };

  const validateAllFields = () => {
    const { firstName, lastName, relationship } = person;

    const errors = {
      firstName: validateFirstName(firstName),
      lastName: validateLastName(lastName),
      relationship: !relationship ? "Relationship is required" : null,
    };

    setPerson((prev) => ({ ...prev, errors }));
    return !Object.values(errors).some((error) => error !== null);
  };

  const savePerson = async () => {
    if (!validateAllFields()) {
      const errors = person.errors;
      const firstErrorField = Object.keys(errors).find(
        (key) => errors[key] !== null
      );
      if (firstErrorField) {
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: errors[firstErrorField],
          visibilityTime: 3000,
        });
      }
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem("people");
      const people = existingData ? JSON.parse(existingData) : [];

      const personToSave = {
        key: person.key,
        firstName: person.firstName,
        lastName: person.lastName,
        relationship: person.relationship,
      };

      people.push(personToSave);
      await AsyncStorage.setItem("people", JSON.stringify(people));

      Toast.show({
        type: "success",
        text1: "Person saved!",
        visibilityTime: 2000,
      });

      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error saving person",
        text2: error.message,
        visibilityTime: 3000,
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.addScreenInnerContainer}>
        <View style={styles.addScreenFormContainer}>
          <CustomTextInput
            label="First Name"
            maxLength={50}
            value={person.firstName}
            onChangeText={(text) => setField("firstName", text)}
            error={person.errors.firstName}
          />
          <CustomTextInput
            label="Last Name"
            maxLength={50}
            value={person.lastName}
            onChangeText={(text) => setField("lastName", text)}
            error={person.errors.lastName}
          />
          <Text style={styles.fieldLabel}>Relationship</Text>
          <View style={[styles.pickerContainer]}>
            <Picker
              prompt="Relationship"
              selectedValue={person.relationship}
              onValueChange={(value) => setField("relationship", value)}
              style={[
                styles.picker,
                person.errors.relationship ? { borderColor: "red" } : {},
              ]}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="Me" value="Me" />
              <Picker.Item label="Family" value="Family" />
              <Picker.Item label="Friend" value="Friend" />
              <Picker.Item label="Coworker" value="Coworker" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          {person.errors.relationship && (
            <Text style={{ color: "red", marginLeft: 10, marginBottom: 10 }}>
              {person.errors.relationship}
            </Text>
          )}
        </View>
        <View style={styles.addScreenButtonsContainer}>
          <CustomButton
            text="Cancel"
            onPress={() => navigation.goBack()}
            buttonStyle={styles.cancelButton}
          />
          <CustomButton
            text="Save"
            onPress={savePerson}
            buttonStyle={styles.saveButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addScreenInnerContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
  },
  addScreenFormContainer: { width: "96%" },
  fieldLabel: {
    marginLeft: 10,
  },
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
  addScreenButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  cancelButton: { backgroundColor: "gray", width: "44%" },
  saveButton: { backgroundColor: "green", width: "44%" },
});

export default AddScreen;
