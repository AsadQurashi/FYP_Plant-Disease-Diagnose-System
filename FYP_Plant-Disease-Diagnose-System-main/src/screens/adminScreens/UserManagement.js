import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/user/get-all");
      const data = await response.json();
      setUsers(data.result || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.user_id !== userId)
    );

    fetch(`http://127.0.0.1:5000/UserDelete?user_id=${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.message?.includes("deleted")) {
          Alert.alert(
            "Warning",
            result.message || "Could not delete from backend"
          );
        }
      })
      .catch((error) => {
        console.error("Backend delete failed:", error);
        Alert.alert("Warning", "Deleted from UI, but backend failed.");
      });
  };

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userDetailsContainer}>
        <Ionicons name="person-circle-outline" size={24} color="#0B5D51" />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.username}</Text>
          <Text style={styles.userDetails}>Email: {item.email}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.user_id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0B5D51" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) =>
          item?.user_id != null ? item.user_id.toString() : index.toString()
        }
        renderItem={renderUser}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0B5D51",
    marginBottom: 10,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  userDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  userDetails: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserManagement;
