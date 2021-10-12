/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import SearchButton from './SearchButton';

// prettier-ignore
MapboxGL.setAccessToken('pk.eyJ1IjoiaGFuc2VvMDUwNyIsImEiOiJja3ViY25oY2wwcDlmMm5tbzllMGkwNWI4In0.8gwFWP3KrrHWwfIRbRDWWw');

const styles = StyleSheet.create({
  map: {
    flex: 1,
    zIndex: 0,
  },
});

interface IProps {
  coords: number[];
}

const MapComponents: React.FC<IProps> = ({coords}) => {
  return (
    <>
      <SearchButton />
      <MapboxGL.MapView
        style={styles.map}
        styleURL="mapbox://styles/hanseo0507/ckubdhvht8c2z19qjr8jxvbx6"
        zoomEnabled={true}
        logoEnabled={false}
        attributionEnabled={false}
        localizeLabels={true}>
        <MapboxGL.Camera
          centerCoordinate={coords}
          zoomLevel={15}
          maxBounds={{
            ne: [124, 38],
            sw: [132, 33],
          }}
        />
      </MapboxGL.MapView>
    </>
  );
};

export default MapComponents;
