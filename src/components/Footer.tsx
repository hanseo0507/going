/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {UI_WHITE} from '../utils/color';

interface IProps {
  sheetRef: any; // 타입 재설정 필요
}

const FooterButton: React.FC<IProps> = ({sheetRef}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.Foouter}
      onPress={() => sheetRef.current.snapTo(0)}
    />
  );
};

const styles = StyleSheet.create({
  Foouter: {
    height: 30,
    borderRadius: 50, // 볼더가 안 들어감
    backgroundColor: UI_WHITE,
  },
});

export default FooterButton;
