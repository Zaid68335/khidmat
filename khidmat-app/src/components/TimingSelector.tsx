import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Props {
  value: string | null;
  onSelect: (time: string) => void;
}

export default function TimeSelector({ value, onSelect }: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const [tempTime, setTempTime] = useState(new Date());

  const handleChange = (_: any, selected?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (selected) {
      const formatted = formatAMPM(selected);
      setTempTime(selected);
      onSelect(formatted);
    }
  };

  function formatAMPM(date: Date) {
    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.selectorBox}
      >
        <Text style={styles.selectorText}>
          {value ? value : "Select Time"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <Modal transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Choose Time</Text>

              <DateTimePicker
                value={tempTime}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleChange}
              />

              <TouchableOpacity
                onPress={() => setShowPicker(false)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },

  selectorBox: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#d4af37",
  },

  selectorText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1b4d3e",
    textAlign: "center",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#d4af37",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1b4d3e",
  },

  closeBtn: {
    marginTop: 12,
    backgroundColor: "#1b4d3e",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  closeBtnText: {
    color: "#d4af37",
    fontWeight: "700",
    fontSize: 16,
  },
});
