/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

// prettier-ignore
MapboxGL.setAccessToken('pk.eyJ1IjoiaGFuc2VvMDUwNyIsImEiOiJja3ViY25oY2wwcDlmMm5tbzllMGkwNWI4In0.8gwFWP3KrrHWwfIRbRDWWw');

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

interface IProps {
  coords: number[];
}

const MapComponents: React.FC<IProps> = ({coords}) => {
  return (
    <MapboxGL.MapView
      style={styles.map}
      styleURL="mapbox://styles/hanseo0507/ckubdhvht8c2z19qjr8jxvbx6"
      zoomEnabled={true}
      logoEnabled={false}
      attributionEnabled={false}
      localizeLabels={true}>
      <MapboxGL.Camera zoomLevel={15} centerCoordinate={coords} />
    </MapboxGL.MapView>
  );
};

export default MapComponents;
