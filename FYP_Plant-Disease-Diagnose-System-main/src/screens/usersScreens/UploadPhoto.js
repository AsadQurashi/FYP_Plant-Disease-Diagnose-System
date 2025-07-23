import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { BASE_URL } from '@env';

const UploadImageScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const selectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", response.errorMessage);
        return;
      }

      const selected = response.assets[0];
      setImageUri(selected.uri);
      uploadImage(selected);
    });
  };

  const uploadImage = async (photo) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("image", {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName || "image.jpg",
    });

    try {
      const res = await fetch(`http://192.168.100.21:5000/api/image`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setModalVisible(true);
      } else {
        Alert.alert("Upload Failed", data?.error || "Unexpected error");
      }
    } catch (err) {
      Alert.alert("Network Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🌿 Plant Doctor: Instant Leaf Checkup 🌱</Text>

      <TouchableOpacity style={styles.uploadBtn} onPress={selectImage}>
        <Text style={styles.uploadBtnText}>📁 Upload from Gallery</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

      {loading && (
        <ActivityIndicator
          size="large"
          color="#4CAF50"
          style={{ marginTop: 20 }}
        />
      )}

      {/* Diagnosis Result Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>🩺 Diagnosis Result</Text>
            <Text style={styles.modalText}>
              🌱 <Text style={styles.label}>Disease:</Text> {result?.plant_disease || "N/A"}
            </Text>
            <Text style={styles.modalText}>
              📊 <Text style={styles.label}>Prediction:</Text> {result?.prediction_result || "N/A"}
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✅ Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UploadImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9", // Light green background
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 20,
    textAlign: "center",
  },
  uploadBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 4,
  },
  uploadBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  preview: {
    width: 280,
    height: 280,
    borderRadius: 16,
    resizeMode: "cover",
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 18,
    elevation: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 6,
  },
  label: {
    fontWeight: "600",
    color: "#2E7D32",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#388E3C",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
