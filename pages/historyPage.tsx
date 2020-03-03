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
  componentDidMount() {
    // this.setState({
    //   stationName: this.props.navigation.getParam('value').Komponente,
    // });
    // console.log(this.state.stationName);
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.value.Komponente.slice(1, -1) : 'Detailansicht',
    };
  };

  render() {
    return (
      <View>
        <Card>
          <Card.Title title='Was ist die ' />
        </Card>
        <Text>Informationen zu dem Parameter:</Text>
      </View>
    );
  }
}
