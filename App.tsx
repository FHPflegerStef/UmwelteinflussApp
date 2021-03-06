import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import startPage from './pages/startPage';
import impressumPage from './pages/impressumPage';
import detailPage from './pages/detailPage';
import historyPage from './pages/historyPage';

const AppNavigator = createStackNavigator({
  Home: {
    screen: startPage,
  },
  ImpressumPage: {
    screen: impressumPage,
  },
  DetailPage: {
    screen: detailPage,
  },
  HistoryPage: {
    screen: historyPage,
  },
});

export default createAppContainer(AppNavigator);
