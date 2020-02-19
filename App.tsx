import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import startPage from './pages/startPage';
import impressumPage from './pages/impressumPage';

const AppNavigator = createStackNavigator({
  Home: {
    screen: startPage,
  },
  ImpressumPage: {
    screen: impressumPage,
  },
});

export default createAppContainer(AppNavigator);
