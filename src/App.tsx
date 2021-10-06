import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';
import HomeScreen from './screens/Home/HomeScreen';

const App: React.FC = () => {
  return <HomeScreen />;
};

export default App;
