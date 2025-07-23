// // src/navigation/adminDrawer/AdminDrawer.js

// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { View, Text, StyleSheet } from 'react-native';

// // Admin Screens
// import Dashboard from '../../screens/adminScreens/Dashboard';
// import UserManagement from '../../screens/adminScreens/UserManagement';
// import Reports from '../../screens/adminScreens/Report';

// // Optional: Custom drawer content
// import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// const CustomDrawerContent = (props) => {
//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={styles.drawerHeader}>
//         <Text style={styles.drawerTitle}>Admin Panel</Text>
//       </View>
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// };

// const Drawer = createDrawerNavigator();

// const AdminDrawer = () => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Dashboard"
//       screenOptions={{
//         headerShown: true,
//         drawerActiveTintColor: '#0B5D51',
//         drawerInactiveTintColor: '#aaa',
//         drawerStyle: {
//           backgroundColor: '#fff',
//           width: 240,
//         },
//         drawerLabelStyle: {
//           marginLeft: -16,
//           fontSize: 16,
//         },
//       }}
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen
//         name="Dashboard"
//         component={Dashboard}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="speedometer-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="User Management"
//         component={UserManagement}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="people-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Reports"
//         component={Reports}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="document-text-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   drawerHeader: {
//     padding: 20,
//     backgroundColor: '#0B5D51',
//   },
//   drawerTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default AdminDrawer;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../../screens/adminScreens/Dashboard';
import UserManagement from '../../screens/adminScreens/UserManagement';
import Reports from '../../screens/adminScreens/Report';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="UserManagement" component={UserManagement} />
        <Stack.Screen name="Reports" component={Reports} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
