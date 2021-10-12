/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TEXT_DEFAULT, TEXT_DISABLE, TEXT_TITLE} from '../utils/color';
import {UI_WHITE} from '../utils/color';

const SearchButton: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.searchBar}
          onPress={() => {
            navigation.navigate('Activation');
          }}>
          <Text style={styles.Caption}>장소 검색하기...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    top: 60,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  textInput: {
    width: '90%',
  },
  searchBar: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 25,
    color: TEXT_DEFAULT,
    textDecorationLine: 'none',
  },
  Caption: {
    padding: 15,
  },
});
export default SearchButton;
