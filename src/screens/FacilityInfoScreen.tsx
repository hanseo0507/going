import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions} from 'react-native';
import styled from 'styled-components/native';

import BottomFacilityInfo from '../components/BottomFacilityInfo';
import {IFacility} from '../types/facility';

const ScreenContainer = styled.View`
  position: absolute;
  bottom: 0;
  z-index: 3;
  flex-direction: column;
`;

export interface FacilityInfoScreenProps {
  facility: IFacility | null;
  oldFacility: IFacility | null;
}

const FacilityInfoScreen: React.FC<FacilityInfoScreenProps> = ({
  facility,
  oldFacility,
}) => {
  const infoYValue = useRef<Animated.Value>(
    new Animated.Value(Dimensions.get('window').height),
  ).current;
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const animateStart = (open: boolean) => {
      Animated.timing(infoYValue, {
        toValue: open ? 0 : Dimensions.get('window').height,
        duration: 300,
        useNativeDriver: true,
      }).start();
      open ? setHide(false) : setTimeout(() => setHide(true), 300);
    };

    animateStart(Boolean(facility));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facility]);

  return (
    <ScreenContainer>
      <Animated.View
        style={{
          transform: [{translateY: infoYValue}],
        }}>
        {!hide && (facility || oldFacility) && (
          <BottomFacilityInfo
            title={
              facility ? facility.name : oldFacility ? oldFacility.name : ''
            }
            type={'전동휠체어 충전소'}
            location={
              facility
                ? facility.adressDoro || facility.adressJibun
                : oldFacility
                ? oldFacility.adressDoro || oldFacility.adressJibun
                : ''
            }
            description={
              facility
                ? facility.description
                : oldFacility
                ? oldFacility.description
                : ''
            }
          />
        )}
      </Animated.View>
    </ScreenContainer>
  );
};

export default FacilityInfoScreen;
