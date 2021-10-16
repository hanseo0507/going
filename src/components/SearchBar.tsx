/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {TEXT_CAPTION, TEXT_DEFAULT, TEXT_DISABLE} from '../utils/color';

const SearchBar: React.FC<TextInputProps> = props => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const navigation: any = useNavigation();

  const onFocus = () => setIsFocus(true);
  const onBlur = () => setIsFocus(false);

  const onPress = (goBack?: boolean) => {
    goBack && navigation.goBack();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.textInput}>
      <Icon
        name="arrow-ios-back-outline"
        width={wp('6%')}
        height={hp('6%')}
        fill={TEXT_CAPTION}
        style={styles.icon}
        onPress={() => onPress(true)}
      />
      <TextInput
        placeholder="장소 검색하기..."
        placeholderTextColor={TEXT_DISABLE}
        style={styles.searchBar}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
      {isFocus && (
        <Icon
          name="close-outline"
          width={wp('6%')}
          height={hp('6%')}
          fill={TEXT_CAPTION}
          style={styles.icon}
          onPress={() => onPress(false)}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    width: '90%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingLeft: 18,
    paddingRight: 20,
    elevation: 12,
    shadowColor: '#DDDDDD',
  },

  searchBar: {
    flex: 1,
    color: TEXT_DEFAULT,
    textDecorationLine: 'none',
  },
  icon: {
    marginRight: wp('0.4%'),
  },
});
export default SearchBar;
