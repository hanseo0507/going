/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-eva-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TEXT_CAPTION, TEXT_TITLE} from '../utils/color';
import Text from '../components/Text';

interface IProps {}

const FacilityActivationScreen: React.FC<IProps> = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.contaner}>
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
      <Text style={styles.title}>
        지도에 활성화할{'\n'}시설을 선택해주세요.
      </Text>
      <Text weight={400} style={styles.caption}>
        현재 도움이될만한 다양한 시설들을 추가중이에요 !
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginTop: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('8%'),
    height: hp('4%'),
    borderRadius: 30,
  },
  contaner: {
    marginLeft: wp('5%'),
  },
  title: {
    color: TEXT_TITLE,
    fontSize: 30,
  },
  caption: {
    top: hp('-2%'),
    color: TEXT_CAPTION,
  },
});
export default FacilityActivationScreen;
