import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, View} from 'react-native';
import styled from 'styled-components/native';

import BottomFacilityInfo from '../components/BottomFacilityInfo';
import {IFacility} from '../types/facility';

import IconButton from '../components/IconButton';
import GPSRedSVG from '../assets/GPS_Red.svg';
import GPSBlackSVG from '../assets/GPS_Black.svg';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LineLayerComponents from '../components/LineLayer';

const ScreenContainer = styled.View`
  position: absolute;
  bottom: 0;
  z-index: 3;
  flex-direction: column;

  justify-content: flex-start;
`;

export interface FacilityInfoScreenProps {
  facility: IFacility | null;
  oldFacility: IFacility | null;

  onPressFindRoad: () => void;
  onTouchEnd: (event: any) => void;
  followUserLocation: boolean;
}

const FacilityInfoScreen: React.FC<FacilityInfoScreenProps> = ({
  facility,
  oldFacility,
  onTouchEnd,
  onPressFindRoad,
  followUserLocation,
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
      <View
        style={{
          width: wp('100%'),
          paddingHorizontal: wp('5%'),
          paddingBottom:
            !hide && (facility || oldFacility) ? hp('2.5%') : hp('8%'),
          flexDirection: 'row-reverse',
        }}>
        <IconButton type="image" onTouchEnd={onTouchEnd}>
          {followUserLocation ? <GPSRedSVG /> : <GPSBlackSVG />}
        </IconButton>
      </View>

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
            onPress={onPressFindRoad}
          />
        )}
      </Animated.View>
    </ScreenContainer>
  );
};

export default FacilityInfoScreen;
