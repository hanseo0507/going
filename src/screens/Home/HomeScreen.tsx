/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import SearchBar from '../../components/SearchBar';
import {UI_WHITE} from '../../utils/color/UiColor';

interface IProps {
  navigation: any;
}

const HomeScreen: React.FC<IProps> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Go to map" onPress={() => navigation.navigate('Map')} />
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
