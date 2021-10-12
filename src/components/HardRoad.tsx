/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Switch} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  TEXT_CAPTION,
  TEXT_DEFAULT,
  TEXT_DISABLE,
  UI_LINE,
  UI_WHITE,
} from '../utils/color';

interface IProps {}

const HardRoadComponents: React.FC<IProps> = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState<boolean>(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={[styles.HardRoadContainer, styles.elevation]}>
      <View style={styles.TextLayer}>
        <Text style={styles.HardRoadTitle}>가기힘든 길</Text>
        <Text style={styles.HardRoadCaption}>가기힘든 길을 표시하실래요 ?</Text>
        <Text>{isSwitchOn ? 'Switch is ON' : 'Switch is OFF'}</Text>
        <Switch
          style={styles.switch}
          trackColor={{false: TEXT_DISABLE, true: TEXT_DEFAULT}}
          thumbColor="white"
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HardRoadContainer: {
    top: hp('-6%'),
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: UI_WHITE,
  },
  elevation: {
    elevation: 25,
    shadowColor: '#D4D4D4',
    borderRadius: 15,
  },
  TextLayer: {margin: wp('5%')},
  HardRoadTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
  },
  HardRoadCaption: {
    fontSize: wp('3.5%'),
    marginTop: hp('0.2%'),
    color: TEXT_CAPTION,
  },
  switch: {
    flex: 1,
  },
});
export default HardRoadComponents;
