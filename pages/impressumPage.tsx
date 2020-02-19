import React from 'react';
import { View, Text, Linking } from 'react-native';
import { Card, Avatar, Button } from 'react-native-paper';

export default class ImpressumPage extends React.Component {
  render() {
    return (
      <View>
        <Text>
          Impressum Informationspflicht laut §5 E-Commerce Gesetz, §14
          Unternehmensgesetzbuch, §63 Gewerbeordnung und Offenlegungspflicht
          laut §25 Mediengesetz. Max Mustermann Musterstrasse 1, Stiege 1 Tür 1,
          1234 Musterhausen, Österreich Tel.: 01234/56789 Fax: 01234/56789-0
          E-Mail: office@musterfirma.com Quelle: Erstellt mit dem Impressum
          Generator von firmenwebseiten.at in Kooperation mit limegreen.at
        </Text>
      </View>
    );
  }
}
