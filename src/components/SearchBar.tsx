/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableHighlight,
  View,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {TEXT_CAPTION, TEXT_DEFAULT, TEXT_DISABLE} from '../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

interface IProps extends TextInputProps {}

const SearchBar: React.FC<IProps> = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <TouchableHighlight
          style={styles.icon}
          underlayColor={'#C4C4C4'}
          onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            width={wp('8%')}
            height={hp('8%')}
            fill={TEXT_CAPTION}
          />
        </TouchableHighlight>
        <TextInput
          placeholder="장소 검색하기..."
          placeholderTextColor={TEXT_DISABLE}
          style={styles.searchBar}
        />
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
  icon: {
    marginTop: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('8%'),
    height: hp('4%'),
    borderRadius: 30,
  },
});
export default SearchBar;
