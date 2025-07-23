import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GalleryUploadScreen from '../../screens/usersScreens/UploadPhoto';
import DiagnosisResultScreen from '../../screens/usersScreens/DiagnosisResultScreen';

const Stack = createNativeStackNavigator();

export default function GalleryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GalleryUpload" component={GalleryUploadScreen} />
      <Stack.Screen name="DiagnosisResult" component={DiagnosisResultScreen} />
    </Stack.Navigator>
  );
}