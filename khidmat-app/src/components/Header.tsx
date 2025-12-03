import React from "react";
import { View, Text } from "react-native";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";

export default function Header({ title }: { title: string }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: typography.title, color:"white", fontWeight: "bold" }}>
        {title}
      </Text>
    </View>
  );
}
