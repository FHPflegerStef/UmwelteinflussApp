import React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {
  Card,
  Avatar,
  Button,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';

const NO2_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Stickstoffdioxid.csv';
const CO_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Kohlenmonoxid.csv';
const O3_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Ozon.csv';
const GLOBSTR_URL =
  'http://open-data.noe.gv.at/ogd-data/BD4/Globalstrahlung.csv';
const PM10_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/FeinstaubPM10.csv';
const TEMP_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Lufttemperatur.csv';
const HUMI_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Luftfeuchtigkeit.csv';

var arrayAlreadyRendered = [];

interface DetailPageProps {
  navigation: any;
}

export default class DetailPage extends React.Component<DetailPageProps> {
  state = {
    renderLimiter: 0,
    stationName: '',
    inputText: '',
    no2Data: '',
    o3Data: '',
    globStrData: '',
    pm10Data: '',
    coData: '',
    tempData: '',
    humiData: '',
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Wetterdaten Gemeinde',
    };
  };

  fetchCsvs() {
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

  componentDidMount() {
    //get csv's from the website
    this.fetchCsvs();
  }

  renderDataItems = ({ item }) => {
    if (
      item.Station == this.state.stationName &&
      !arrayAlreadyRendered.includes(item.Station + ' ' + item.Komponente)
    ) {
      console.log('Test: ' + item.Komponente);
      //   arrayAlreadyRendered.push(item.Station + ' ' + item.Komponente);
      const dateNow = new Date();
      const lastHour = dateNow.getHours() - 1;
      const valueOfDate = 'Wert' + lastHour.toString();
      var substringValue: string;
      var komponentString: string;
      var iconString = 'alert-circle-outline';
      const switchArray = item.Komponente;

      switch (switchArray) {
        case "'Lufttemperatur'":
          substringValue =
            Number(item[valueOfDate])
              .toFixed(2)
              .toString() + ' °C';
          komponentString = 'Temperatur';
          iconString = 'temperature-celsius';
        case "'Stickstoffdioxid'":
          substringValue =
            Number(item[valueOfDate])
              .toFixed(2)
              .toString() + ' µg/m³';
          komponentString = 'Stickstoffdioxid NO2';
      }

      return (
        <View key={item.Komponente + item.Wert01} style={{ padding: 5 }}>
          <CityItem
            komponentName={item.Komponente}
            valueString={item[valueOfDate]}
            iconString={iconString}
            onCityClicked={() =>
              this.props.navigation.navigate('DetailPage', {
                value: item.Station,
              })
            }
          />
        </View>
      );
    }
  };

  render() {
    //tries to render multiple times -> error if setState is rendered multiple times
    if (this.state.renderLimiter == 0) {
      const value = this.setState({
        stationName: this.props.navigation.getParam('value'),
      });

      this.setState({ renderLimiter: 1 });
    }

    const no2Array = csvJSON(this.state.no2Data);
    const coArray = csvJSON(this.state.coData);
    const o3Array = csvJSON(this.state.o3Data);
    const pm10Array = csvJSON(this.state.pm10Data);
    const globStraArray = csvJSON(this.state.globStrData);
    const humidityArray = csvJSON(this.state.humiData);
    const tempArray = csvJSON(this.state.tempData);
    const allData = tempArray.concat(
      no2Array,
      coArray,
      o3Array,
      pm10Array,
      globStraArray,
      humidityArray
    );

    return (
      <View>
        <FlatList
          ListEmptyComponent={() => (
            <ActivityIndicator
              animating={true}
              color={'blue'}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            />
          )}
          data={allData}
          renderItem={this.renderDataItems}
        />
      </View>
    );
  }
}

interface ItemProps {
  komponentName: string;
  valueString: string;
  iconString: string;
  onCityClicked(): void;
}

class CityItem extends React.Component<ItemProps> {
  render() {
    return (
      <Card onPress={this.props.onCityClicked}>
        <Card.Title
          title={this.props.komponentName}
          subtitle={this.props.valueString}
          left={props => (
            <Avatar.Icon {...props} icon={this.props.iconString} />
          )}
        />
      </Card>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
