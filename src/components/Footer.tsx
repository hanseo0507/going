/* eslint-disable prettier/prettier */
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UI_LINE, UI_WHITE} from '../utils/color';
import styled from 'styled-components/native';

interface IProps {
  sheetRef: any; // 타입 재설정 필요
}

const StyledFooter = styled.TouchableOpacity`
  position: absolute;
  z-index: 2;
  width: 100%;
  bottom: ${hp('-3%')};
  height: ${hp('6%')};
  border-radius: 20px;
  background-color: ${UI_WHITE};
  align-items: center;
`;

const Line = styled.View`
  width: ${wp('8%')};
  height: ${hp('0.2%')};
  margin-top: ${hp('1%')};
  background-color: ${UI_LINE};
  border-radius: 50px;
`;

const FooterButton: React.FC<IProps> = ({sheetRef}) => {
  return (
    <StyledFooter
      activeOpacity={0.8}
      onPress={() => sheetRef.current.snapTo(0)}>
      <Line />
    </StyledFooter>
  );
};

export default FooterButton;
