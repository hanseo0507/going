/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {UI_WHITE} from '../../utils/color';
import MapScreen from '../Map/MapScreen';
import BottomSheet from 'reanimated-bottom-sheet';
import FooterButton from '../../components/Footer';

interface IProps {}

const HomeScreen: React.FC<IProps> = () => {
  const sheetRef: any = React.useRef<HTMLDivElement>(null); // 타입 재설정 필요
  const renderContent = () => (
    <View style={styles.bottomSheet}>
      <View style={styles.greetLayer}>
        <Text style={styles.greet}>안녕하세요 사용자님 ✋</Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <MapScreen />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[490, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
      <FooterButton sheetRef={sheetRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_WHITE,
  },
  bottomSheet: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    padding: 16,
    height: 490,
  },
  greetLayer: {
    alignItems: 'flex-start',
    flex: 1,
  },
  greet: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 20,
    marginLeft: 10,
  },
});

export default HomeScreen;
