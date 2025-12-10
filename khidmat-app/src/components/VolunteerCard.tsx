import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";
import { Post } from "../context/PostsContext";

export default function VolunteerCard({ item, onPress }: { item: Post | undefined | null; onPress?: () => void }) {
  if (!item) return null;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor:"#fffef7ff",
          padding: 16,
          marginVertical: 8,
          borderRadius: 12,
          borderWidth: 4,
          borderColor: "#d4af37",
        }}
      >
        <Text style={{ color: colors.gold, fontSize: 20, fontWeight: "bold" }}>
          {item.title || "Untitled Post"}
        </Text>
        <Text style={{ color: colors.text }}>{item.description}</Text>
        <Text style={{ color: colors.text }}>Time: {item.time}</Text>
      </View>
    </TouchableOpacity>
  );
}
