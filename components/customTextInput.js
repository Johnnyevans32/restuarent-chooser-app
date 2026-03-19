import React from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomTextInput = ({
  label,
  labelStyle,
  maxLength,
  textInputStyle,
  value,
  onChangeText,
  error,
  keyboardType,
  autoCapitalize,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[
          styles.textInput,
          textInputStyle,
          error ? { borderColor: "red" } : {},
        ]}
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

CustomTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
  maxLength: PropTypes.number,
  textInputStyle: PropTypes.object,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  error: PropTypes.string,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    marginLeft: 10,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#c0c0c0",
    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 4,
  },
  errorText: {
    color: "red",
    marginLeft: 10,
    marginTop: 4,
  },
});

export default CustomTextInput;
