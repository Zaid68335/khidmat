import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import InputField from "../components/InputField";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PostsContext } from "../context/PostsContext";
import { v4 as uuidv4 } from "uuid";

export default function CreatePostScreen({ navigation }: any) {
  const { addPost } = useContext(PostsContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // For DateTimePicker
  const [showPicker, setShowPicker] = useState(false);
  const [time, setTime] = useState<Date>(new Date());

  const handleTimeChange = (event: any, selected?: Date) => {
    setShowPicker(Platform.OS === "ios"); // iOS keeps picker open
    if (selected) {
      setTime(selected);
      const hours = selected.getHours().toString().padStart(2, "0");
      const minutes = selected.getMinutes().toString().padStart(2, "0");
      setSelectedTime(`${hours}:${minutes}`);
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !selectedTime) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    addPost({
      id: uuidv4(),
      title,
      description,
      time: selectedTime,
      volunteers: [],
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <InputField 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Post title" 
      />

      <InputField
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Select Time</Text>

      <TouchableOpacity style={styles.timeBtn} onPress={() => setShowPicker(true)}>
        <Text style={styles.timeText}>
          {selectedTime ? `Selected: ${selectedTime}` : "Choose Time"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display={Platform.OS === "android" ? "default" : "spinner"}
          onChange={handleTimeChange}
        />
      )}

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Create Post</Text>
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
  label: {
    color: "#1b4d3e",
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
  },
  timeBtn: {
    backgroundColor: "#1b4d3e",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  timeText: {
    color: "#d4af37",
    textAlign: "center",
    fontWeight: "700",
  },
  submitBtn: {
    backgroundColor: "#d4af37",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#d4af37",
  },
  submitText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
});
