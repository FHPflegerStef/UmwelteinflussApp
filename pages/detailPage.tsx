import React from 'react';
import { StyleSheet, View, Text, Linking, ToastAndroid } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {
  Card,
  Avatar,
  Button,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';

//Url-variables
const NO2_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Stickstoffdioxid.csv';
const CO_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Kohlenmonoxid.csv';
const O3_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Ozon.csv';
const GLOBSTR_URL =
  'http://open-data.noe.gv.at/ogd-data/BD4/Globalstrahlung.csv';
const PM10_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/FeinstaubPM10.csv';
const TEMP_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Lufttemperatur.csv';
const HUMI_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Luftfeuchtigkeit.csv';

interface DetailPageProps {
  navigation: any;
}

export default class DetailPage extends React.Component<DetailPageProps> {
  state = {
    csvs: {
      no2Data: null,
      o3Data: null,
      globStrData: null,
      pm10Data: null,
      coData: null,
      tempData: null,
      humiData: null,
    },
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Wetterdaten Gemeinde',
    };
  };

  componentDidMount() {
    const stationName = this.props.navigation.getParam('value');
    //get csv's from the website
    fetchCSV().then(csvs => {
      Object.keys(csvs).forEach(key => {
        const csv = csvs[key].filter(
          dataPoint => dataPoint.Station === stationName
        );
        csvs[key] = csv.length > 0 ? csv[0] : null;
      });
      this.setState({
        csvs,
      });
    });
  }

  renderDataItems = ({ item: key }) => {
    const item = this.state.csvs[key];
    if (item === null) return <></>;
    console.log(item.Komponente);

    const dateNow = new Date();
    const lastHour = dateNow.getHours() - 1;
    const valueOfDate = 'Wert' + lastHour.toString();
    let substringValue: string;
    let komponentString: string;
    let iconString = 'alert-circle-outline';

    switch (item.Komponente) {
      case "'Lufttemperatur'":
        substringValue =
          Number(item[valueOfDate])
            .toFixed(2)
            .toString() + ' °C';
        komponentString = 'Temperatur';
        iconString = 'temperature-celsius';
        break;
      case "'Stickstoffdioxid'":
        substringValue =
          Number(item[valueOfDate])
            .toFixed(2)
            .toString() + ' µg/m³';
        komponentString = 'Stickstoffdioxid NO2';
        iconString = './';
        break;
      default:
        ToastAndroid.show('Oops, something went wrong.', ToastAndroid.SHORT);
    }

    return (
      <View key={item.Komponente + item.Wert01} style={{ padding: 5 }}>
        <CityItem
          komponentName={komponentString}
          valueString={substringValue}
          iconString={iconString}
          onCityClicked={() =>
            this.props.navigation.navigate('DetailPage', {
              value: item.Station,
            })
          }
        />
      </View>
    );
  };

  render() {
    console.log(Object.keys(this.state.csvs));
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
          data={Object.keys(this.state.csvs)}
          renderItem={this.renderDataItems}
          keyExtractor={key => key}
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

async function fetchCSV() {
  return {
    tempData: csvJSON(await (await fetch(TEMP_URL)).text()),
    no2Data: csvJSON(await (await fetch(NO2_URL)).text()),
    coData: csvJSON(await (await fetch(CO_URL)).text()),
    o3Data: csvJSON(await (await fetch(O3_URL)).text()),
    globstrData: csvJSON(await (await fetch(GLOBSTR_URL)).text()),
    pm10Data: csvJSON(await (await fetch(PM10_URL)).text()),
    humiData: csvJSON(await (await fetch(HUMI_URL)).text()),
  };
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
