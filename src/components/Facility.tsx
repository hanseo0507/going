/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TEXT_CAPTION, UI_LINE, UI_WHITE} from '../utils/color';

interface IProps {}

const FacilityComponents: React.FC<IProps> = () => {
  const navigation: any = useNavigation();
  return (
    <View style={[styles.facilityContainer, styles.elevation]}>
      <TouchableOpacity
        style={styles.facilityHeader}
        onPress={() => {
          navigation.navigate('Activation');
        }}>
        <View style={styles.facility}>
          <Text style={styles.facilityTitle}>시설</Text>
          <View style={styles.CountContainer}>
            <Text style={styles.CountText}>0</Text>
          </View>
        </View>
        <Text style={styles.facilityCaption}>활성화된 시설</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  facilityContainer: {
    top: hp('-13%'),
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: UI_WHITE,
  },
  facilityHeader: {
    marginLeft: wp('5%'),
    width: '100%',
  },
  facility: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  facilityTitle: {
    marginRight: wp('1%'),
    fontSize: wp('5%'),
    fontWeight: '600',
  },
  facilityCaption: {
    fontSize: wp('3.5%'),
    marginTop: hp('0.2%'),
    color: TEXT_CAPTION,
  },
  CountContainer: {
    width: wp('4%'),
    height: hp('2.5%'),
    backgroundColor: UI_LINE,
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CountText: {
    fontSize: wp('4%'),
  },
  elevation: {
    elevation: 25,
    shadowColor: '#D4D4D4',
    borderRadius: 15,
  },
});
export default FacilityComponents;
