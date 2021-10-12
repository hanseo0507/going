/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UI_LINE, UI_WHITE} from '../utils/color';

interface IProps {
  sheetRef: any; // 타입 재설정 필요
}

const FooterButton: React.FC<IProps> = ({sheetRef}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.Footer}
      onPress={() => sheetRef.current.snapTo(0)}>
      <View style={styles.FooterLine} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Footer: {
    position: 'absolute',
    zIndex: 2,
    top: hp('99.5%'),
    width: '100%',
    height: hp('10%'),
    borderRadius: 50, // 들어가는데 하단 백그라운드가 흰색이라 몰랐던거 ㄹㅈㄷ
    backgroundColor: UI_WHITE,
    alignItems: 'center',
  },

  FooterLine: {
    width: wp('8%'),
    height: hp('0.2%'),
    marginTop: hp('1%'),
    backgroundColor: UI_LINE,
    borderRadius: 50,
  },
});

export default FooterButton;
