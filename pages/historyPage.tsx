import React from 'react';
import { View, Text, Linking, Dimensions } from 'react-native';
import {
  Card,
  Avatar,
  Button,
  Title,
  Paragraph,
  DarkTheme,
} from 'react-native-paper';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { SafeAreaView, ThemeColors } from 'react-navigation';

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
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.value.Komponente.slice(1, -1) : 'Detailansicht',
    };
  };

  render() {
    const stationName = this.props.navigation
      .getParam('value')
      .Komponente.slice(1, -1);

    return (
      <SafeAreaView>
        <View>
          <Card>
            <Card.Content>
              <Title>Info über: {stationName}</Title>
              <Paragraph>{getParagraphText(stationName)}</Paragraph>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    );
  }
}

function getParagraphText(stationName) {
  let paragraphText: string;

  switch (stationName) {
    case 'Lufttemperatur':
      paragraphText =
        'Die Lufttemperatur ist ein wichtiges Maß der Meteorologie und wird in aller Regel in Grad Celsius (°C), Kelvin (K) oder Grad Fahrenheit (°F) angegeben. Damit eine Temperaturmessung möglichst aussagekräftig sein kann, messen Meteorologen die Lufttemperatur in 2m Höhe sowie ohne direkte Sonneneinstrahlung. Abstrahlende Bodenwärme und Sonnenenergie würden den Wert künstlich erhöhen';
      break;
  }

  return paragraphText;
}
