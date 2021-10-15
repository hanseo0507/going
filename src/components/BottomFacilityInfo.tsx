import React from 'react';
import {View, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from './Button';
import Text from './Text';
import MarkerBlue from '../assets/Marker_Blue.svg';
import {TEXT_CAPTION, TEXT_DEFAULT} from '../utils/color';

const SyltedView = styled.View`
  width: ${wp('100%')};
  z-index: 3;
  padding: 25px;
  padding-bottom: 15px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background-color: white;
`;

const NameWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: ${hp('-3%')};
`;

const TitleWrapper = styled.View`
  margin-bottom: ${hp('4%')};
`;

const HeaderWrapper = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const TitleText = styled(Text)`
  font-size: 20;
`;

const FacilityTypeText = styled(Text)`
  font-size: 12;
  color: ${TEXT_CAPTION};
  margin-left: ${wp('1.5%')};
  margin-bottom: ${hp('1.2%')};
`;

const LocationText = styled(Text)`
  font-size: 14;
  color: ${TEXT_DEFAULT};
`;

const DescriptionText = styled(Text)`
  font-size: 14;
  color: ${TEXT_DEFAULT};
  margin-top: ${hp('-5%')};
  margin-bottom: ${hp('2.5%')};
  letter-spacing: -0.3;
`;

export interface BottomFacilityInfoProps extends ViewProps {
  title: string;
  type: string;
  location: string;
  description?: string;
}

const BottomFacilityInfo: React.FC<BottomFacilityInfoProps> = ({
  title,
  type,
  location,
  description,
  ...props
}) => {
  return (
    <SyltedView {...props}>
      <View>
        <HeaderWrapper>
          <TitleWrapper>
            <NameWrapper>
              <TitleText weight={700}>{title}</TitleText>
              <FacilityTypeText weight={400}>{type}</FacilityTypeText>
            </NameWrapper>
            <LocationText weight={400}>{location}</LocationText>
          </TitleWrapper>
          <View>
            <MarkerBlue width={wp('11%')} height={hp('11%')} />
          </View>
        </HeaderWrapper>
        {description && (
          <DescriptionText weight={400}>{description}</DescriptionText>
        )}
      </View>
      <Button label="길찾기" onPress={() => {}} text={{weight: 700}} />
    </SyltedView>
  );
};

export default BottomFacilityInfo;
