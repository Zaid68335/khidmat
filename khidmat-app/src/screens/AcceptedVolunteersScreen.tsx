import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { PostsContext } from "../context/PostsContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Accepted">;

export default function AcceptedVolunteersScreen({ route }: Props) {
  const { postId } = route.params;
  const { posts } = useContext(PostsContext);

  const post = posts.find(p => p.id === postId);
  if (!post) return <Text>Post not found</Text>;

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Accepted Volunteers</Text>
      </View>

      <FlatList
        data={post.volunteers}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No volunteers yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "white",
  },

  headerRow: {
    backgroundColor: "#1b4d3e",
    padding: 14,
    borderRadius: 8,
    borderBottomWidth: 4,
    borderColor: "#d4af37",
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
  },

  empty: {
    color: "#1b4d3e",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },

  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#d4af37",
    marginBottom: 10,
  },

  name: {
    color: "#1b4d3e",
    fontWeight: "600",
    fontSize: 16,
  },
});
