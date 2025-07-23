// import React from "react";
// import { Text, View, StyleSheet } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Ionicons from "react-native-vector-icons/Ionicons"; // CLI-compatible version
// import HomePage from "../screens/usersScreens/Home"
// import PlantsScreen from "../screens/usersScreens/MyPlantScreen";
// import DrawerScreen from "./Drawer"
// import CameraScreen from "../camera/CameraView";
// import { PhotoProvider } from "../context/PhotoContext"; // Adjusted path if you moved it

// function DiagnoseScreen() {
//   return (
//     <View style={styles.screen}>
//       <Text>Diagnose Screen</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function BottomTab() {
//   return (
//     <PhotoProvider>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => {
//             let iconName;

//             if (route.name === "Home") {
//               iconName = "home";
//             } else if (route.name === "Diagnose") {
//               iconName = "medkit";
//             } else if (route.name === "CameraScreen") {
//               iconName = "camera";
//             } else if (route.name === "My Plants") {
//               iconName = "leaf";
//             } else if (route.name === "Setting") {
//               iconName = "settings";
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarLabelStyle: {
//             fontSize: 12,
//             marginTop: 4,
//           },
//           tabBarIconStyle: {
//             marginBottom: -4,
//           },
//           tabBarStyle: {
//             backgroundColor: "#f0f8f5",
//             paddingVertical: 8,
//           },
//           tabBarActiveTintColor: "#2e7d32",
//           tabBarInactiveTintColor: "#8c8c8c",
//         })}
//       >
//         <Tab.Screen name="Home" component={HomePage} />
//         <Tab.Screen name="Diagnose" component={DiagnoseScreen} />
//         <Tab.Screen name="CameraScreen" component={CameraScreen} options={{tabBarStyle : {display : 'none'},}} />
//         <Tab.Screen name="My Plants" component={PlantsScreen} />
//         <Tab.Screen name="Setting" component={DrawerScreen} />
//       </Tab.Navigator>
//     </PhotoProvider>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     alignItems: "center",
//   },
// });

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomePage from "../screens/usersScreens/Home";
import PlantsScreen from "../screens/usersScreens/MyPlantScreen";
import DrawerScreen from "./Drawer";
import PlantCameraScreen from "../camera/CameraView";
import GalleryStack from './galleryNavigation/GalleryStack'
import { PhotoProvider } from "../context/PhotoContext";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <PhotoProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Diagnose") {
              iconName = "camera";
            } else if (route.name === "Gallery") {
              iconName = "images";
            } else if (route.name === "My Plants") {
              iconName = "leaf";
            } else if (route.name === "Setting") {
              iconName = "settings";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 4,
          },
          tabBarIconStyle: {
            marginBottom: -4,
          },
          tabBarStyle: {
            backgroundColor: "#f0f8f5",
            paddingVertical: 8,
          },
          tabBarActiveTintColor: "#2e7d32",
          tabBarInactiveTintColor: "#8c8c8c",
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Gallery" component={GalleryStack} />
        <Tab.Screen name="Diagnose" component={PlantCameraScreen} options={{ tabBarStyle: { display: 'none' } }}/>
        <Tab.Screen name="My Plants" component={PlantsScreen} />
        <Tab.Screen name="Setting" component={DrawerScreen} />
      </Tab.Navigator>
    </PhotoProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
});