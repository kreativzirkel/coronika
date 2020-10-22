import { CommonActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';
import Layout from '../widgets/Layout';
import { HeaderBack } from '../widgets/Header';
import { getWelcomeStyles } from './Welcome/ui';

const slider = React.createRef();

const About = ({ colors, colorScheme, navigation, vw, fontFamilyBold, fontFamilyRegular, __ }) => {
  const slides = [
    {
      animation:
        colorScheme === 'dark'
          ? require('../../assets/animations/why_dark.json')
          : require('../../assets/animations/why.json'),
      headline: __('welcome-screen.slides.intro.headline'),
      text: __('welcome-screen.slides.intro.text'),
      buttonText: __('welcome-screen.slides.intro.button'),
      key: 'welcome-slide-0',
    },
    {
      animation:
        colorScheme === 'dark'
          ? require('../../assets/animations/what_dark.json')
          : require('../../assets/animations/what.json'),
      headline: __('welcome-screen.slides.how-to.headline'),
      text: __('welcome-screen.slides.how-to.text'),
      buttonText: __('welcome-screen.slides.how-to.button'),
      key: 'welcome-slide-1',
    },
    {
      animation:
        colorScheme === 'dark'
          ? require('../../assets/animations/how_dark.json')
          : require('../../assets/animations/how.json'),
      headline: __('welcome-screen.slides.local-data.headline'),
      text: __('welcome-screen.slides.local-data.text'),
      buttonText: __('welcome-screen.slides.local-data.button'),
      key: 'welcome-slide-2',
    },
  ];

  const styles = getWelcomeStyles(vw, colors, fontFamilyBold, fontFamilyRegular);

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
    <Layout>
      <HeaderBack headline={__('about-screen.header.headline')} navigation={navigation} />

      <View style={styles.view}>
        <AppIntroSlider
          data={slides}
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

export default withColorScheme(withI18n(withViewportUnits(About)));
