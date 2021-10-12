/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';
import MapComponents from '../components/Map';

const MapScreen: React.FC = () => {
  const [coords, setCoords] = useState<number[]>([0, 0]);

  useEffect(() => {
    async function getLocation() {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          const {latitude, longitude} = position.coords;

          setCoords([longitude, latitude]);
        },
        error => {
          console.log('error', error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }

    async function requestPermissions() {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('always');
        getLocation();
      }

      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        getLocation();
      }
    }

    requestPermissions();
  }, []);

  return (
    <>
      <MapComponents coords={coords} />
    </>
  );
};

export default MapScreen;
