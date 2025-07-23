import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();

  const data = [
    {
      title: "Account",
      data: [
        {
          name: "Sign In",
          icon: "account-circle",
          action: () => navigation.navigate("SignIn"),
        },
        {
          name: "Sign Up",
          icon: "person-add",
          action: () => navigation.navigate("SignUp"),
        },
      ],
    },
    {
      title: "Legal",
      data: [
        {
          name: "Privacy Policy",
          icon: "policy",
          action: () => navigation.navigate("PrivacyPolicy"),
        },
        {
          name: "Terms of Use",
          icon: "description",
          action: () => navigation.navigate("TermsOfUse"),
        },
      ],
    },
    {
      title: "App Info",
      data: [
        {
          name: "About the App",
          icon: "info",
          action: () => navigation.navigate("AboutApp"),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={item.action ?? (() => {})}
          >
            <Icon name={item.icon} size={24} color="#333" style={styles.icon} />
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{title}</Text>
            <View style={styles.divider} />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    marginTop: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  icon: {
    marginRight: 12,
  },
  item: {
    fontSize: 16,
    color: "#555",
  },
});
