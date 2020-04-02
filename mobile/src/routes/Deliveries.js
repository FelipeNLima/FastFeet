import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Details from '~/screen/DeliveryDetails';
import Delivery from '~/screen/deliveries';
import ConfirmDelivery from '~/screen/DeliveryDetails/ConfirmDelivery';
import ReportProblem from '~/screen/DeliveryDetails/ReportProblem';
import ViewProblem from '~/screen/DeliveryDetails/ViewProblem';

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
      <Stack.Screen
        name="Confirmação"
        options={{
          title: 'Confirmar Entrega',
        }}
        component={ConfirmDelivery}
      />
      <Stack.Screen
        name="Informar"
        options={{
          title: 'Informar Problema',
        }}
        component={ReportProblem}
      />
      <Stack.Screen
        name="Visualizar"
        options={{
          title: 'Visualizar Problema',
        }}
        component={ViewProblem}
      />
    </Stack.Navigator>
  );
}
