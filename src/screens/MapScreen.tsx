/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';
import MapComponents from '../components/Map';
import MapboxGL from '@react-native-mapbox-gl/maps';

import axios from 'axios';
import {IFacility} from '../types/facility';

const MapScreen: React.FC = () => {
  const [coords, setCoords] = useState<number[]>([0, 0]);
  const [heading, setHeading] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(0);
  const [isGranted, setIsGranted] = useState<boolean>(false);
  const [facilities, setFacilities] = useState<IFacility[]>([]);

  const onUpdate = async (location: MapboxGL.Location) => {
    const {longitude, latitude} = location.coords;
    if (coords[0] !== longitude && coords[1] !== latitude) {
      setCoords([longitude, latitude]);
    }
    setHeading(location.coords.heading || 0);
  };

  useEffect(() => {
    async function getLocation() {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;

          setCoords([longitude, latitude]);
          setHeading(position.coords.heading || 0);
          setIsGranted(true);
        },
        error => {
          console.log('error', error.code, error.message);
          console.error('error', error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }

    async function requestPermissions() {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('always');
        await Geolocation.requestAuthorization('always');
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

  useEffect(() => {
    const getFacilities = async () => {
      const {data} = await axios.get<IFacility[]>(
        'https://going.run.goorm.io/facilities',
        {
          params: {lng: coords[0], lat: coords[1], distance: 4000, limit: 50},
        },
      );

      setFacilities(data);
    };

    getFacilities();
  }, [coords]);

  return (
    <>
      {isGranted && (
        <MapComponents
          initializeCoords={coords}
          heading={heading}
          onUpdate={onUpdate}
          facilities={facilities}
          zoomLevel={zoomLevel}
        />
      )}
    </>
  );
};

export default MapScreen;
