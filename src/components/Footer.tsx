/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UI_WHITE} from '../utils/color';

interface IProps {
  sheetRef: any; // 타입 재설정 필요
}

const FooterButton: React.FC<IProps> = ({sheetRef}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.Footer}
      onPress={() => sheetRef.current.snapTo(0)}>
      <View />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Footer: {
    width: '100%',
    height: hp('6%'),
    borderRadius: 50, // 볼더가 안 들어감
    backgroundColor: 'white',
  },

  FooterLine: {
    width: wp('10%'),
    height: hp('10%'),
    backgroundColor: 'black',
  },
});

export default FooterButton;
