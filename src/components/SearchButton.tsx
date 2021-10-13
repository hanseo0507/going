/* eslint-disable prettier/prettier */

import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-eva-icons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TEXT_CAPTION, TEXT_DEFAULT} from '../utils/color';

const SearchButton: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.searchBar}
          onPress={() => {
            navigation.navigate('LocationSearch');
          }}>
          <Icon
            name="search-outline"
            width={wp('4.4%')}
            height={hp('4.4%')}
            fill={TEXT_CAPTION}
          />
          <Text style={styles.caption}>장소 검색하기...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    top: 35,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  textInput: {
    width: '90%',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',

    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 20,
    paddingTop: 3,
    paddingBottom: 3,
    color: TEXT_DEFAULT,
    textDecorationLine: 'none',
  },
  caption: {
    padding: 10,
    fontSize: 14,
    color: TEXT_CAPTION,
  },
});
export default SearchButton;
