import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import FacilityActivationScreen from './screens/FacilityActivationScreen';
import MapScreen from './screens/MapScreen';
import HomeScreen from './screens/HomeScreen';
import LocationSearchScreen from './screens/LocationSearchScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen
            name="Activation"
            component={FacilityActivationScreen}
          />
          <Stack.Screen
            name="LocationSearch"
            component={LocationSearchScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
