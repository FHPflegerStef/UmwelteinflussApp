import React from 'react';
import { View, Text, Linking, Platform, StyleSheet } from 'react-native';
import { Card, Avatar, Button } from 'react-native-paper';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import qs from 'qs';
import { NavigationStackProp } from 'react-navigation-stack';

const phoneNumber: string = '+43 680 213 5507';
const emailAddress: string = 'se171009@fhstp.ac.at';

interface ImpressumPageProperties {
  navigation: NavigationStackProp<{}>;
}

export default class ImpressumPage extends React.Component<
  ImpressumPageProperties
> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Impressum',
    };
  };

  callNumber() {
    let url = '';
    if (Platform.OS === 'android') {
      url = `tel:${phoneNumber}`;
    } else {
      url = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(url);
  }

  writeEmail() {
    let url = `mailto:${emailAddress}`;

    const query = qs.stringify({
      subject: 'Umwelteinfluss-App - Feedback / Frage',
    });

    url += `?${query}`;

    Linking.openURL(url);
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Card>
            <Card.Title
              title='Stefan Pfleger - ©2020'
              left={props => (
                <Avatar.Image
                  {...props}
                  source={require('../icons/fh-logo.jpg')}
                />
              )}
            />
          </Card>
          <Card onPress={this.writeEmail}>
            <Card.Title
              title={emailAddress}
              left={props => (
                <Avatar.Icon {...props} icon='email' style={styles.icon} />
              )}
            />
          </Card>
          <Card onPress={this.callNumber}>
            <Card.Title
              title={phoneNumber}
              left={props => (
                <Avatar.Icon {...props} icon='cellphone' style={styles.icon} />
              )}
            />
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#005197',
  },
});
