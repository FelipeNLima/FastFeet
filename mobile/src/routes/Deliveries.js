import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import deliveries from '~/screen/deliveries';
// import DeliveryDetails from '~/pages/DeliveryDetails';

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
        component={deliveries}
      />
      {/* <Stack.Screen
        name="Detalhes"
        options={{
          title: 'Detalhes da encomenda',
        }}
        component={DeliveryDetails}
      /> */}
      {/* <Stack.Screen
        name="ConfirmPhoto"
        options={{
          title: 'Confirmar entrega',
        }}
        component={DeliveryConfirmPhoto}
      /> */}
    </Stack.Navigator>
  );
}