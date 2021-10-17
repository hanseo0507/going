import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import FacilityActivationScreen from './screens/FacilityActivationScreen';
import MapScreen from './screens/MapScreen';
import HomeScreen from './screens/HomeScreen';
import LocationSearchScreen from './screens/LocationSearchScreen';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {UI_WHITE} from './utils/color';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setTimeout(() => setloading(true), 600);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      logoImage={require('../src/assets/LoadingLogo.png')}
      isLoaded={loading}
      backgroundColor={UI_WHITE}
      logoHeight={150}
      logoWidth={150}>
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
    </AnimatedSplash>
  );
};

export default App;
