import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { PostsContext } from "../context/PostsContext";
import InputField from "../components/InputField";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { MaterialIcons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function PostDetailsScreen({ route, navigation }: Props) {
  const { postId } = route.params;
  const { posts, acceptVolunteer, deletePost } = useContext(PostsContext);
  const post = posts.find(p => p.id === postId);
  const [volunteerName, setVolunteerName] = useState("");

  if (!post) return <Text>Post not found</Text>;

  const handleAccept = () => {
    if (!volunteerName) return Alert.alert("Error", "Enter your name");
    acceptVolunteer(postId, volunteerName);
    setVolunteerName("");
    Alert.alert("Success", "You are now a volunteer!");
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deletePost(postId);
            Alert.alert("Deleted", "Post deleted successfully.", [
              { text: "OK", onPress: () => navigation.goBack() }
            ]);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER BAR */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{post.title}</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.iconBtn}>
          <MaterialIcons name="delete" size={28} color="#d4af37" />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <Text style={styles.desc}>{post.description}</Text>
      <Text style={styles.time}>Time: {post.time}</Text>

      <InputField
        value={volunteerName}
        onChangeText={setVolunteerName}
        placeholder="Your Name"
      />

      <TouchableOpacity style={styles.btn} onPress={handleAccept}>
        <Text style={styles.btnText}>Accept Volunteer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { marginTop: 10 }]}
        onPress={() => navigation.navigate("Accepted", { postId })}
      >
        <Text style={styles.btnText}>View Accepted Volunteers</Text>
      </TouchableOpacity>

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  iconBtn: {
    padding: 4,
  },

  desc: {
    color: "#1b4d3e",
    fontSize: 16,
    marginBottom: 10,
  },

  time: {
    color: "#d4af37",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 20,
  },

  btn: {
    backgroundColor: "#d4af37",
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },

  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
  },
});
