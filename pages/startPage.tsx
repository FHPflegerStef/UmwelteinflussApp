import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  NavigationStackProp,
  createStackNavigator,
} from 'react-navigation-stack';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { CsvParser } from 'csv-parser';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Provider as PaperProvider,
  Card,
  IconButton,
} from 'react-native-paper';

const NO2_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Stickstoffdioxid.csv';
const CO_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Kohlenmonoxid.csv';
const O3_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Ozon.csv';
const GLOBSTR_URL =
  'http://open-data.noe.gv.at/ogd-data/BD4/Globalstrahlung.csv';
const PM10_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/FeinstaubPM10.csv';
const TEMP_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Lufttemperatur.csv';
const HUMI_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Luftfeuchtigkeit.csv';

interface StartPageProperties {
  navigation: NavigationStackProp<{}>;
}

export default class StartPage extends React.Component<StartPageProperties> {
  state = {
    inputText: '',
    no2Data: '',
    o3Data: '',
    globStrData: '',
    pm10Data: '',
    coData: '',
    tempData: '',
    humiData: '',
    isLoading: false,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'NÖ-Messstationen',
      headerRight: () => (
        <IconButton
          icon='information-outline'
          onPress={() => navigation.navigate('ImpressumPage')}
          color='#000'
        />
      ),
    };
  };

  componentDidMount() {
    //get csv's from the website
    fetch(NO2_URL)
      .then(response => response.text())
      .then(text => this.setState({ no2Data: text }))
      .catch(error => console.log(error));
    fetch(CO_URL)
      .then(response => response.text())
      .then(text => this.setState({ coData: text }))
      .catch(error => console.log(error));
    fetch(O3_URL)
      .then(response => response.text())
      .then(text => this.setState({ o3Data: text }))
      .catch(error => console.log(error));
    fetch(GLOBSTR_URL)
      .then(response => response.text())
      .then(text => this.setState({ globStrData: text }))
      .catch(error => console.log(error));
    fetch(PM10_URL)
      .then(response => response.text())
      .then(text => this.setState({ pm10Data: text }))
      .catch(error => console.log(error));
    fetch(TEMP_URL)
      .then(response => response.text())
      .then(text => this.setState({ tempData: text }))
      .catch(error => console.log(error));
    fetch(HUMI_URL)
      .then(response => response.text())
      .then(text => this.setState({ humiData: text }))
      .catch(error => console.log(error));
  }

  renderApothekenItem = ({ item }) => {
    return (
      <View style={{ padding: 5 }}>
        <Card>
          <Card.Title title={item.Station} />
        </Card>
      </View>
    );
  };

  render() {
    const tempArray = csvJSON(this.state.tempData);

    return (
      <View>
        <FlatList
          ListEmptyComponent={() => <Text>Keine Daten gefunden.</Text>}
          data={tempArray}
          renderItem={this.renderApothekenItem}
        />
      </View>
    );
  }
}

function csvJSON(csv) {
  var lines = csv.split('\n');

  var result = [];

  var headers = lines[0].split(';');

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(';');

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result; //JavaScript object
  //return JSON.stringify(result); //JSON
}

function objectConverter(jsonAsArray) {
  const jsonAsObject = jsonAsArray[0];
  if (typeof jsonAsObject != 'undefined') {
    console.log(jsonAsObject.Datum);
  }
}

function renderCards() {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
