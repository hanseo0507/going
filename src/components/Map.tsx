/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import SearchButton from './SearchButton';

import {IFacility} from '../types/facility';
import LocationMaker from './LocationMarker';

// prettier-ignore
MapboxGL.setAccessToken('pk.eyJ1IjoiaGFuc2VvMDUwNyIsImEiOiJja3ViY25oY2wwcDlmMm5tbzllMGkwNWI4In0.8gwFWP3KrrHWwfIRbRDWWw');

const styles = StyleSheet.create({
  map: {
    flex: 1,
    zIndex: 0,
  },
});

interface MapComponentsProps {
  initializeCoords: number[];
  heading: number;
  zoomLevel: number;
  onUpdate?: (location: MapboxGL.Location) => void;

  facilities: IFacility[];
}

const MapComponents: React.FC<MapComponentsProps> = ({
  initializeCoords,
  heading,
  onUpdate,
  facilities,
}) => {
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
          centerCoordinate={initializeCoords}
          zoomLevel={17}
          maxBounds={{
            ne: [124, 38],
            sw: [132, 33],
          }}
        />
        <MapboxGL.UserLocation showsUserHeadingIndicator onUpdate={onUpdate}>
          <MapboxGL.SymbolLayer
            id="mapbox_user_position"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              iconImage: 'https://i.imgur.com/jl5V91K.png',
              iconSize: 0.09,
              iconRotate: heading,
              iconRotationAlignment: 'map',
              iconAllowOverlap: true,
            }}
          />
        </MapboxGL.UserLocation>
        {facilities.map((v, i) => {
          return (
            <MapboxGL.PointAnnotation
              key={i}
              id="mapbox_facility_position"
              coordinate={v.location.coordinates}>
              <LocationMaker />
            </MapboxGL.PointAnnotation>
          );
        })}
      </MapboxGL.MapView>
    </>
  );
};

export default MapComponents;
