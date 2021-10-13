import React from 'react';
import styled from 'styled-components/native';

export interface LocationMakerProps {
  fill?: string;
  border?: string;
}

const Maker = styled.View<LocationMakerProps>`
  height: 20;
  width: 20;
  background-color: ${props => props.fill || '#434BFF'};
  border-color: ${props => props.border || '#D4DDFF'};
  border-width: 3;
  border-radius: 50;
`;

const LocationMaker: React.FC<LocationMakerProps> = ({...props}) => {
  return <Maker {...props} />;
};

export default LocationMaker;
