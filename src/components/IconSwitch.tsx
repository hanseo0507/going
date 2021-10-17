import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import BatchChairActiveIcon from '../assets/BatchChairIcon_Active.svg';
import BatchChairNoneIcon from '../assets/BatchChairIcon_None.svg';
import {TEXT_DEFAULT, UI_CONTAINER} from '../utils/color';
import Text from './Text';

const styles = StyleSheet.create({
  contaienr: {
    borderRadius: wp('3%'),
    width: wp('28%'),
    height: hp('13%'),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UI_CONTAINER,
    shadowColor: '#B4B4B4',
  },
  text: {
    color: TEXT_DEFAULT,
    fontSize: 12,
  },
});

export interface IconSwitchProps extends ViewProps {
  isActivate: boolean;
  margin: boolean;

  text: string;
  activeComponent: React.ReactNode;
  noneComponent: React.ReactNode;
}

const IconSwitch: React.FC<IconSwitchProps> = ({
  isActivate,
  onTouchEnd,
  margin,
  activeComponent,
  noneComponent,
  text,
  ...props
}) => {
  return (
    <View
      style={[
        styles.contaienr,
        {elevation: isActivate ? 3 : 0, marginRight: margin ? wp('3%') : 0},
        props.style,
      ]}
      onTouchEnd={onTouchEnd}
      {...props}>
      {isActivate ? activeComponent : noneComponent}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default IconSwitch;
