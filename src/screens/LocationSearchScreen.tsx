/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Geolocation from 'react-native-geolocation-service';

import EmojiSadIOS from '../assets/EmojiSadIOS.svg';
import Text from '../components/Text';
import SearchBar from '../components/SearchBar';
import {IFacility} from '../types/facility';
import {
  TEXT_CAPTION,
  TEXT_DEFAULT,
  UI_DEFAULT,
  UI_LINE,
  UI_WHITE,
} from '../utils/color';
import axios from 'axios';
import {useNavigation} from '@react-navigation/core';
import IconButton from '../components/IconButton';
import Voice from '@react-native-voice/voice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_WHITE,
    alignItems: 'center',
    paddingTop: hp('5.3%'),
  },

  searchBarContainer: {
    width: wp('100%'),
    alignItems: 'center',
    paddingBottom: hp('3.5%'),
    borderBottomWidth: 1,
    borderColor: UI_LINE,
  },

  notFoundContainer: {
    flex: 1,
    bottom: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  notFoundText: {
    fontSize: 18,
    letterSpacing: -1,
    marginBottom: 5,
    color: TEXT_DEFAULT,
  },

  notFoundDescription: {
    fontSize: 13,
    color: TEXT_CAPTION,
    marginTop: hp('-3%'),
    textAlign: 'center',
  },

  textContainer: {
    width: wp('100%'),
    borderBottomWidth: 1,
    borderColor: UI_LINE,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('0.5%'),
  },

  textDescriptionContainer: {
    flexDirection: 'row',
    marginTop: hp('-2.3%'),
  },

  textTitle: {
    fontSize: 14,
  },

  textDescription: {
    fontSize: 12,
    color: TEXT_CAPTION,
  },
});

interface IProps {}

