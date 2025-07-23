import React from 'react';
import { View } from 'react-native';
import BottomTab from '../navigation/BottomTab';
import { PhotoProvider } from '../context/PhotoContext';
import AdminDrawer from '../navigation/adminDrawer/AdminDrawer';

export default function Index() {
  return (
    <PhotoProvider>
      <View style={{ flex: 1 }}>
        <BottomTab />
        {/* <AdminDrawer /> */}
      </View>
    </PhotoProvider>
  );
}
