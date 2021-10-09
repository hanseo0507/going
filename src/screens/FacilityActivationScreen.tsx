/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';

interface IProps {}

const FacilityActivationScreen: React.FC<IProps> = () => {
  const navigation: any = useNavigation();

  return (
    <View>
      <Button onPress={() => navigation.goBack()} label={'테스팅'} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default FacilityActivationScreen;
