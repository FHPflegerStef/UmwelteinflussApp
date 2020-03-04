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
  Avatar,
  ActivityIndicator,
  Searchbar,
  DarkTheme,
} from 'react-native-paper';

const TEMP_URL = 'http://open-data.noe.gv.at/ogd-data/BD4/Lufttemperatur.csv';

interface StartPageProperties {
  navigation: NavigationStackProp<{}>;
}

export default class StartPage extends React.Component<StartPageProperties> {
  state = {
    inputText: '',
    tempData: '',
    data: [],
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
    //get csv from the website
    fetch(TEMP_URL)
      .then(response => response.text())
      .then(text => this.setState({ tempData: text }))
      .catch(error => console.log(error));

    this.setState({ data: csvJSON(this.state.tempData) });
  }

  getFilteredItems = () => {
    this.state.data.filter(value =>
      value.Station.includes(this.state.inputText)
    );
  };

  renderCityItem = ({ item }) => {
    const dateNow = new Date();
    const lastHour = dateNow.getHours() - 1;
    const valueOfDate = 'Wert' + lastHour.toString();
    const tempAtLastHour = Number(item[valueOfDate]);
    const tempString = tempAtLastHour.toFixed(2).toString() + ' °C';

    if (item.Station != '') {
      return (
        <View style={{ padding: 5 }}>
          <CityItem
            station={String(item.Station).slice(1, -1)}
            temperature={tempString}
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
    const tempArray = csvJSON(this.state.tempData);

    console.log(this.state.data);
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 5, paddingBottom: 48 }}>
        <View>
          <Searchbar
            placeholder='Search'
            onChangeText={query => this.setState({ inputText: query })}
            value={this.state.inputText}
          />

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
            data={tempArray}
            renderItem={this.renderCityItem}
            keyExtractor={item => item.Station}
          />
        </View>
      </SafeAreaView>
    );
  }
}
interface ItemProps {
  station: string;
  temperature: string;
  onCityClicked(): void;
}

class CityItem extends React.Component<ItemProps> {
  render() {
    return (
      <Card onPress={this.props.onCityClicked}>
        <Card.Title
          title={this.props.station}
          subtitle={this.props.temperature}
          left={props => <Avatar.Icon {...props} icon='city-variant-outline' />}
        />
        <Card.Cover source={require('../icons/fog_background.jpg')} />
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
