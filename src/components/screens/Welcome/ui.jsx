import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLOR_PRIMARY } from '../../../constants';
import Layout from '../../widgets/Layout';

const slider = React.createRef();

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  animation: {
    width: '80%',
  },
  headline: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 32,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    color: COLOR_PRIMARY,
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 32,
    textAlign: 'center',
  },
  sliderPaginationDot: {
    backgroundColor: '#000000',
    borderRadius: 0,
    height: 5,
    width: 50,
  },
  sliderPaginationDotActive: {
    backgroundColor: COLOR_PRIMARY,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  viewSlide: {
    justifyContent: 'space-between',
    padding: 30,
    paddingBottom: 80,
  },
});

const slides = [
  {
    animation: require('../../../assets/animations/why.json'),
    headline: 'Gemeinsam das Corona Virus eindämmen.',
    text: 'Zusammen können wir Infektionswege nachvollziehen und so eine Ausbreitung eindämmen.',
    buttonText: 'Super, ich will mithelfen!',
    key: 'welcome-slide-0',
  },
  {
    animation: require('../../../assets/animations/what.json'),
    headline: 'Ein Tagebuch mit Orten und Personen',
    text:
      'Trage täglich ein, wen du getroffen hast und an welchen öffentlichen Orten (U-Bahn, Supermarkt, usw.) du dich aufgehalten hast. Mit wenigen Minuten täglich leistest du einen Beitrag zur Gesundheit aller.',
    buttonText: 'Alles klar',
    key: 'welcome-slide-1',
  },
  {
    animation: require('../../../assets/animations/how.json'),
    headline: 'Deine Daten gehören dir',
    text: 'Alle Informationen, die in Coronik anlegst werden lokal gespeichert.',
    buttonText: 'Jetzt anfangen',
    key: 'welcome-slide-2',
  },
];

const Welcome = ({ navigation }) => {
  const next = (index) => {
    const nextSlide = index + 1;
    const isFinished = nextSlide === slides.length;

    if (!isFinished) {
      slider.current.goToSlide(nextSlide);
    } else {
      navigation.navigate('App');
    }
  };

  return (
    <Layout backgroundColor={'#ffffff'} statusBarHidden>
      <View style={styles.view}>
        <AppIntroSlider
          activeDotStyle={{ ...styles.sliderPaginationDot, ...styles.sliderPaginationDotActive }}
          dotStyle={styles.sliderPaginationDot}
          ref={slider}
          renderItem={({ item: { animation, headline, text, buttonText, key }, index }) => {
            return (
              <View key={key} style={{ ...styles.view, ...styles.viewSlide }}>
                <LottieView autoPlay loop source={animation} style={styles.animation} />
                <Text style={styles.headline}>{headline}</Text>
                <Text style={styles.text}>{text}</Text>
                <TouchableOpacity onPress={() => next(index)}>
                  <Text style={styles.button}>{buttonText}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          slides={slides}
        />
      </View>
    </Layout>
  );
};

export default Welcome;
