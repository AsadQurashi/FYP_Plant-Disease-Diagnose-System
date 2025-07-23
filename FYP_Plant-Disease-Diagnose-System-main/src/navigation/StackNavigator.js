// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Index from '../screens/Index';
// import SignInScreen from '../components/authPages/SignIn';
// import SignUpScreen from '../components/authPages/SignUp';
// import Report from '../screens/usersScreens/Report';
// import PrivacyPolicy from '../screens/usersScreens/PrivacyPolicy';
// import TermsOfUse from '../screens/usersScreens/TermsOfUse';
// import AboutApp from '../screens/usersScreens/AboutApp';
// import GalleryUploadScreen from '../screens/usersScreens/UploadPhoto';

// const Stack = createNativeStackNavigator();

// export default function StackNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Index" component={Index} />
//       <Stack.Screen name="SignIn" component={SignInScreen} />
//       <Stack.Screen name="SignUp" component={SignUpScreen} />
//       <Stack.Screen name="Report" component={Report} />
//       <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
//       <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
//       <Stack.Screen name="AboutApp" component={AboutApp} />
//       <Stack.Screen name="DataUpload" component={GalleryUploadScreen} options={{ title: 'Upload Plant Photo' }}
// />
//     </Stack.Navigator>
//   );
// }

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../screens/Index';
import SignInScreen from '../components/authPages/SignIn';
import SignUpScreen from '../components/authPages/SignUp';
import Report from '../screens/adminScreens/Report';
import PrivacyPolicy from '../screens/usersScreens/PrivacyPolicy';
import TermsOfUse from '../screens/usersScreens/TermsOfUse';
import AboutApp from '../screens/usersScreens/AboutApp';
import BottomTab from './BottomTab';
import DiagnosisResultScreen from '../screens/usersScreens/DiagnosisResultScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Main" component={BottomTab} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
      <Stack.Screen name="AboutApp" component={AboutApp} />
      <Stack.Screen name="DiagnosisResult" component={DiagnosisResultScreen} options={{ title: 'Diagnosis Result' }} />
    </Stack.Navigator>
  );
}
