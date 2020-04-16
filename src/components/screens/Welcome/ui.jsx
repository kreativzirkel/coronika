import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLOR_PRIMARY } from '../../../constants';
import Layout from '../../widgets/Layout';

export const getWelcomeStyles = (vw, getFontFamilyBold, getFontFamilyRegular) => {
  return StyleSheet.create({
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
    buttonSkip: {
      marginTop: vw(2),
    },
    buttonSkipText: {
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(3.5),
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
    sliderPagination: {
      alignItems: 'center',
      bottom: vw(2),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    sliderPaginationDot: {
      backgroundColor: '#000000',
      borderRadius: 0,
      height: 5,
      marginLeft: vw(0.8),
      marginRight: vw(0.8),
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
};

const slider = React.createRef();

const Welcome = ({ activateNotifications, finish, navigation, vw, getFontFamilyBold, getFontFamilyRegular, __ }) => {
  const slides = [
    {
      animation: require('../../../assets/animations/why.json'),
      headline: __('welcome-screen.slides.intro.headline'),
      text: __('welcome-screen.slides.intro.text'),
      buttonText: __('welcome-screen.slides.intro.button'),
      key: 'welcome-slide-0',
    },
    {
      animation: require('../../../assets/animations/what.json'),
      headline: __('welcome-screen.slides.how-to.headline'),
      text: __('welcome-screen.slides.how-to.text'),
      buttonText: __('welcome-screen.slides.how-to.button'),
      key: 'welcome-slide-1',
    },
    {
      animation: require('../../../assets/animations/wash.json'),
      headline: __('welcome-screen.slides.notifications.headline'),
      text: __('welcome-screen.slides.notifications.text'),
      buttonSkipText: __('welcome-screen.slides.notifications.button-skip'),
      buttonText: __('welcome-screen.slides.notifications.button'),
      key: 'welcome-slide-2',
      requestPushNotificationsPermissions: true,
    },
    {
      animation: require('../../../assets/animations/how.json'),
      headline: __('welcome-screen.slides.local-data.headline'),
      text: __('welcome-screen.slides.local-data.text'),
      buttonText: __('welcome-screen.slides.local-data.button'),
      key: 'welcome-slide-3',
    },
  ];

  const styles = getWelcomeStyles(vw, getFontFamilyBold, getFontFamilyRegular);

  const next = (index) => {
    const nextSlide = index + 1;
    const isFinished = nextSlide === slides.length;

    if (!isFinished) {
      slider.current.goToSlide(nextSlide);
    } else {
      finish(navigation);
    }
  };

  const requestPushPermissions = (index) => {
    activateNotifications(__, () => {
      next(index);
    });
  };

  return (
    <Layout backgroundColor={'#ffffff'} statusBarHidden>
      <View style={styles.view}>
        <AppIntroSlider
          data={slides}
          ref={slider}
          renderItem={({
            item: { animation, headline, text, buttonSkipText, buttonText, key, requestPushNotificationsPermissions },
            index,
          }) => {
            return (
              <View key={key} style={{ ...styles.view, ...styles.viewSlide }}>
                <LottieView autoPlay loop source={animation} style={styles.animation} />
                <Text style={styles.headline}>{headline}</Text>
                <Text style={styles.text}>{text}</Text>
                <TouchableOpacity
                  onPress={() => (requestPushNotificationsPermissions ? requestPushPermissions(index) : next(index))}>
                  <Text style={styles.button}>{buttonText}</Text>
                </TouchableOpacity>
                {buttonSkipText && (
                  <TouchableOpacity onPress={() => next(index)} style={styles.buttonSkip}>
                    <Text style={styles.buttonSkipText}>{buttonSkipText}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
          renderPagination={(activeIndex) => (
            <View style={styles.sliderPagination}>
              {slides.length > 1 &&
                slides.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => slider.current.goToSlide(i, true)}
                    style={{
                      ...styles.sliderPaginationDot,
                      ...(i === activeIndex && styles.sliderPaginationDotActive),
                    }}
                  />
                ))}
            </View>
          )}
          showDoneButton={false}
          showNextButton={false}
          showPrevButton={false}
          showSkipButton={false}
        />
      </View>
    </Layout>
  );
};

export default Welcome;
