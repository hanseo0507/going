/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextProps, TouchableOpacity, ViewProps} from 'react-native';
import Text from './Text';
import {UI_WHITE} from '../utils/color';

interface IProps extends ViewProps {
  label: string;
  onPress: () => void;
  text: TextProps & {weight: number};
  width?: string | number;
  color?: string;
  textColor?: string;
}

const Button: React.FC<IProps> = props => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {width: props.width, backgroundColor: props.color || '#323232'},
        props.style,
      ]}
      {...props}>
      <Text
        style={[styles.label, {color: props.textColor || UI_WHITE}]}
        {...props.text}>
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
    fontSize: 15,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default Button;
