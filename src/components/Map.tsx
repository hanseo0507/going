/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet} from 'react-native';
import MapboxGL, {
  OnPressEvent,
  RegionPayload,
} from '@react-native-mapbox-gl/maps';

import {IFacility} from '../types/facility';
import LocationMarker from './LocationMarker';

// prettier-ignore
MapboxGL.setAccessToken('pk.eyJ1IjoiaGFuc2VvMDUwNyIsImEiOiJja3ViY25oY2wwcDlmMm5tbzllMGkwNWI4In0.8gwFWP3KrrHWwfIRbRDWWw');

const styles = StyleSheet.create({
  map: {
    flex: 1,
    zIndex: 1,
  },
});

interface MapComponentsProps {
  initializeCoords: number[];
  heading: number;
  zoomLevel: number;
  onUpdate?: (location: MapboxGL.Location) => void;
  onRegionDidChange?: (
    feature: GeoJSON.Feature<GeoJSON.Point, RegionPayload>,
  ) => void;
  onPressMarker: (event: OnPressEvent) => void;
  onPressMap: () => void;
  facilities: IFacility[];
}

const MapComponents: React.FC<MapComponentsProps> = ({
  initializeCoords,
  heading,
  onUpdate,
  onRegionDidChange,
  onPressMarker,
  onPressMap,
  facilities,
}) => {
  return (
    <>
      <MapboxGL.MapView
        style={styles.map}
        styleURL="mapbox://styles/hanseo0507/ckubdhvht8c2z19qjr8jxvbx6"
        zoomEnabled={true}
        logoEnabled={false}
        attributionEnabled={false}
        localizeLabels={true}
        onRegionIsChanging={onRegionDidChange}
        onPress={onPressMap}>
        <MapboxGL.Camera centerCoordinate={initializeCoords} zoomLevel={17} />
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
        <MapboxGL.ShapeSource
          id="test"
          shape={{
            type: 'FeatureCollection',
            features: facilities.map(v => ({
              type: 'Feature',
              geometry: {type: 'Point', coordinates: v.location.coordinates},
              id: v._id,
              properties: v,
            })),
          }}
          onPress={onPressMarker}>
          <MapboxGL.SymbolLayer
            id="pointCount"
            style={{
              iconImage: 'https://i.imgur.com/K5mevsr.png',
              iconSize: 0.04,
              iconRotate: heading,
              iconRotationAlignment: 'map',
              iconAllowOverlap: true,
            }}>
            <LocationMarker />
          </MapboxGL.SymbolLayer>
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
    </>
  );
};

export default MapComponents;
