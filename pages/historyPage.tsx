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
              <Title>Wissenswertes über: {stationName}</Title>
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
    case 'Stickstoffdioxid':
      paragraphText =
        'Grundsätzlich ist Stickstoffdioxid ein Reizgas, das tief in die Lunge eindringen kann. Dort kann es die Schleimhäute reizen und Entzündungen auslösen. Dadurch entstehen Entzündungs-Botenstoffe, die ins Blut ausgeschüttet werden und dann im ganzen Körper eine leichte Entzündung hervorrufen können.\nDer Mittelwert sollte im Außenbereich 40µg/m³ nicht überschreiten. Ein Wert unter 20µg/m³ ist im grünen Bereich. Kurzfrisitg (Mittelwert einer Stunde) darf der Wert auf 250µg/m³ ansteigen. ';
      break;
    case 'Luftfeuchtigkeit':
      paragraphText =
        'Unter Luftfeuchte versteht man einen Zahlenwert, der angibt, wie viel Wasser relativ zu der Maximalmenge in der Luft enthalten ist. Sie liegt also zwischen 0% (trockener Luft) und 100% (gesättigter, feuchter Luft). Der Maximalwert von 100% kann nicht überschritten werden. Beim Versuch, noch mehr Wasser in die Atmosphäre zu befördern, würde dieses direkt wieder kondensieren und entweder als Nebel in der Luft oder als Tautropfen an einer Oberfläche sichtbar werden.';
      break;
    case 'Ozon':
      paragraphText =
        'Im Gegensatz zum Ozon in höheren Luftschichten, wo es uns vor schädlicher UV-Strahlung schützt, ist bodennahes Ozon ein Reizgas, welches die menschliche Lungenfunktion beeinträchtigen kann. Auch bei manchen Pflanzenarten führen kurzfristig erhöhte Ozonkonzentrationen zu Schädigungen der Blattorgane und bei langfristiger Belastung treten Wachstums- und Ernteverluste auf.';
      break;
    case 'PM10':
      paragraphText =
        'Die als Feinstaub (PM10) bezeichnete Staubfraktion enthält 50% der Teilchen mit einem Durchmesser von 10 µm, einen höheren Anteil kleinerer Teilchen und einen niedrigeren Anteil größerer Teilchen. Partikel dieser Größe können über den Kehlkopf hinaus bis tief in die Lunge gelangen. Sie sind daher besonders gesundheitsschädlich. Sie sind maximal so groß wie Zellen und können daher mit freiem Auge nicht gesehen werden.\nDer Tagesmittelwert sollte 50 µg/m³ nicht überschreiten.';
      break;
    case 'PM2.5':
      paragraphText =
        'Die als Feinstaub (PM2,5) bezeichnete Staubfraktion enthält 50% der Teilchen mit einem Durchmesser von 2,5 µm, einen höheren Anteil kleinerer Teilchen und einen niedrigeren Anteil größerer Teilchen. PM2,5 ist eine Teilmenge von PM10 - Partikel dieser Größe können bis in die Lungenbläschen gelangen. Sie sind maximal so groß wie Bakterien und können daher mit freiem Auge nicht gesehen werden.\nDie Weltgesundheitsorganisation WHO hat einen Richtwert für PM2,5 von 10 µg/m³ festgelegt.  ';
      break;
    case 'Kohlenmonoxid':
      paragraphText =
        'Kohlenmonoxid (CO) entsteht hauptsächlich bei der unvollständigen Verbrennung von Brenn- und Treibstoffen. Hauptquellen sind der Kleinverbrauch, der Verkehr und die Industrie.\nAls Luftschadstoff ist CO vor allem aufgrund der humantoxischen Wirkung (Beeinträchtigung der Sauerstoffaufnahmekapazität des Hämoglobins) von Bedeutung. CO spielt aber auch bei der photochemischen Bildung von bodennahem Ozon im globalen und kontinentalen Maßstab eine bedeutende Rolle.\nDer höchste 8-Stunden-Mittelwert darf 10 mg/m³ nicht überschreiten.';
      break;
    case 'Globalstrahlung':
      paragraphText =
        'Unter Globalstrahlung versteht man die Summe der an einem Ort eintreffenden Solarstrahlung. Sie setzt sich zusammen aus der auf direktem Weg ankommenden Solarstrahlung (Direktstrahlung) und der Strahlung, die über Reflexion an Wolken, Wasser- und Staubteilchen die Erdoberfläche erreicht, (Diffusstrahlung). Gemessen wird die Globalstrahlung in der Einheit der Bestrahlungsstärke, Watt pro Quadratmeter (W/m²). Die Globalstrahlung erreicht bei wolkenlosem Himmel im Sommer in Mitteleuropa etwa 1000 W/m². Bei trübem, wolkigem Wetter besteht sie nur aus dem Diffusstrahlungsanteil und ihr Wert sinkt auf Werte unter 100 Watt pro Quadratmeter. ';
      break;
  }

  return paragraphText;
}
