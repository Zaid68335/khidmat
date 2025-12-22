import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { colors } from "../theme/colors";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: TextInputProps["keyboardType"]; // ✅ Accepts all keyboard types
}

export default function InputField({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  keyboardType = "default",
}: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#aeb5a7"
      multiline={multiline}
      numberOfLines={numberOfLines}
      keyboardType={keyboardType}  // ✅ Now supported
      style={[
        styles.input,
        multiline ? { height: numberOfLines * 25 } : {},
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    color: colors.text,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d4af37",
    marginBottom: 8,
  },
});
