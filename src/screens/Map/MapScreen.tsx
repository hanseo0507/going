/* eslint-disable prettier/prettier */
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
import Button from '../../components/Button';

// prettier-ignore
MapboxGL.setAccessToken('pk.eyJ1IjoiaGFuc2VvMDUwNyIsImEiOiJja3ViY25oY2wwcDlmMm5tbzllMGkwNWI4In0.8gwFWP3KrrHWwfIRbRDWWw');

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
});

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

  return coords[0] !== 0 && coords[1] !== 0 ? (
    <View style={styles.page}>
      <View style={styles.container}>
        {
          <View style={styles.container}>
            <MapboxGL.MapView
              style={styles.map}
              styleURL="mapbox://styles/hanseo0507/ckubdhvht8c2z19qjr8jxvbx6"
              zoomEnabled={true}>
              <MapboxGL.Camera zoomLevel={15} centerCoordinate={coords} />
            </MapboxGL.MapView>

            <View>
              <Button></Button>
            </View>
          </View>
        }
      </View>
    </View>
  ) : (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text>위치 권한을 허용해주세요</Text>
      </View>
    </View>
  );
};

export default MapScreen;
