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
      style={styles.footer}
      onPress={() => sheetRef.current.snapTo(0)}>
      <View style={styles.line} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    zIndex: 2,
    top: hp('96.5%'),
    width: '100%',
    height: hp('10%'),
    borderRadius: 50,
    backgroundColor: UI_WHITE,
    alignItems: 'center',
  },
  line: {
    width: wp('8%'),
    height: hp('0.2%'),
    marginTop: hp('1%'),
    backgroundColor: UI_LINE,
    borderRadius: 50,
  },
});

export default FooterButton;