const LocationSearchScreen: React.FC<IProps> = () => {
  const navigation = useNavigation();
  const [text, setText] = useState<string>('');
  const [searchResult, setSearchResult] = useState<
    (IFacility & {isKilometer: boolean; distance: string})[]
  >([]);
  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getLocation = (): Promise<number[]> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          resolve([longitude, latitude]);
        },
        error => {
          reject(error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  };

  const getDistance = async (
    lng: number,
    lat: number,
  ): Promise<{isKilometer: boolean; distance: number}> => {
    return new Promise(async (resolve, reject) => {
      try {
        const coords = await getLocation();
        const {data}: any = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/walking/${coords[0]},${coords[1]};${lng},${lat}`,
          {
            params: {
              geometries: 'geojson',
              access_token:
                'pk.eyJ1IjoiaGFuc2VvMDUwNyIsImEiOiJja3ViY25oY2wwcDlmMm5tbzllMGkwNWI4In0.8gwFWP3KrrHWwfIRbRDWWw',
            },
          },
        );

        const distanceFloatKilometer = data.routes[0].distance / 1000;
        const isKilometer = Math.floor(distanceFloatKilometer) !== 0;
        const distance = isKilometer
          ? parseInt(distanceFloatKilometer.toFixed(1))
          : Math.floor(data.routes[0].distance);

        resolve({isKilometer, distance});
      } catch (error: any) {
        resolve(error.response.data.message);
      }
    });
  };

  const onChangeText = async (text: string) => {
    try {
      setText(text);

      if (text === '') {
        return setSearchResult([]);
      }
      const coords = await getLocation();
      const {data}: any = await axios.get(
        'https://going.run.goorm.io/search/facilities',
        {
          params: {
            lng: coords[0],
            lat: coords[1],
            query: text,
            limit: 5,
          },
        },
      );

      const result: any[] = [];

      for (var v of data) {
        const {isKilometer, distance} = await getDistance(
          v.location.coordinates[0],
          v.location.coordinates[1],
        );

        result.push({
          ...v,
          isKilometer,
          distance: `${distance}${isKilometer ? 'km' : 'm'}`,
        });
      }

      setSearchResult(result);
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  const onClickResult = (
    facility: IFacility & {isKilometer: boolean; distance: string},
  ) => {
    Keyboard.dismiss();
    navigation.navigate('Home' as never, {facility} as never);
  };

  const _onSpeechStart = () => {
    console.log('onSpeechStart');
    onChangeText('');
    setError('');
  };
  const _onSpeechEnd = () => {
    setIsRecord(false);
    setError('');
    console.log('onSpeechEnd');
  };
  const _onSpeechResults = (event: any) => {
    console.log('onSpeechResults');
    setIsRecord(false);
    onChangeText(event.value[0]);
  };
  const _onSpeechError = (event: any) => {
    console.log('_onSpeechError');
    setIsRecord(false);
    console.log(event);

    let errMessage: string;

    switch (event.message) {
      case '7/No match':
        errMessage =
          '말씀하신 내용을 인식하지 못했어요\n다시 한 번 말씀해주세요!';

      default:
        errMessage =
          '말씀하신 내용을 인식하지 못했어요\n다시 한 번 말씀해주세요!';
    }

    setError(errMessage);
  };
  const _onRecordVoice = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );

    if (isRecord) {
      await Voice.stop();
    } else {
      await Voice.start('ko-KR');
    }
    setIsRecord(!isRecord);
  };

  useEffect(() => {
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar onChangeText={onChangeText} value={text} />
      </View>

      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          bottom: hp('5%'),
          width: wp('100%'),
          flexDirection: 'row-reverse',
          paddingHorizontal: wp('5%'),
        }}>
        <IconButton
          type="icon"
          iconName="mic-outline"
          color={isRecord ? UI_DEFAULT : TEXT_DEFAULT}
          onTouchEnd={_onRecordVoice}
        />
      </View>

      {!isRecord && !error && text === '' && (
        <View style={styles.notFoundContainer}>
          <Text weight={700} style={styles.notFoundText}>
            이렇게 검색하시면 더 쉽게 찾으실 수 있어요!
          </Text>
          <Text weight={400} style={styles.notFoundDescription}>
            찾으시려는 시설의 이름이나 주소를 입력해주세요!
          </Text>
        </View>
      )}

      {isRecord && !error && (
        <View style={styles.notFoundContainer}>
          <Text weight={700} style={styles.notFoundText}>
            지금 듣고 있어요!
          </Text>
          <Text weight={400} style={styles.notFoundDescription}>
            찾으시려는 시설의 이름이나 주소를 말씀해주세요
          </Text>
        </View>
      )}

      {Boolean(error) && (
        <View style={styles.notFoundContainer}>
          <Text weight={700} style={styles.notFoundText}>
            오류가 발생했어요!
            <EmojiSadIOS />
          </Text>
          <Text weight={400} style={styles.notFoundDescription}>
            {error}
          </Text>
        </View>
      )}

      {searchResult.length === 0 && !error ? (
        text !== '' && (
          <View style={styles.notFoundContainer}>
            <Text weight={700} style={styles.notFoundText}>
              검색어를 찾을 수 없어요..
              <EmojiSadIOS />
            </Text>
            <Text weight={400} style={styles.notFoundDescription}>
              다른 검색어를 입력해주세요
            </Text>
          </View>
        )
      ) : (
        <View>
          {text !== '' &&
            searchResult.map((v, i) => {
              return (
                <View
                  key={i}
                  style={styles.textContainer}
                  onTouchEnd={() => onClickResult(v)}>
                  <Text weight={500} style={styles.textTitle}>
                    {v.name}
                  </Text>
                  <View style={styles.textDescriptionContainer}>
                    <Text
                      weight={500}
                      style={[
                        styles.textDescription,
                        {marginRight: wp('1.5%')},
                      ]}>
                      {v.distance}
                    </Text>
                    <Text weight={500} style={styles.textDescription}>
                      {v.adressDoro || v.adressJibun}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
      )}
    </SafeAreaView>
  );
};

export default LocationSearchScreen;
