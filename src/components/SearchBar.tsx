/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableHighlight,
  View,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {TEXT_CAPTION, TEXT_DEFAULT, TEXT_DISABLE} from '../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {
  GooglePlacesAutocomplete,
  getLatLng,
} from 'react-native-google-places-autocomplete';

interface IProps extends TextInputProps {}

const SearchBar: React.FC<IProps> = () => {
  const [DestinationLatitude, setDestinationLatitude] = useState<number[]>([
    0, 0,
  ]);
  const [DestinationLongitude, setDestinationLongitude] = useState<number[]>([
    0, 0,
  ]);
  const GOOGLE_PLACES_API_KEY = 'AIzaSyBmzJS7_jDCqVEZTtpcuzIvCKKqacbGVxg';

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <GooglePlacesAutocomplete
          placeholder="장소 검색하기..."
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'ko',
          }}
          fetchDetails={true}
          onPress={(data, details: any) => {
            setDestinationLatitude(details.geometry.location.lat.toString());
            setDestinationLongitude(details.geometry.location.lng.toString());
            console.log(DestinationLatitude, DestinationLongitude);
          }}
          onFail={error => console.error(error)}
          requestUrl={{
            url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
            useOnPlatform: 'web',
          }}
          keyboardShouldPersistTaps="always"
          styles={{
            textInputContainer: {
              alignSelf: 'center',
              color: TEXT_CAPTION,
            },
            textInput: {
              paddingLeft: 20,
              fontSize: 14,
              color: TEXT_CAPTION,
            },
            predefinedPlacesDescription: {
              color: TEXT_CAPTION,
            },
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    top: 50,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  textInput: {
    width: '90%',
  },
  searchBar: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 25,
    color: TEXT_DEFAULT,
    textDecorationLine: 'none',
  },
  icon: {
    marginTop: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('8%'),
    height: hp('4%'),
    borderRadius: 30,
  },
});
export default SearchBar;
