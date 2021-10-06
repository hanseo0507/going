/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import {UI_WHITE} from '../../utils/color/UiColor';

interface IProps {}

const HomeScreen: React.FC<IProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>안녕하세요 사용자님 ✋</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: UI_WHITE,
  },
  scrollContainer: {
    width: '100%',
  },
});

export default HomeScreen;
