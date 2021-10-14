/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextProps, TouchableOpacity} from 'react-native';
import Text from './Text';
import {UI_WHITE} from '../utils/color';

interface IProps {
  label: string;
  onPress: () => void;
  text: TextProps & {weight: number};
}

const Button: React.FC<IProps> = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
      <Text style={styles.label} {...props.text}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 12,
    backgroundColor: '#323232',
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
    fontSize: 15,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default Button;
