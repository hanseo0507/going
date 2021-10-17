/* eslint-disable prettier/prettier */
import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  GestureResponderEvent,
  Animated,
  Dimensions,
} from 'react-native';
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
import HardRoadComponents from '../components/HardRoad';
import SearchButton from '../components/SearchButton';
import ServicePreparationComponents from '../components/ServicePreparation';

import {useRoute} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {StackParamList} from '../utils/stackParmaList';
import {IFacility} from '../types/facility';
import {ScrollView} from 'react-native-gesture-handler';

interface IProps {
  navigation: StackNavigationProp<StackParamList, 'Home'>;
  route: RouteProp<StackParamList, 'Home'>;
}

const HomeScreen: React.FC<IProps> = ({route}) => {
  const sheetRef = useRef<BottomSheet | null>(null);
  const sheetContainerValue = useRef<Animated.Value>(
    new Animated.Value(0),
  ).current;

  // const {facility} = useRoute<RouteProp<StackParamList, 'Home'>>().params;

  useEffect(() => {
    console.log('wa', route.params);
  }, [route.params]);

  const bottomSheeetAnimatedStart = (open: boolean) => {
    Animated.timing(sheetContainerValue, {
      toValue: open ? 0 : Dimensions.get('window').height,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const onBottomSheetOpenStart = () => bottomSheeetAnimatedStart(true);
  const onBottomSheetClonseEnd = () => bottomSheeetAnimatedStart(false);
  const onClickBottomSheetContainer = (event: GestureResponderEvent) => {
    bottomSheeetAnimatedStart(false);
    sheetRef.current?.snapTo(2);
  };

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
          <HardRoadComponents />
          <ServicePreparationComponents />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapScreen facility={route.params ? route.params.facility : false} />

      <SearchButton />

      <Animated.View
        style={[
          styles.bottomSheetContainer,
          {transform: [{translateY: sheetContainerValue}]},
        ]}
        onTouchEnd={onClickBottomSheetContainer}
      />

      <BottomSheet
        ref={sheetRef}
        snapPoints={[hp('85%'), 300, 0]}
        borderRadius={10}
        onOpenStart={onBottomSheetOpenStart}
        renderContent={BottomSheetContent}
        onCloseEnd={onBottomSheetClonseEnd}
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
  bottomSheetContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    padding: hp('2.5%'),
    height: hp('85%'),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
  },
  greetLayer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  greet: {
    fontSize: wp('6%'),
    marginTop: hp('1%'),
  },
});

export default HomeScreen;
