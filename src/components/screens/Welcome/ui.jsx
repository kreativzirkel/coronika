import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLOR_PRIMARY } from '../../../constants';
import Layout from '../../widgets/Layout';

export const getWelcomeStyles = (vw, colors, fontFamilyBold, fontFamilyRegular) => {
  return StyleSheet.create({
    animation: {
      width: vw(55),
    },
    headline: {
      color: colors.TEXT,
      fontFamily: fontFamilyBold,
      fontSize: vw(6),
      textAlign: 'center',
    },
    text: {
      color: colors.TEXT,
      fontFamily: fontFamilyRegular,
      fontSize: vw(4.2),
      lineHeight: vw(6.5),
      textAlign: 'center',
    },
    button: {
      color: COLOR_PRIMARY,
      fontFamily: fontFamilyBold,
      fontSize: vw(7),
      textAlign: 'center',
    },
    buttonSkip: {
      marginTop: vw(2),
    },
    buttonSkipText: {
      color: colors.TEXT,
      fontFamily: fontFamilyRegular,
      fontSize: vw(3.5),
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
    sliderPagination: {
      alignItems: 'center',
      bottom: vw(5),
      left: 0,
      right: 0,
      margin: 'auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    sliderPaginationDot: {
      backgroundColor: colors.TEXT,
      borderRadius: 0,
      height: 5,
      marginLeft: vw(1),
      marginRight: vw(1),
      width: vw(12),
    },
    sliderPaginationDotActive: {
      backgroundColor: COLOR_PRIMARY,
    },
    view: {
      alignItems: 'center',
      backgroundColor: colors.BACKGROUND,
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
    viewSlide: {
      justifyContent: 'space-between',
      padding: vw(5),
      paddingBottom: vw(15),
    },
  });
};

const slider = React.createRef();

const Welcome = ({
  activateNotifications,
  colors,
  colorScheme,
  finish,
  importContacts,
  navigation,
  vw,
  fontFamilyBold,
  fontFamilyRegular,
  __,
}) => {
  const slides = [
    {
      animation:
        colorScheme === 'dark'
          ? require('../../../assets/animations/why_dark.json')
          : require('../../../assets/animations/why.json'),
      headline: __('welcome-screen.slides.intro.headline'),
      text: __('welcome-screen.slides.intro.text'),
      buttonText: __('welcome-screen.slides.intro.button'),
      key: 'welcome-slide-0',
    },
    {
      animation:
        colorScheme === 'dark'
          ? require('../../../assets/animations/what_dark.json')
          : require('../../../assets/animations/what.json'),
      headline: __('welcome-screen.slides.how-to.headline'),
      text: __('welcome-screen.slides.how-to.text'),
      buttonText: __('welcome-screen.slides.how-to.button'),
      key: 'welcome-slide-1',
    },
    {
      animation:
        colorScheme === 'dark'
          ? require('../../../assets/animations/wash_dark.json')
          : require('../../../assets/animations/wash.json'),
      headline: __('welcome-screen.slides.notifications.headline'),
      text: __('welcome-screen.slides.notifications.text'),
      buttonSkipText: __('welcome-screen.slides.notifications.button-skip'),
      buttonText: __('welcome-screen.slides.notifications.button'),
      key: 'welcome-slide-2',
      requestPushNotificationsPermissions: true,
    },
    {
      animation:
        colorScheme === 'dark'
          ? require('../../../assets/animations/import-contacts_dark.json')
          : require('../../../assets/animations/import-contacts.json'),
      headline: __('welcome-screen.slides.import-contacts.headline'),
      text: __('welcome-screen.slides.import-contacts.text'),
      buttonSkipText: __('welcome-screen.slides.import-contacts.button-skip'),
      buttonText: __('welcome-screen.slides.import-contacts.button'),
      key: 'welcome-slide-3',
      requestContactsPermissions: true,
    },
    {
      animation:
        colorScheme === 'dark'
          ? require('../../../assets/animations/how_dark.json')
          : require('../../../assets/animations/how.json'),
      headline: __('welcome-screen.slides.local-data.headline'),
      text: __('welcome-screen.slides.local-data.text'),
      buttonText: __('welcome-screen.slides.local-data.button'),
      key: 'welcome-slide-4',
    },
  ];

  const styles = getWelcomeStyles(vw, colors, fontFamilyBold, fontFamilyRegular);

  const next = (index) => {
    const nextSlide = index + 1;
    const isFinished = nextSlide === slides.length;

    if (!isFinished) {
      slider.current.goToSlide(nextSlide);
    } else {
      finish(navigation);
    }
  };

  const requestContacts = (index) => {
    importContacts(__, () => {
      next(index);
    });
  };

  const requestPushPermissions = (index) => {
    activateNotifications(__, () => {
      next(index);
    });
  };

  return (
    <Layout backgroundColor={colors.BACKGROUND}>
      <View style={styles.view}>
        <AppIntroSlider
          data={slides}
          ref={slider}
          renderItem={({
            item: {
              animation,
              headline,
              text,
              buttonSkipText,
              buttonText,
              key,
              requestContactsPermissions,
              requestPushNotificationsPermissions,
            },
            index,
          }) => {
            const onPressNext = () => {
              if (requestContactsPermissions) {
                requestContacts(index);
              } else if (requestPushNotificationsPermissions) {
                requestPushPermissions(index);
              } else {
                next(index);
              }
            };

            return (
              <View key={key} style={{ ...styles.view, ...styles.viewSlide }}>
                <LottieView autoPlay loop source={animation} style={styles.animation} />
                <Text style={styles.headline}>{headline}</Text>
                <Text style={styles.text}>{text}</Text>
                <TouchableOpacity onPress={onPressNext}>
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
