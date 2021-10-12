/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Text from './Text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TEXT_TITLE} from '../utils/color';
import {UI_WHITE} from '../utils/color';

interface IProps {
  label: string;
  onPress: () => void;
}

const Button: React.FC<IProps> = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('85%'),
    height: hp('5%'),
    borderRadius: 8,
    backgroundColor: TEXT_TITLE,
    shadowColor: UI_WHITE,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  label: {
    color: UI_WHITE,
  },
});

export default Button;
