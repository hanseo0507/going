/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Text from './Text';
import {TEXT_DISABLE, UI_CONTAINER, UI_WHITE} from '../utils/color';
import styled from 'styled-components/native';

interface IProps {}

const SyltedView = styled.View`
  top: ${hp('-6%')};
  height: ${hp('26.8%')};
  margin-left: ${wp('2%')};
  background-color: ${UI_CONTAINER};
  border-radius: 15;
  flex: 1;
`;
const ViewWrapper = styled.View`
  margin-left: ${wp('4%')};
  margin-right: ${wp('4%')};
`;

const TitleText = styled(Text)`
  padding-top: ${hp('1.3%')};
  font-size: ${wp('5%')};
  color: ${TEXT_DISABLE};
`;
const ServicePreparationComponents: React.FC<IProps> = () => {
  return (
    <SyltedView>
      <ViewWrapper>
        <TitleText weight={600}>서비스 준비중</TitleText>
      </ViewWrapper>
    </SyltedView>
  );
};

export default ServicePreparationComponents;
