import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { PostsContext, Post } from "../context/PostsContext";
import VolunteerCard from "../components/VolunteerCard";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";

interface Props {
  navigation: any;
}

export default function HomeScreen({ navigation }: Props) {
  const { posts } = useContext(PostsContext);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Dargah Volunteer Service</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CreatePost")}>
          <Text style={styles.addBtn}>+ New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(p, index) => p?.id ?? `${index}`}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No posts yet — create one.</Text>}
        renderItem={({ item }: { item: Post | undefined | null }) =>
          item ? (
            <VolunteerCard
              item={item}
              onPress={() => navigation.navigate("Details", { postId: item.id })}
            />
          ) : null
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
    paddingTop: 18 
  },

  headerRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 8,
    backgroundColor: "#1b4d3e",
    padding: 12,
    borderBottomWidth: 6,
    borderColor: "#d4af37",
    borderRadius: 6,
  },

  headerTitle: { 
    color: "white", 
    fontSize: typography.title, 
    fontWeight: "700" 
  },

  addBtn: { 
    color: "white", 
    backgroundColor: "#d4af37", 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 8, 
    fontWeight: "700",
    borderWidth: 1,
    borderColor: "#1b4d3e"
  },

  list: { 
    paddingBottom: 40 
  },

  empty: { 
    color: colors.muted, 
    textAlign: "center", 
    marginTop: 40 
  },
});

