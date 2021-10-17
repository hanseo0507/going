/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Text from '../components/Text';
import {TEXT_CAPTION, UI_LINE, UI_WHITE} from '../utils/color';
import styled from 'styled-components/native';

interface IProps {
  count: number;
}

const Header = styled.TouchableOpacity`
  margin-left: ${wp('4%')};
  width: 100%;
`;

const ViewContainer = styled.View`
  align-items: flex-start;
  background-color: ${UI_WHITE};
  top: ${hp('-13%')};
  flex: 1;
`;

const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleText = styled(Text)`
  margin-right: ${wp('1%')};
  font-size: ${wp('5%')};
`;

const CountWrapper = styled.View`
  width: ${wp('5%')};
  height: ${hp('2.5%')};
  background-color: ${UI_LINE};
  border-radius: 300;
  align-items: center;
  justify-content: center;
`;

const CountText = styled(Text)`
  position: absolute;
  font-size: ${wp('4%')};
`;

const Caption = styled(Text)`
  font-size: ${wp('3.5%')};
  top: ${hp('-2.5%')};
  margin-top: ${hp('0.2%')};
  color: ${TEXT_CAPTION};
`;
const FacilityComponents: React.FC<IProps> = ({count}) => {
  const navigation: any = useNavigation();

  return (
    <ViewContainer style={styles.elevation}>
      <Header
        onPress={() => {
          navigation.navigate('Activation', {active: Boolean(count)});
        }}>
        <HeaderWrapper>
          <TitleText>시설</TitleText>
          <CountWrapper>
            <CountText>{count}</CountText>
          </CountWrapper>
        </HeaderWrapper>
        <Caption weight={400}>활성화된 시설</Caption>
      </Header>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  elevation: {
    elevation: 25,
    borderRadius: 15,
    shadowColor: '#B8B8B8',
  },
});
export default FacilityComponents;
