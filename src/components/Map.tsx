/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet} from 'react-native';
import MapboxGL, {
  OnPressEvent,
  RegionPayload,
  Logger,
} from '@react-native-mapbox-gl/maps';
import {IFacility} from '../types/facility';
import LineLayerComponents from './LineLayer';

// prettier-ignore
MapboxGL.setAccessToken('pk.eyJ1IjoiaGFuc2VvMDUwNyIsImEiOiJja3ViY25oY2wwcDlmMm5tbzllMGkwNWI4In0.8gwFWP3KrrHWwfIRbRDWWw');

// edit logging messages
Logger.setLogCallback(log => {
  const {message} = log;

  // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

const styles = StyleSheet.create({
  map: {
    flex: 1,
    zIndex: 1,
  },
});

interface MapComponentsProps {
  centerCoordinate: number[];
  heading: number;
  zoomLevel: number;
  onUpdate?: (location: MapboxGL.Location) => void;
  onRegionDidChange?: (
    feature: GeoJSON.Feature<GeoJSON.Point, RegionPayload>,
  ) => void;
  onPressMarker: (event: OnPressEvent) => void;
  onPressMap: () => void;
  facilities: IFacility[];
  selectedFacility: IFacility | null;

  cameraRef: React.LegacyRef<MapboxGL.Camera>;

  followUserMode: MapboxGL.UserTrackingModes;
  followUserLocation: boolean;

  isFinding: boolean;
  userLocation: number[];
}

const MapComponents: React.FC<MapComponentsProps> = ({
  centerCoordinate,
  zoomLevel,
  heading,
  onUpdate,
  onRegionDidChange,
  onPressMarker,
  onPressMap,
  facilities,
  selectedFacility,
  cameraRef,

  isFinding,
  userLocation,
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
        <MapboxGL.Camera
          ref={cameraRef}
          centerCoordinate={centerCoordinate}
          zoomLevel={zoomLevel}
          maxBounds={{
            ne: [124, 38],
            sw: [132, 33],
          }}
        />
        <MapboxGL.UserLocation showsUserHeadingIndicator onUpdate={onUpdate}>
          <MapboxGL.SymbolLayer
            id="mapbox_user_position"
            //https://i.imgur.com/wJl0SzB.png
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
        {isFinding && selectedFacility && (
          <LineLayerComponents
            userLocation={userLocation}
            targetLocation={selectedFacility.location.coordinates}
          />
        )}
        <MapboxGL.ShapeSource
          id="test"
          shape={{
            type: 'FeatureCollection',
            features: facilities.map(v => ({
              type: 'Feature',
              geometry: {type: 'Point', coordinates: v.location.coordinates},
              id: v._id,
              properties: {...v, isSelected: v._id === selectedFacility?._id},
            })),
          }}
          onPress={onPressMarker}>
          <MapboxGL.SymbolLayer
            id="pointCount_Active"
            style={{
              iconImage: 'https://i.imgur.com/K5mevsr.png',
              iconSize: 0.055,
              iconRotationAlignment: 'map',
            }}
            filter={['==', 'isSelected', true]}
          />

          <MapboxGL.SymbolLayer
            id="pointCount"
            style={{
              iconImage: selectedFacility
                ? 'https://i.imgur.com/wJl0SzB.png'
                : 'https://i.imgur.com/K5mevsr.png',
              iconSize: 0.04,
              iconRotationAlignment: 'map',
              iconAllowOverlap: true,
            }}
            filter={['==', 'isSelected', false]}
          />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
    </>
  );
};

export default MapComponents;
