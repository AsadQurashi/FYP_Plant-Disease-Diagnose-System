/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator'
import { PhotoProvider } from './src/context/PhotoContext';

export default function App() {
  return (
    <PhotoProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </PhotoProvider>
  );
}
