/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import axios, {AxiosPromise, AxiosResponse} from 'axios';

interface IProps {}

const FacilityActivationScreen: React.FC<IProps> = () => {
  const navigation: any = useNavigation();

  return (
    <View>
      {/* <SearchBar /> */}

      <Button onPress={() => navigation.goBack()} label={'테스팅'} />
    </View>
  );
};

const styles = StyleSheet.create({});
export default FacilityActivationScreen;
