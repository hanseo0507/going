/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, TouchableHighlight, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-eva-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TEXT_CAPTION, TEXT_TITLE, UI_LINE, UI_WHITE} from '../utils/color';
import Text from '../components/Text';
import ToggleSwitchComponents from '../components/ToggleSwitch';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconSwitch from '../components/IconSwitch';

interface IProps {}

const FacilityActivationScreen: React.FC<IProps> = () => {
  const navigation: any = useNavigation();
  const [active, setActive] = useState(false);

  return (
    <SafeAreaView style={styles.contaner}>
      <View style={styles.headerWrapper}>
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
          지도에 활성화할
          {'\n'}
          시설을 선택해주세요.
        </Text>
        <Text weight={400} style={styles.caption}>
          현재 도움이 될만한 다양한 시설들을 추가 중이에요!
        </Text>
      </View>
      <View style={styles.switchContainer}>
        <View style={styles.switchWrapper}>
          <IconSwitch
            isActivate={active}
            onTouchEnd={() => setActive(!active)}
            margin
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('8%'),
    height: hp('4%'),
    borderRadius: 30,
  },
  contaner: {
    width: wp('100%'),
    height: hp('100%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('5%'),
    backgroundColor: UI_WHITE,
  },
  headerWrapper: {
    borderBottomWidth: 2,
    borderColor: UI_LINE,
  },
  switchContainer: {
    flex: 1,
    marginTop: hp('3%'),
  },
  switchWrapper: {
    flexDirection: 'row',
  },

  title: {
    color: TEXT_TITLE,
    fontSize: 30,
    letterSpacing: wp('-0.5%'),
    paddingHorizontal: wp('1%'),
  },
  caption: {
    top: hp('-3%'),
    color: TEXT_CAPTION,
    letterSpacing: wp('-0.2%'),
    paddingHorizontal: wp('1%'),
  },
});
export default FacilityActivationScreen;
