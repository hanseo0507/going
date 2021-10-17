import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {TEXT_DEFAULT, UI_DEFAULT} from '../utils/color';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    top: 35,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },

  wrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3.5%'),

    borderRadius: wp('7%'),
    height: hp('5%'),
  },

  text: {
    marginLeft: wp('1%'),
    fontSize: 14,
  },
});

export interface TimerProps {
  startAt: Date;
}

const Timer: React.FC<TimerProps> = ({startAt}) => {
  const [time, setTime] = useState<string>('00:00');
  const formatZero = (int: number) => (int > 9 ? int.toString() : `0${int}`);

  const getLeftTime = (target: Date | string, current: Date | string) => {
    const targetDay = new Date(target);
    const currentDay = new Date(current);

    let diff = targetDay.getTime() - currentDay.getTime();
    const diffDays = Math.floor(
      (targetDay.getTime() - currentDay.getTime()) / (1000 * 60 * 60 * 24),
    );
    diff -= diffDays * (1000 * 60 * 60 * 24);
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    diff -= diffHours * (1000 * 60 * 60);
    const diffMin = Math.floor(diff / (1000 * 60));
    diff -= diffMin * (1000 * 60);
    const diffSec = Math.floor(diff / 1000);

    const fillZero = (int: number) =>
      int > 9 ? int.toString() : '0' + int.toString();

    return `${fillZero(diffMin + diffHours * 60)}:${fillZero(diffSec)}`;
  };

  useEffect(() => {
    console.log(startAt);
    const interval = setInterval(() => {
      const now = new Date();
      console.log(startAt, now);
      /*const hours = startAt ? now.getHours() - startAt.getHours() : 0;
      const minutes = startAt
        ? now.getMinutes() * 60 - startAt.getMinutes() * 60
        : 0;
      const seconds = startAt ? now.getSeconds() - startAt.getSeconds() : 0;*/

      const left = now.getTime() - startAt.getTime();
      const hours = (left / 60) * 60;

      setTime(`${getLeftTime(now, startAt)}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Icon
          name="clock-outline"
          width={wp('6%')}
          height={hp('6%')}
          fill={TEXT_DEFAULT}
        />
        <Text weight={700} style={styles.text}>
          {time}
        </Text>
      </View>
    </View>
  );
};

export default Timer;
