/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Text from './Text';
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
    width: 320,
    height: 40,
    backgroundColor: TEXT_TITLE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
