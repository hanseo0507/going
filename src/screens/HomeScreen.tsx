/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BottomSheet from 'reanimated-bottom-sheet';
import Text from '../components/Text';

import {UI_WHITE} from '../utils/color';
import FooterButton from '../components/Footer';
import FacilityComponents from '../components/Facility';
import MapScreen from './MapScreen';

interface IProps {}

const HomeScreen: React.FC<IProps> = () => {
  const sheetRef: any = React.useRef<HTMLDivElement>(null); // 타입 재설정 필요

  const BottomSheetContent = (): React.ReactNode => {
    return (
      <View style={styles.bottomSheet}>
        <View style={styles.greetLayer}>
          <Text style={styles.greet} weight={700}>
            안녕하세요 사용자님 ✋
          </Text>
        </View>
        <FacilityComponents />

        <View style={styles.greetLayer}>
          <Text>ddsadasd</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapScreen />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[hp('85%'), 300, 0]}
        borderRadius={10}
        renderContent={BottomSheetContent}
      />
      <FooterButton sheetRef={sheetRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_WHITE,
    justifyContent: 'space-between',
  },
  bottomSheet: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    padding: 30,
    height: hp('82%'),
  },
  greetLayer: {
    alignItems: 'flex-start',
    flex: 1,
  },
  greet: {
    fontSize: wp('6%'),
    fontWeight: '900',
    marginTop: 20,
  },
});

export default HomeScreen;
