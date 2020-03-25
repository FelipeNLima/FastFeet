import React from 'react';
import { StatusBar } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from '~/screen/Profile';
import Deliveries from '~/routes/Deliveries';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#7D40E7',
          inactiveTintColor: '#999',
          labelStyle: {
            fontWeight: 'bold',
          },
        }}
        headerMode="none"
      >
        <Tab.Screen
          name="Entregas"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="reorder-horizontal" size={size} color={color} />
            ),
          }}
          component={Deliveries}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: 'Meu Perfil',
            tabBarIcon: ({ color, size }) => (
              <Icon name="account-circle" size={size} color={color} />
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator>
    </>
  );
}