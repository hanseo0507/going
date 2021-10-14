/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';
import MapComponents from '../components/Map';
import MapboxGL, {
  OnPressEvent,
  RegionPayload,
} from '@react-native-mapbox-gl/maps';

import axios from 'axios';
import {IFacility} from '../types/facility';
import FacilityInfoScreen from './FacilityInfoScreen';

export interface MapScreenProps {
  followUserLocation: boolean;
}

const MapScreen: React.FC<MapScreenProps> = ({followUserLocation}) => {
  const [coords, setCoords] = useState<number[]>([0, 0]);
  const [heading, setHeading] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(0);
  const [isGranted, setIsGranted] = useState<boolean>(false);
  const [facilities, setFacilities] = useState<IFacility[]>([]);

  const [selectedFacility, setSelectedFacility] = useState<IFacility | null>(
    null,
  );
  const [oldFacility, setOldFacility] = useState<IFacility | null>(null);

  const onUpdate = async (location: MapboxGL.Location) => {
    const {longitude, latitude} = location.coords;
    if (coords[0] !== longitude && coords[1] !== latitude) {
      setCoords([longitude, latitude]);
    }
    setHeading(location.coords.heading || 0);
  };
  const onRegionDidChange = async (
    location: GeoJSON.Feature<GeoJSON.Point, RegionPayload>,
  ) => {
    const {coordinates} = location.geometry;
    const {data} = await axios.get<IFacility[]>(
      'https://going.run.goorm.io/facilities',
      {
        params: {
          lng: coordinates[0],
          lat: coordinates[1],
          distance: 5000,
          limit: 50,
        },
      },
    );
    setFacilities(data);
  };

  const onPressMarker = (event: OnPressEvent) => {
    setSelectedFacility(event.features[0].properties as IFacility);
  };

  const onPressMap = () => {
    setOldFacility(selectedFacility);
    setSelectedFacility(null);
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
        <>
          <MapComponents
            initializeCoords={coords}
            heading={heading}
            followUserLocation={followUserLocation}
            onUpdate={onUpdate}
            onRegionDidChange={onRegionDidChange}
            onPressMarker={onPressMarker}
            onPressMap={onPressMap}
            facilities={facilities}
            zoomLevel={zoomLevel}
          />

          <FacilityInfoScreen
            facility={selectedFacility}
            oldFacility={oldFacility}
          />
        </>
      )}
    </>
  );
};
export default MapScreen;
