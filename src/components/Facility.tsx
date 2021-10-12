/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TEXT_CAPTION, UI_LINE, UI_WHITE} from '../utils/color';
import Text from '../components/Text';

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
          <Text style={styles.facilityTitle} weight={500}>
            시설
          </Text>
          <View style={styles.CountContainer}>
            <Text style={styles.CountText}>0</Text>
          </View>
        </View>
        <Text style={styles.facilityCaption} weight={400}>
          활성화된 시설
        </Text>
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
  elevation: {
    elevation: 25,
    shadowColor: '#B8B8B8',
    borderRadius: 15,
  },
  facilityHeader: {
    marginLeft: wp('4%'),
    width: '100%',
  },
  facility: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  facilityTitle: {
    marginRight: wp('1%'),
    fontSize: wp('5%'),
  },
  facilityCaption: {
    top: hp('-3%'),
    fontSize: wp('3.5%'),
    marginTop: hp('0.2%'),
    color: TEXT_CAPTION,
  },
  CountContainer: {
    width: wp('5%'),
    height: hp('3%'),
    backgroundColor: UI_LINE,
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CountText: {
    position: 'absolute',
    top: hp('-1.5%'),
    fontSize: wp('4%'),
  },
});
export default FacilityComponents;
