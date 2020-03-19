import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import { CommonActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import Layout from '../widgets/Layout';
import Header from '../widgets/Header';

const slider = React.createRef();

const About = ({ navigation, vw, __ }) => {
  const slides = [
    {
      animation: require('../../assets/animations/why.json'),
      headline: __('welcome-screen.slides.intro.headline'),
      text: __('welcome-screen.slides.intro.text'),
      buttonText: __('welcome-screen.slides.intro.button'),
      key: 'welcome-slide-0',
    },
    {
      animation: require('../../assets/animations/what.json'),
      headline: __('welcome-screen.slides.how-to.headline'),
      text: __('welcome-screen.slides.how-to.text'),
      buttonText: __('welcome-screen.slides.how-to.button'),
      key: 'welcome-slide-1',
    },
    {
      animation: require('../../assets/animations/how.json'),
      headline: __('welcome-screen.slides.local-data.headline'),
      text: __('welcome-screen.slides.local-data.text'),
      buttonText: __('welcome-screen.slides.local-data.button'),
      key: 'welcome-slide-2',
    },
  ];

  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    animation: {
      width: vw(55),
    },
    header: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: Platform.OS === 'ios' ? 'space-between' : 'flex-end',
    },
    headerHeadline: {
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(5),
      marginLeft: 'auto',
      textTransform: 'lowercase',
    },
    headline: {
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(7),
      textAlign: 'center',
    },
    text: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.5),
      lineHeight: vw(7),
      textAlign: 'center',
    },
    button: {
      color: COLOR_PRIMARY,
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(7),
      textAlign: 'center',
    },
    sliderPagination: {
      bottom: vw(2),
    },
    sliderPaginationDot: {
      backgroundColor: '#000000',
      borderRadius: 0,
      height: 5,
      width: vw(15),
    },
    sliderPaginationDotActive: {
      backgroundColor: COLOR_PRIMARY,
    },
    view: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
    viewSlide: {
      justifyContent: 'space-between',
      padding: vw(10),
      paddingBottom: vw(20),
      paddingTop: vw(5),
    },
  });

  const goBack = () => navigation.dispatch(CommonActions.goBack());

  const next = (index) => {
    const nextSlide = index + 1;
    const isFinished = nextSlide === slides.length;

    if (!isFinished) {
      slider.current.goToSlide(nextSlide);
    } else {
      goBack();
    }
  };

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <Header>
        <View style={styles.header}>
          {Platform.OS === 'ios' && (
            <TouchableOpacity onPress={() => goBack()} style={{ marginBottom: -vw(3), marginTop: -vw(3) }}>
              <UilArrowLeft size={vw(12)} color={'#000000'} />
            </TouchableOpacity>
          )}

          <Text style={styles.headerHeadline}>{__('about-screen.header.headline')}</Text>
        </View>
      </Header>

      <View style={styles.view}>
        <AppIntroSlider
          activeDotStyle={{ ...styles.sliderPaginationDot, ...styles.sliderPaginationDotActive }}
          dotStyle={styles.sliderPaginationDot}
          paginationStyle={styles.sliderPagination}
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

export default withI18n(withViewportUnits(About));
