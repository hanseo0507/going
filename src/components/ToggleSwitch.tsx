/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export interface ToggleSwitchProps {}

const ToggleSwitchComponents: React.FC<ToggleSwitchProps> = () => {
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked(value => !value);

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={(styles.Toggle, styles.elevation)}
        disabled={checked}
        onPress={toggleChecked}
      />
      {/* <Switch
        style={styles.elevation}
        trackColor={{false: TEXT_DISABLE, true: TEXT_DEFAULT}}
        thumbColor={isActive === true ? TEXT_DISABLE : TEXT_DEFAULT}
        ios_backgroundColor={UI_LINE}
        onValueChange={toggleSwitch}
        value={isActive}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  Toggle: {
    flex: 1,
    height: hp('8%'),
    width: wp('15%'),
    backgroundColor: 'red',
    borderRadius: 50,
  },
  elevation: {
    elevation: 25,
    borderRadius: 15,
    shadowColor: '#AAAAAA',
  },
});
export default ToggleSwitchComponents;
