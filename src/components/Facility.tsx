/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Text from '../components/Text';
import {TEXT_CAPTION, UI_LINE, UI_WHITE} from '../utils/color';

interface IProps {}

const FacilityComponents: React.FC<IProps> = () => {
  const navigation: any = useNavigation();

  return (
    <View style={[styles.container, styles.elevation]}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => {
          navigation.navigate('Activation');
        }}>
        <View style={styles.facility}>
          <Text style={styles.title} weight={500}>
            시설
          </Text>
          <View style={styles.countContainer}>
            <Text style={styles.countText}>0</Text>
          </View>
        </View>
        <Text style={styles.caption} weight={400}>
          활성화된 시설
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: UI_WHITE,
    top: hp('-13%'),
    flex: 1,
  },
  elevation: {
    elevation: 25,
    borderRadius: 15,
    shadowColor: '#B8B8B8',
  },
  header: {
    marginLeft: wp('4%'),
    width: '100%',
  },
  facility: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginRight: wp('1%'),
    fontSize: wp('5%'),
  },
  caption: {
    fontSize: wp('3.5%'),
    top: hp('-2.5%'),
    marginTop: hp('0.2%'),
    color: TEXT_CAPTION,
  },
  countContainer: {
    width: wp('5%'),
    height: hp('2.5%'),
    backgroundColor: UI_LINE,
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    position: 'absolute',
    fontSize: wp('4%'),
  },
});
export default FacilityComponents;
