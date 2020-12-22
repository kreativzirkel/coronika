import UilClock from '@iconscout/react-native-unicons/icons/uil-clock';
import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import UilStopwatch from '@iconscout/react-native-unicons/icons/uil-stopwatch';
import UilWind from '@iconscout/react-native-unicons/icons/uil-wind';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { COLOR_PRIMARY } from '../../../constants';
import { HeaderBack } from '../../widgets/Header';
import UilInfoCircle from '@iconscout/react-native-unicons/icons/uil-info-circle';
import Layout from '../../widgets/Layout';
import ModalHint from './ModalHint';
import ButtonSwitch from '../../widgets/ButtonSwitch';

class VentilationMode extends React.Component {
  constructor(props) {
    super(props);

    let remainingTime = this.props.duration;
    const now = moment().valueOf();
    const nextTimestamps = this.props.timestamps.filter((t) => t >= now);
    if (nextTimestamps.length > 0) {
      const nextTimestamp = Math.min(...nextTimestamps);
      remainingTime = (nextTimestamp - now) / 1000;
    }

    this.state = {
      countdownKey: Date.now(),
      hours: this.props.hours,
      remainingTime: remainingTime,
    };

    this.decreaseHours = this.decreaseHours.bind(this);
    this.increaseHours = this.increaseHours.bind(this);
    this.onCountdownComplete = this.onCountdownComplete.bind(this);
    this.onPressDurationSwitch = this.onPressDurationSwitch.bind(this);
    this.startVentilationMode = this.startVentilationMode.bind(this);
    this.stopVentilationMode = this.stopVentilationMode.bind(this);
    this.toggleVentilationMode = this.toggleVentilationMode.bind(this);
  }

  componentWillUnmount() {
    this.props.setHours(this.state.hours);
  }

  styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: COLOR_PRIMARY,
      borderRadius: this.props.vw(2.3),
      flexDirection: 'row',
      justifyContent: 'center',
      padding: this.props.vw(3.5),
    },
    buttonText: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(5),
      textTransform: 'lowercase',
    },
    controlsWrapper: {},
    countdownWrapper: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    countdownInnerWrapper: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    countdownInnerText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(7),
      marginTop: this.props.vw(2.5),
      textTransform: 'lowercase',
    },
    headerWrapper: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
    },
    headerComponentWrapper: {
      width: this.props.vw(90),
    },
    headerIconWrapper: {
      alignItems: 'center',
      height: this.props.vw(12),
      justifyContent: 'center',
      marginTop: -this.props.vw(1.5),
      width: this.props.vw(8),
    },
    controlWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: this.props.vw(5),
    },
    controlIconWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: this.props.vw(2.3),
      marginRight: this.props.vw(4.6),
      width: this.props.vw(8),
    },
    hoursInputWrapper: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      height: this.props.vw(12),
      overflow: 'hidden',
    },
    hoursInputButton: {
      alignItems: 'center',
      borderRadius: this.props.vw(2.3),
      borderWidth: this.props.vw(0.5),
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'center',
      width: this.props.vw(12),
    },
    hoursInputText: {
      flex: 1,
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.4),
      textAlign: 'center',
      textTransform: 'lowercase',
    },
    hoursInputTextWrapper: {
      alignItems: 'center',
      borderColor: COLOR_PRIMARY,
      borderRadius: this.props.vw(2.3),
      borderWidth: this.props.vw(0.5),
      flex: 1,
      flexDirection: 'row',
      height: '100%',
      marginLeft: this.props.vw(2.3),
      marginRight: this.props.vw(2.3),
    },
    ventilationModeWrapper: {
      flex: 1,
      flexDirection: 'column',
      padding: this.props.vw(2.3),
      width: '100%',
    },
  });

  decreaseHours() {
    const { hours } = this.state;
    let hoursNew = hours - 1;

    if (hoursNew < 1) {
      hoursNew = 1;
    }

    this.setState({ hours: hoursNew });
  }

  increaseHours() {
    const { hours } = this.state;
    let hoursNew = hours + 1;

    if (hoursNew > 23) {
      hoursNew = 23;
    }

    this.setState({ hours: hoursNew });
  }

  onCountdownComplete() {
    const now = moment().valueOf();
    const nextTimestamp = this.props.timestamps.find((t) => t >= now);
    if (nextTimestamp) {
      this.setState({ remainingTime: this.props.duration });

      return [true, 0];
    }

    this.stopVentilationMode();

    return [false, 0];
  }

  onPressDurationSwitch(value) {
    if (value === false) {
      this.props.setDuration(1800);
      this.setState({ countdownKey: Date.now(), remainingTime: 1800 });
    } else if (value === true) {
      this.props.setDuration(900);
      this.setState({ countdownKey: Date.now(), remainingTime: 900 });
    }
  }

  startVentilationMode() {
    const { hours } = this.state;
    const timestamps = [];
    const now = moment().valueOf();
    const multiplier = 3600 / this.props.duration;
    for (let i = 1; i <= hours * multiplier; i++) {
      timestamps.push(now + this.props.duration * i * 1000);
    }
    this.props.start(timestamps, this.props.__);
  }

  stopVentilationMode() {
    this.props.stop(this.props.__);
    this.setState({ countdownKey: Date.now(), remainingTime: this.props.duration });
  }

  toggleVentilationMode() {
    if (this.props.enabled) {
      this.stopVentilationMode();
    } else {
      this.startVentilationMode();
    }
  }

  render() {
    const {
      colors,
      colorScheme,
      duration,
      enabled,
      modalHintsVisible,
      hideModalHints,
      showModalHints,
      formatTimeDistance,
      navigation,
      vw,
      __,
    } = this.props;
    const { countdownKey, hours, remainingTime } = this.state;

    const colorActive = colors.TEXT;
    const colorInactive = colorScheme === 'dark' ? colors.GRAY_2 : colors.GRAY_4;

    const styles = {
      ...this.styles,
      button: {
        ...this.styles.button,
        backgroundColor: enabled ? colors.SECONDARY : COLOR_PRIMARY,
      },
      buttonText: {
        ...this.styles.buttonText,
        color: enabled ? colors.TEXT : colors.TEXT_ALT,
      },
      countdownInnerText: {
        ...this.styles.countdownInnerText,
        color: colors.TEXT,
      },
      hoursInputButton: {
        ...this.styles.hoursInputButton,
        backgroundColor: enabled ? colors.BACKGROUND : colors.SECONDARY,
        borderColor: enabled ? colorInactive : COLOR_PRIMARY,
      },
      hoursInputText: {
        ...this.styles.hoursInputText,
        color: enabled ? colorInactive : colors.TEXT,
      },
      hoursInputTextWrapper: {
        ...this.styles.hoursInputTextWrapper,
        borderColor: enabled ? colorInactive : COLOR_PRIMARY,
      },
      ventilationModeWrapper: {
        ...this.styles.ventilationModeWrapper,
        backgroundColor: colors.BACKGROUND,
      },
    };

    const hoursDifferenceStart = moment().hours(0).minutes(0).seconds(0).milliseconds(0).valueOf();
    const hoursDifferenceEnd = moment(hoursDifferenceStart).hours(hours).valueOf();

    return (
      <Layout>
        <View style={styles.headerWrapper}>
          <View style={styles.headerComponentWrapper}>
            <HeaderBack headline={__('ventilation-mode-screen.header.headline')} navigation={navigation} />
          </View>
          <TouchableOpacity onPress={showModalHints} style={styles.headerIconWrapper}>
            <UilInfoCircle color={colors.TEXT} size={vw(6.5)} />
          </TouchableOpacity>
        </View>

        <View style={styles.ventilationModeWrapper}>
          <View style={styles.countdownWrapper}>
            <CountdownCircleTimer
              colors={enabled ? COLOR_PRIMARY : colors.SECONDARY}
              duration={duration}
              initialRemainingTime={remainingTime}
              isPlaying={enabled}
              key={countdownKey}
              onComplete={this.onCountdownComplete}
              size={vw(75)}
              strokeLinecap={'square'}
              strokeWidth={vw(2.3)}
              trailColor={colors.SECONDARY}>
              {({ remainingTime: remainingTimeCountdown }) => {
                const minutes = Math.trunc(remainingTimeCountdown / 60);
                const seconds = remainingTimeCountdown % 60;
                const time = moment().minutes(minutes).seconds(seconds).milliseconds(0).format('mm:ss');

                return (
                  <View style={styles.countdownInnerWrapper}>
                    <UilWind color={enabled ? colors.TEXT : colors.SECONDARY} size={vw(14)} />
                    <Text style={styles.countdownInnerText}>{__('ventilation-mode-screen.timer.text')}</Text>
                    <Text style={styles.countdownInnerText}>{time}</Text>
                  </View>
                );
              }}
            </CountdownCircleTimer>
          </View>

          <View style={styles.controlsWrapper}>
            <View style={styles.controlWrapper}>
              <View style={styles.controlIconWrapper}>
                <UilStopwatch color={enabled ? colorInactive : colorActive} size={vw(8)} />
              </View>

              <ButtonSwitch
                activeState={duration === 900}
                disabled={enabled}
                labels={[
                  __('ventilation-mode-screen.duration.15-minutes'),
                  __('ventilation-mode-screen.duration.30-minutes'),
                ]}
                onPress={this.onPressDurationSwitch}
              />
            </View>

            <View style={styles.controlWrapper}>
              <View style={styles.controlIconWrapper}>
                <UilClock color={enabled ? colorInactive : colorActive} size={vw(7)} />
              </View>

              <View style={styles.hoursInputWrapper}>
                <TouchableOpacity disabled={enabled} onPress={this.decreaseHours} style={styles.hoursInputButton}>
                  <UilMinus color={enabled ? colorInactive : COLOR_PRIMARY} size={vw(7)} />
                </TouchableOpacity>

                <View style={styles.hoursInputTextWrapper}>
                  <Text numberOfLines={1} style={styles.hoursInputText}>
                    {formatTimeDistance(hoursDifferenceStart, hoursDifferenceEnd, true)}
                  </Text>
                </View>

                <TouchableOpacity disabled={enabled} onPress={this.increaseHours} style={styles.hoursInputButton}>
                  <UilPlus color={enabled ? colorInactive : COLOR_PRIMARY} size={vw(7)} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={this.toggleVentilationMode} style={styles.button}>
              <Text numberOfLines={1} style={styles.buttonText}>
                {enabled ? __('ventilation-mode-screen.button.stop') : __('ventilation-mode-screen.button.start')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ModalHint isVisible={modalHintsVisible} onPressClose={hideModalHints} />
      </Layout>
    );
  }
}

export default VentilationMode;
