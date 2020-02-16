import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { FlatList } from 'react-native-gesture-handler';

const NO2_URL =
  'https://www.data.gv.at/katalog/dataset/land-noe-stickstoffdioxid-no2/resource/717ada0c-e7c8-4217-91f4-5e757220d904';

var csv: string;

interface StartPageProperties {
  navigation: NavigationStackProp<{}>;
}

export default class StartPage extends React.Component<StartPageProperties> {
  state = {
    inputText: '',
    no2Data: [],
    isLoading: false,
  };

  componentDidMount() {
    fetch(NO2_URL)
      .then(response => response.json())
      .then(data => this.setState({ no2Data: data }))
      .catch(error => console.log(error));
  }

  render() {
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
