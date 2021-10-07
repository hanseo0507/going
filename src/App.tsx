// import React from 'react';
// import HomeScreen from './screens/Home/HomeScreen';
// import MapScreen from './screens/Map/MapScreen';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// const Stack = createStackNavigator();
// const RootStack = createStackNavigator();

// const MainNavigator = () => (
//   <Stack.Navigator initialRouteName="HomeStack">
//     <Stack.Screen name="Home" component={HomeScreen} />
//     <Stack.Screen name="Map" component={MapScreen} />
//   </Stack.Navigator>
// );

// const App: React.FC = () => {
//   return <HomeScreen />;
// };

// export default App;

import React, {useEffect, useState} from 'react';

import MapScreen from './screens/Map/MapScreen';
import HomeScreen from './screens/Home/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';

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
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
