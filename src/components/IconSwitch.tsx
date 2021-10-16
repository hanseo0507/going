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
    height: hp('17%'),

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: UI_CONTAINER,
  },

  text: {
    color: TEXT_DEFAULT,
    fontSize: 12,
  },
});

export interface IconSwitchProps extends ViewProps {
  isActivate: boolean;
  margin: boolean;
}

const IconSwitch: React.FC<IconSwitchProps> = ({
  isActivate,
  onTouchEnd,
  margin,
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
      {isActivate ? (
        <BatchChairActiveIcon
          width="35%"
          height="35%"
          style={{marginTop: hp('2%')}}
        />
      ) : (
        <BatchChairNoneIcon
          width="35%"
          height="35%"
          style={{marginTop: hp('2%')}}
        />
      )}
      <Text style={styles.text}>휠체어</Text>
    </View>
  );
};

export default IconSwitch;
