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
import Button from '../components/Button';

const ScreenContainer = styled.View<{showInfo: boolean}>`
  position: absolute;
  bottom: 0;
  z-index: ${props => (props.showInfo ? 4 : 3)};
  flex-direction: column;

  justify-content: flex-start;
`;

export interface FacilityInfoScreenProps {
  facility: IFacility | null;
  oldFacility: IFacility | null;

  onPressFindRoad: () => void;
  onTouchEnd: (event: any) => void;
  followUserLocation: boolean;

  isFinding: boolean;
  onPressCancleFindDirection: () => void;
}

const FacilityInfoScreen: React.FC<FacilityInfoScreenProps> = ({
  facility,
  oldFacility,
  onTouchEnd,
  onPressFindRoad,
  onPressCancleFindDirection,
  followUserLocation,
  isFinding,
}) => {
  const infoYValue = useRef<Animated.Value>(
    new Animated.Value(Dimensions.get('window').height),
  ).current;
  const [hide, setHide] = useState(false);

  const animateStart = (open: boolean) => {
    Animated.timing(infoYValue, {
      toValue: open ? 0 : Dimensions.get('window').height,
      duration: 300,
      useNativeDriver: true,
    }).start();
    open ? setHide(false) : setTimeout(() => setHide(true), 300);
  };

  useEffect(() => {
    animateStart(Boolean(facility));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facility]);

  useEffect(() => {
    animateStart(!isFinding);
  }, [isFinding]);

  return (
    <ScreenContainer showInfo={!hide && (facility || oldFacility)}>
      <View
        style={{
          width: wp('100%'),
          flexDirection: 'column-reverse',
          alignItems: 'flex-end',
          padding: wp('5%'),
          paddingBottom:
            !hide && (facility || oldFacility) ? hp('2.5%') : hp('8%'),
        }}>
        {isFinding && (
          <Button
            label="길찾기 취소"
            onPress={onPressCancleFindDirection}
            text={{weight: 700}}
            width={wp('90%')}
          />
        )}

        <IconButton
          type="image"
          onTouchEnd={onTouchEnd}
          style={{marginBottom: isFinding ? hp('1.5%') : 0}}>
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
