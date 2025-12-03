import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export default function InputField({ value, onChangeText, placeholder, multiline = false, numberOfLines = 1 }: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#aeb5a7"
      multiline={multiline}
      numberOfLines={numberOfLines}
      style={[styles.input, multiline ? { height: numberOfLines * 25 } : {}]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor:"white",
    color: colors.text,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d4af37",
    marginBottom: 8,
  },
});
