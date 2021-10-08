/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

interface IProps extends TextInputProps {}

const Input: React.FC<IProps> = ({...props}) => {
  return <TextInput style={[styles.container]} {...props}></TextInput>;
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 10,
    position: 'relative',
  },
});
export default Input;
