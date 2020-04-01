import { CommonActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import Layout from '../widgets/Layout';
import { HeaderBack } from '../widgets/Header';

const slider = React.createRef();

const About = ({ navigation, vw, getFontFamilyBold, getFontFamilyRegular, __ }) => {
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
    headline: {
      fontFamily: getFontFamilyBold(),
      fontSize: vw(7),
      textAlign: 'center',
    },
    text: {
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(4.5),
      lineHeight: vw(7),
      textAlign: 'center',
    },
    button: {
      color: COLOR_PRIMARY,
      fontFamily: getFontFamilyBold(),
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
      padding: vw(5),
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
      <HeaderBack headline={__('about-screen.header.headline')} navigation={navigation} />

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

export default memo(withI18n(withViewportUnits(About)));
