import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import App from './App'
import {AuthContext} from '../context/AuthContext'
import * as SplashScreen from 'expo-splash-screen';
import Test from './screens/test'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

const index = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthContext>
      <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen name='App' component={App}/>
            <Stack.Screen name='test' component={Test}/>
          </Stack.Navigator>
        </NavigationContainer>
    </AuthContext>
  )
}

export default index