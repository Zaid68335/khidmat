import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { PostsContext } from "../context/PostsContext";
import InputField from "../components/InputField";
import { colors } from "../theme/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import * as Clipboard from "expo-clipboard";
import { MaterialIcons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function PostDetailsScreen({ route, navigation }: Props) {
  const { postId } = route.params;
  const { posts, acceptVolunteer, deletePost } = useContext(PostsContext);
  const post = posts.find((p) => p.id === postId);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!post) return <Text style={{ color: colors.text }}>Post not found</Text>;

  const handleVolunteer = () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert("Missing Fields", "Please enter both name and phone.");
      return;
    }

    const entry = `${name.trim()} | ${phone.trim()}`;
    acceptVolunteer(postId, entry);

    setName("");
    setPhone("");

    Alert.alert("Success", "You have signed up as a volunteer!");
  };

  const handleCopyQR = async () => {
    if (!post.qrCode) return;
    await Clipboard.setStringAsync(post.qrCode);
    Alert.alert("Copied", "QR image link copied.");
  };

  const confirmDelete = () => {
    Alert.alert("Delete Post?", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deletePost(postId);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{post.title}</Text>
        <TouchableOpacity onPress={confirmDelete}>
          <MaterialIcons name="delete" size={26} color="#b00020" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.desc}>{post.description}</Text>

        <Text style={styles.label}>Time</Text>
        <Text style={styles.time}>{post.time}</Text>
      </View>

      {/* Volunteer Type UI */}
      {post.type === "volunteer" ? (
        <>
          <Text style={styles.section}>Volunteer Sign-Up</Text>
          <InputField
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />
          <InputField
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.btn} onPress={handleVolunteer}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={[styles.section, { marginTop: 20 }]}>
            Accepted Volunteers
          </Text>

          {post.volunteers.length === 0 ? (
            <Text style={styles.empty}>No volunteers yet</Text>
          ) : (
            post.volunteers.map((v, i) => (
              <View key={i} style={styles.volunteerRow}>
                <MaterialIcons
                  name="person"
                  size={18}
                  color={colors.gold}
                />
                <Text style={styles.volunteerText}>{v}</Text>
              </View>
            ))
          )}
        </>
      ) : (
        /* Sponsor UI */
        <>
          <Text style={styles.section}>Sponsor This Meal</Text>

          {post.qrCode ? (
            <Image source={{ uri: post.qrCode }} style={styles.qrImage} />
          ) : (
            <Text style={styles.empty}>No QR uploaded</Text>
          )}

          <TouchableOpacity style={styles.btn} onPress={handleCopyQR}>
            <Text style={styles.btnText}>Copy QR Link</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fffef7" },

  header: {
    backgroundColor: "#1b4d3e",
    padding: 14,
    borderRadius: 8,
    borderBottomWidth: 4,
    borderColor: "#d4af37",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: { color: "white", fontSize: 20, fontWeight: "700" },

  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#d4af37",
    marginTop: 16,
  },

  label: { color: "#1b4d3e", fontWeight: "700", marginTop: 8 },

  desc: { color: "#1b4d3e", marginTop: 4 },

  time: {
    color: "#1b4d3e",
    marginTop: 4,
    fontWeight: "700",
  },

  section: {
    marginTop: 20,
    color: "#1b4d3e",
    fontWeight: "700",
    fontSize: 18,
  },

  btn: {
    marginTop: 12,
    backgroundColor: "#d4af37",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: { color: "#1b4d3e", fontWeight: "700", fontSize: 16 },

  empty: { color: "#1b4d3e", marginTop: 10 },

  qrImage: {
    width: 220,
    height: 220,
    borderRadius: 12,
    alignSelf: "center",
    marginVertical: 12,
  },

  volunteerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  volunteerText: { color: "#1b4d3e", marginLeft: 6, fontWeight: "600" },
});
