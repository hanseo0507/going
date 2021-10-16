/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import axios from 'axios';

interface LineLayerComponentProps {
  // onUpdate?: (location: MapboxGL.Location) => void;
  userLocation: number[];
  targetLocation: number[];
}

const LineLayerComponents: React.FC<LineLayerComponentProps> = ({
  userLocation,
  targetLocation,
}) => {
  const [coords, setCoords] = useState<number[][]>([]);

  useEffect(() => {
    const getDirection = async () => {
      const {data}: any = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${userLocation[0]},${userLocation[1]};${targetLocation[0]},${targetLocation[1]}`,
        {
          params: {
            geometries: 'geojson',
            access_token:
              'pk.eyJ1IjoiaGFuc2VvMDUwNyIsImEiOiJja3ViY25oY2wwcDlmMm5tbzllMGkwNWI4In0.8gwFWP3KrrHWwfIRbRDWWw',
          },
        },
      );

      setCoords(data.routes[0].geometry.coordinates);
    };

    getDirection();
  }, [targetLocation, userLocation]);

  return coords.length > 0 ? (
    <MapboxGL.ShapeSource
      id="routeSource"
      shape={{
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      }}>
      <MapboxGL.LineLayer
        id={'LineLayer'}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          lineColor: '#FC3E3E',
          lineWidth: 3,
          lineCap: 'round',
        }}
      />
    </MapboxGL.ShapeSource>
  ) : (
    <></>
  );
};

export default LineLayerComponents;
