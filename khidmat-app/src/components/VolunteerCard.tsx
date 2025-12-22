import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { colors } from "../theme/colors";
import { Post } from "../context/PostsContext";

export default function VolunteerCard({
  item,
  onPress,
}: {
  item: Post;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.time}>Time: {item.time}</Text>
      </View>

      {/* TYPE BADGE */}
      <View style={styles.rightCol}>
        <View
          style={[
            styles.badge,
            item.type === "sponsor" ? styles.sponsorBadge : styles.volunteerBadge,
          ]}
        >
          <Text style={styles.badgeText}>
            {item.type === "sponsor" ? "Sponsor" : "Volunteer"}
          </Text>
        </View>

        {item.type === "sponsor" && item.qrCode ? (
          <Image source={{ uri: item.qrCode }} style={styles.qrThumb} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fffef7",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#d4af37",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    color: "#1b4d3e",
    fontSize: 18,
    fontWeight: "bold",
  },

  desc: { color: "#1b4d3e", marginTop: 4 },

  time: {
    color: "#1b4d3e",
    marginTop: 6,
    fontWeight: "600",
  },

  rightCol: {
    alignItems: "center",
    justifyContent: "space-between",
  },

  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  sponsorBadge: {
    backgroundColor: "#d4af37",
  },

  volunteerBadge: {
    backgroundColor: "#9fe3c1",
  },

  badgeText: {
    color: "black",
    fontWeight: "700",
    fontSize: 12,
  },

  qrThumb: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginTop: 10,
  },
});
