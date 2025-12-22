import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import InputField from "../components/InputField";
import TimeSelector from "../components/TimingSelector"; 
import { PostsContext, Post, PostType } from "../context/PostsContext";
import { colors } from "../theme/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { v4 as uuidv4 } from "uuid";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "CreatePost">;

export default function CreatePostScreen({ navigation }: Props) {
  const { addPost } = useContext(PostsContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [postType, setPostType] = useState<PostType>("volunteer");
  const [qrUri, setQrUri] = useState<string | null>(null);

  // Image Picker for QR
  const pickQrImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission needed", "Please allow gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
    });

    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri;
      if (uri) setQrUri(uri);
    }
  };

  // Submit Post
  const handleSubmit = () => {
    if (!title || !description || !time) {
      Alert.alert("Missing fields", "Please fill all fields.");
      return;
    }

    if (postType === "sponsor" && !qrUri) {
      Alert.alert("QR required", "Please upload a QR code for sponsor posts.");
      return;
    }

    const newPost: Post = {
      id: uuidv4(),
      title,
      description,
      time,
      volunteers: [],
      type: postType,
      qrCode: postType === "sponsor" ? qrUri : null,
    };

    addPost(newPost);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.heading}>Create New Post</Text>

      {/* Inputs */}
      <InputField
        value={title}
        onChangeText={setTitle}
        placeholder="Post Title"
      />

      <InputField
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        numberOfLines={3}
      />

      {/* Time Picker */}
      <Text style={styles.label}>Select Time</Text>
      <TimeSelector value={time} onSelect={setTime} />

      {/* Post Type */}
      <Text style={[styles.label, { marginTop: 14 }]}>Post Type</Text>

      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[
            styles.typeBtn,
            postType === "volunteer" && styles.typeSelected,
          ]}
          onPress={() => setPostType("volunteer")}
        >
          <MaterialIcons
            name="person-add"
            size={18}
            color={postType === "volunteer" ? "black" : "#d4af37"}
          />
          <Text
            style={[
              styles.typeText,
              postType === "volunteer" && { color: "black" },
            ]}
          >
            Volunteer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeBtn,
            postType === "sponsor" && styles.typeSelected,
          ]}
          onPress={() => setPostType("sponsor")}
        >
          <MaterialIcons
            name="qr-code"
            size={18}
            color={postType === "sponsor" ? "black" : "#d4af37"}
          />
          <Text
            style={[
              styles.typeText,
              postType === "sponsor" && { color: "black" },
            ]}
          >
            Sponsor (QR)
          </Text>
        </TouchableOpacity>
      </View>

      {/* QR Section */}
      {postType === "sponsor" && (
        <>
          <Text style={[styles.label, { marginTop: 12 }]}>Upload QR Code</Text>

          <View style={styles.qrRow}>
            <TouchableOpacity style={styles.qrBtn} onPress={pickQrImage}>
              <Text style={styles.qrBtnText}>Choose QR</Text>
            </TouchableOpacity>

            {qrUri && (
              <Image source={{ uri: qrUri }} style={styles.qrPreview} />
            )}
          </View>
        </>
      )}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
        <Text style={styles.saveText}>Create Post</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---- Styles ----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fffef7",
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1b4d3e",
    marginBottom: 16,
  },

  label: {
    color: "#1b4d3e",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 6,
  },

  typeRow: {
    flexDirection: "row",
    gap: 12,
  },

  typeBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#d4af37",
  },

  typeSelected: {
    backgroundColor: "#d4af37",
  },

  typeText: {
    color: "#1b4d3e",
    marginLeft: 8,
    fontWeight: "700",
  },

  qrRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  qrBtn: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#d4af37",
  },

  qrBtnText: {
    color: "#1b4d3e",
    fontWeight: "700",
  },

  qrPreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#d4af37",
  },

  saveBtn: {
    marginTop: 20,
    backgroundColor: "#d4af37",
    padding: 14,
    borderRadius: 12,
  },

  saveText: {
    color: "#1b4d3e",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
