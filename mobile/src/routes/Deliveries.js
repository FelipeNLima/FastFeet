import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Details from '~/screen/DeliveryDetails';
import Delivery from '~/screen/deliveries';

const Stack = createStackNavigator();

export default function Deliveries() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#fff',
        headerTransparent: true,
      }}
      initialRouteName="Entregas"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Entregas"
        component={Delivery}
      />
      <Stack.Screen
        name="Detalhes"
        options={{
          title: 'Detalhes da encomenda',
        }}
        component={Details}
      />
    </Stack.Navigator>
  );
}