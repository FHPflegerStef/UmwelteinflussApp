import React from 'react';
import { View, Text, Linking, Dimensions } from 'react-native';
import { Card, Avatar, Button } from 'react-native-paper';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

interface HistoryPageProps {
  navigation: any;
}

export default class HistoryPage extends React.Component<HistoryPageProps> {
  state = {
    stationName: '',
  };
  componentDidMount() {}

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.value.Komponente.slice(1, -1) : 'Detailansicht',
    };
  };

  render() {
    return (
      <View>
        <Text>Informationen zu dem Parameter:</Text>
      </View>
    );
  }
}
