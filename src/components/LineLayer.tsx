/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import axios from 'axios';

interface LineLayerComponentProps {
  // onUpdate?: (location: MapboxGL.Location) => void;
  centerCoordinate: number[];
}

const LineLayerComponents: React.FC<LineLayerComponentProps> =
  centerCoordinate => {
    // function direction() {
    //   axios(
    //     `https://api.mapbox.com/directions/v5/mapbox/walking/${},${location.latitude};${lastDes.longitude},${lastDes.latitude}?geometries=geojson&access_token=${mapboxKey}`,
    //   );
    // }
    const listStreet = [
      [124, 38],
      [132, 33],
    ];
    // useEffect(() => {
    //   console.log(initializeCoords);
    // });
    return (
      <MapboxGL.ShapeSource
        id="routeSource"
        shape={{
          type: 'Feature',
          properties: {
            icon: 'exampleIcon',
          },
          geometry: {
            type: 'LineString',
            coordinates: listStreet,
          },
        }}>
        <MapboxGL.LineLayer
          id={'LineLayer'}
          style={{lineColor: '#FC3E3E', lineWidth: 1}}
        />
      </MapboxGL.ShapeSource>
    );
  };

export default LineLayerComponents;
