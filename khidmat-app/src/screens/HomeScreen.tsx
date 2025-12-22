import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { PostsContext, Post } from "../context/PostsContext";
import VolunteerCard from "../components/VolunteerCard";
import { colors } from "../theme/colors";

interface Props {
  navigation: any;
}

export default function HomeScreen({ navigation }: Props) {
  const { posts } = useContext(PostsContext);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#1b4d3e" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dargah Volunteer Service</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CreatePost")}>
          <Text style={styles.addBtn}>+ New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => (
          <VolunteerCard
            item={item}
            onPress={() => navigation.navigate("Details", { postId: item.id })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No posts yet — create one.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  header: {
    backgroundColor: "#1b4d3e",
    padding: 14,
    borderRadius: 8,
    borderBottomWidth: 6,
    borderColor: "#d4af37",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  addBtn: {
    color: "#1b4d3e",
    backgroundColor: "#d4af37",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontWeight: "700",
    borderColor: "#1b4d3e",
    borderWidth: 1,
  },

  emptyText: {
    textAlign: "center",
    color: "#1b4d3e",
    marginTop: 40,
    fontSize: 16,
  },
});
