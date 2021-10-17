/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapComponents from '../components/Map';
import MapboxGL, {
  OnPressEvent,
  RegionPayload,
} from '@react-native-mapbox-gl/maps';

import axios from 'axios';
import {IFacility} from '../types/facility';
import FacilityInfoScreen from './FacilityInfoScreen';
import Button from '../components/Button';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomStopSharing from '../components/BottomStopSharing';

export interface MapScreenProps {
  facility: IFacility | boolean;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  startAt: Date;
  setStartAt: React.Dispatch<React.SetStateAction<Date>>;
}

const MapScreen: React.FC<MapScreenProps> = ({
  facility,
  showSearch,
  setShowSearch,
  startAt,
  setStartAt,
}) => {
  const cameraRef = useRef<MapboxGL.Camera>(null);

  const [coords, setCoords] = useState<number[]>([0, 0]);
  const [coordsForUpdate, setCoordsForUpdate] = useState<number[]>([0, 0]);
  const [heading, setHeading] = useState<number>(0);

  const [isGranted, setIsGranted] = useState<boolean>(false);
  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const [followUserMode, setFollowUserMode] =
    useState<MapboxGL.UserTrackingModes>(MapboxGL.UserTrackingModes.Follow);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [followUserLocation, setFollowUserLocation] = useState<boolean>(true);

  const [selectedFacility, setSelectedFacility] = useState<IFacility | null>(
    null,
  );
  const [findFacility, setFindFacility] = useState<IFacility | null>(null);
  const [oldFacility, setOldFacility] = useState<IFacility | null>(null);
  const [isFinding, setIsFinding] = useState<boolean>(false);
  const [showSupport, setShowSupport] = useState<boolean>(false);
  const [isSupport, setIsSupporting] = useState<boolean>(false);
  const [locations, setLocations] = useState<{id: number; coords: number[]}[]>(
    [],
  );

  const getLocation = (): Promise<{coords: number[]; heading: number}> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          resolve({
            coords: [longitude, latitude],
            heading: position.coords.heading || 0,
          });
        },
        error => {
          reject(error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isSupport) {
      interval = setInterval(async () => {
        const {coords} = await getLocation();
        setLocations(prev => [...prev, {id: prev.length + 1, coords}]);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isSupport]);

  const onUpdate = async (location: MapboxGL.Location) => {
    const {longitude, latitude} = location.coords;
    if (coords[0] !== longitude && coords[1] !== latitude) {
      setCoordsForUpdate([longitude, latitude]);
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
    const current = event.features[0].properties as IFacility;

    cameraRef.current?.setCamera({
      centerCoordinate: current.location.coordinates,
      zoomLevel: 16,
      animationDuration: 2000,
    });

    setSelectedFacility(current);
  };

  const onPressMap = () => {
    setOldFacility(selectedFacility);
    setSelectedFacility(null);
    setShowSupport(false);
  };

  const onPressGPSButton = async () => {
    const location = await getLocation();
    cameraRef.current?.flyTo(location.coords, 1000);
    setTimeout(() => cameraRef.current?.zoomTo(16), 900);

    if (!followUserLocation) {
      setFollowUserMode(MapboxGL.UserTrackingModes.Follow);
    } else {
      setFollowUserMode(MapboxGL.UserTrackingModes.FollowWithHeading);
    }
  };

  const onPressFindRoad = () => {
    setShowSupport(true);
    setStartAt(new Date());

    setFindFacility(selectedFacility);
    setSelectedFacility(null);
    setOldFacility(null);
  };

  const onPressCancleFindDirection = () => {
    setIsFinding(false);
    setOldFacility(null);
    setSelectedFacility(null);
    setIsSupporting(false);
    setShowSearch(true);
  };

  const onSupportTouchEnd = () => {
    setShowSupport(true);
  };

  const onPressOK = () => {
    setShowSupport(false);
    findFacility && setIsFinding(true);
    findFacility && setIsSupporting(true);
    setShowSearch(false);
  };

  const onPressLater = () => {
    setShowSupport(false);
    findFacility && setIsFinding(true);
  };

  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('always');
        await Geolocation.requestAuthorization('always');
      }
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }

      const location = await getLocation();

      setCoords(location.coords);
      setCoordsForUpdate(location.coords);
      setHeading(location.heading);
      setIsGranted(true);
    }
    requestPermissions();
  }, []);

  useEffect(() => {
    const getFacilities = async () => {
      const {data} = await axios.get<IFacility[]>(
        'https://going.run.goorm.io/facilities',
        {
          params: {
            lng: coordsForUpdate[0],
            lat: coordsForUpdate[1],
            distance: 4000,
            limit: 50,
          },
        },
      );
      setFacilities(data);
    };
    getFacilities();
  }, [coordsForUpdate]);

  useEffect(() => {
    if (facility && facility instanceof Object) {
      setSelectedFacility(facility);
      cameraRef.current?.setCamera({
        centerCoordinate: facility.location.coordinates,
        zoomLevel: 16,
        animationDuration: 2000,
      });
    }
  }, [facility]);

  return (
    <>
      {isGranted && (
        <>
          <MapComponents
            centerCoordinate={coords}
            heading={heading}
            onUpdate={onUpdate}
            onRegionDidChange={onRegionDidChange}
            onPressMarker={onPressMarker}
            onPressMap={onPressMap}
            facilities={facilities}
            selectedFacility={findFacility}
            zoomLevel={16}
            cameraRef={cameraRef}
            followUserMode={followUserMode}
            followUserLocation={followUserLocation}
            isFinding={isFinding}
            userLocation={coords}
          />
          <BottomStopSharing />
          <FacilityInfoScreen
            facility={selectedFacility}
            oldFacility={oldFacility}
            followUserLocation={followUserLocation}
            onTouchEnd={onPressGPSButton}
            onPressFindRoad={onPressFindRoad}
            isFinding={isFinding}
            onPressCancleFindDirection={onPressCancleFindDirection}
            showSupport={showSupport}
            onSupportTouchEnd={onSupportTouchEnd}
            onPressOK={onPressOK}
            onPressLater={onPressLater}
          />
        </>
      )}
    </>
  );
};
export default MapScreen;
