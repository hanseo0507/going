/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {TEXT_TITLE} from '../utils/color/TextColor';

interface IProps {}

const Button: React.FC<IProps> = () => {
  return (
    <TouchableOpacity style={[styles.container]}>
      <Text>안녕하세요</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: TEXT_TITLE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  label: {},
});

export default Button;
