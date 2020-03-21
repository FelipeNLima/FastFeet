import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '~/screens/SignIn';

const Stack = createStackNavigator();
export default function createRouter(isSigned = false) {
  return !isSigned ? (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        options={{ headerShown: false }}
        component={SignIn}
      />
    </Stack.Navigator>
  ) : (
      <Stack.Navigator />
    );
}
