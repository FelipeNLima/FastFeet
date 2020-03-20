import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '~/pages/SignIn';

export default function createRouter(isSigned = false) {
  const { Stack } = createStackNavigator();

  <Stack.Navigator headerMode="none">
    <Stack.Screen name="SignIn" component={SignIn} />
  </Stack.Navigator>

}
