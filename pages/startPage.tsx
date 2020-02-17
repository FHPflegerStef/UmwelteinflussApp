import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { FlatList } from 'react-native-gesture-handler';
import { CsvParser } from 'csv-parser';

const NO2_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Stickstoffdioxid.csv';
const CO_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Kohlenmonoxid.csv';
const O3_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Ozon.csv';
const GLOBSTR_URL =
  'http://open-data.noe.gv.at/ogd-data/BD4/Globalstrahlung.csv';
const PM10_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/FeinstaubPM10.csv';
const TEMP_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Lufttemperatur.csv';
const HUMI_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Luftfeuchtigkeit.csv';

var csv: string;

interface StartPageProperties {
  navigation: NavigationStackProp<{}>;
}

export default class StartPage extends React.Component<StartPageProperties> {
  state = {
    inputText: '',
    no2Data: [],
    o3Data: [],
    globStrData: [],
    pm10Data: [],
    coData: [],
    tempData: [],
    humiData: [],
    isLoading: false,
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

  render() {
    console.log(this.state.tempData);
    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
