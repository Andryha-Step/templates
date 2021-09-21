/* eslint-disable global-require */
/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';
import firebase from 'firebase';
import * as React from 'react';
import { useState } from 'react';
import {
  ActivityIndicator,
  ColorSchemeName,
  Image,
  View,
  Platform,
} from 'react-native';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Search from '../screens/Search';
import Shop from '../screens/Shop';
import { Text } from '../components/Themed';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === `dark` ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(null as any);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.emailVerified) {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  });

  if (isLoggedIn === null) {
    return (
      <View
        style={{
          justifyContent: `center`,
          alignItems: `center`,
          height: `100%`,
        }}
      >
        <ActivityIndicator size="large" color="#F5C500" />
      </View>
    );
  }

  if (isLoggedIn) {
    return (
      <Tab.Navigator
        tabBarOptions={{
          tabStyle: { backgroundColor: `#F5C500`, paddingHorizontal: 20 },
          showLabel: false,
          style: {
            height: Platform.OS === `ios` ? 90 : 66,
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: () => (
              <Image
                source={require(`../assets/images/home.png`)}
                style={{ height: 35, width: 35 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: () => (
              <Image
                source={require(`../assets/images/search.png`)}
                style={{ height: 35, width: 35 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Shop"
          component={Shop}
          options={{
            tabBarIcon: () => (
              <Image
                source={require(`../assets/images/basket.png`)}
                style={{ height: 35, width: 35 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => (
              <Image
                source={require(`../assets/images/user.png`)}
                style={{ height: 35, width: 35 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SignIn"
        options={{
          transitionSpec: {
            open: TransitionSpecs.FadeInFromBottomAndroidSpec,
            close: TransitionSpecs.FadeInFromBottomAndroidSpec,
          },
        }}
        component={SignInScreen}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          transitionSpec: {
            open: TransitionSpecs.FadeInFromBottomAndroidSpec,
            close: TransitionSpecs.FadeInFromBottomAndroidSpec,
          },
        }}
        component={SignUpScreen}
      />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}
