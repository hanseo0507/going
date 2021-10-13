import React from 'react';
import styled from 'styled-components/native';

export interface LocationMarkerProps {
  fill?: string;
  border?: string;
}

const Marker = styled.View<LocationMarkerProps>`
  height: 20;
  width: 20;
  background-color: ${props => props.fill || '#434BFF'};
  border-color: ${props => props.border || '#D4DDFF'};
  border-width: 3;
  border-radius: 50;
`;

const LocationMarker: React.FC<LocationMarkerProps> = ({...props}) => {
  return <Marker {...props} />;
};

export default LocationMarker;
