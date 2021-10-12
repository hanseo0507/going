/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {TEXT_DEFAULT, TEXT_DISABLE} from '../utils/color';

interface IProps extends TextInputProps {}

const SearchBar: React.FC<IProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <TextInput
          placeholder="장소 검색하기..."
          placeholderTextColor={TEXT_DISABLE}
          style={styles.searchBar}
        />

        {/* <MatGeocoder
          inputPlaceholder="Search Address"
          accessToken={
            'pk.eyJ1IjoiaGFuc2VvMDUwNyIsImEiOiJja3ViY25oY2wwcDlmMm5tbzllMGkwNWI4In0.8gwFWP3KrrHWwfIRbRDWWw'
          }
          onSelect={onSelectHandler}
          showLoader={true}
          {...geocoderApiOptions}
        /> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    top: 50,
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
});
export default SearchBar;
