/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, SafeAreaView, Text, View, Animated} from 'react-native';
import Button from '../../components/Button';
import MapComponents from '../../components/Map';
import {UI_WHITE} from '../../utils/color';

interface IProps {
  navigation: any;
}

const HomeScreen: React.FC<IProps> = ({navigation}) => {
  return (
    <>
      <Button label="맵" onPress={() => navigation.navigate('Map')} />
      <SafeAreaView style={styles.container}>
        <View style={styles.greetLayer}>
          <Text style={styles.greet}>안녕하세요 사용자님 ✋</Text>
        </View>
        <View style={styles.font}></View>
        <View style={styles.font}>
          <Text>힘든길 및 새로운 기술</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 130,
  },
  font: {
    marginTop: 50,
    flex: 1,
  },
  greetLayer: {
    alignItems: 'flex-start',
    flex: 1,
  },
  greet: {
    fontSize: 28,
    fontWeight: '900',
    marginTop: 60,
    marginLeft: 25,
  },
});

export default HomeScreen;
