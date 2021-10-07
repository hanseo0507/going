/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextInputProps, View} from 'react-native';
import {TEXT_TITLE} from '../utils/color/TextColor';
import {UI_WHITE} from '../utils/color/UiColor';
import Input from './Input';

interface IProps extends TextInputProps {}

const SearchBar: React.FC<IProps> = ({...props}) => {
  return (
    <View style={[styles.container]}>
      <Input style={styles.input} {...props} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 1000,
    height: 100,
    position: 'relative',
  },
  input: {
    width: 650,
    height: 40,
    borderRadius: 8,
    paddingLeft: 100,
    fontFamily: TEXT_TITLE,
    fontSize: 18,
    color: UI_WHITE,
    backgroundColor: UI_WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
export default SearchBar;
