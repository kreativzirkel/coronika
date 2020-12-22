import PushNotificationIOS from '@react-native-community/push-notification-ios';
import moment from 'moment';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
import withI18n, { __ as __i18n } from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import {
  disableNotificationChristmas,
  disableNotificationDiary,
  disableNotificationDisinfectPhone,
  disableNotificationWashingHands,
  enableNotificationChristmas,
  enableNotificationDiary,
  enableNotificationDisinfectPhone,
  enableNotificationWashingHandsOption1,
  enableNotificationWashingHandsOption2,
} from './actions';
import Screen from './ui';

const NOTIFICATION_KEY = {
  CHRISTMAS: 'coronika.notification.christmas',
  DIARY: 'coronika.notification.diary.daily',
  DISINFECT_SMARTPHONE: 'coronika.notification.disinfect-smartphone.daily',
  VENTILATION_MODE: 'coronika.notification.ventilation-mode',
  WASHING_HANDS: 'coronika.notification.washing-hands',
  WASHING_HANDS_OPTION_1: 'coronika.notification.washing-hands.option-1',
  WASHING_HANDS_OPTION_2: 'coronika.notification.washing-hands.option-2',
};

let timeoutSetupNotifications;

export const configurePushNotifications = (navigation, requestPermissions = false) => async (dispatch, getState) => {
  PushNotification.configure({
    onNotification: (notification) => {
      // console.log('NOTIFICATION:', notification);

      const tag = notification?.data?.tag || notification?.tag || undefined;

      if (tag) {
        switch (tag) {
          case NOTIFICATION_KEY.DIARY:
            navigation.navigate('Dashboard');
            break;
          case NOTIFICATION_KEY.DISINFECT_SMARTPHONE:
            navigation.navigate('Tips');
            break;
          case NOTIFICATION_KEY.VENTILATION_MODE:
            navigation.navigate('VentilationMode');
            break;
          case NOTIFICATION_KEY.WASHING_HANDS:
            navigation.navigate('TipWashingHands');
            break;
        }
      }

      PushNotification.removeAllDeliveredNotifications();

      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    popInitialNotification: false,
    requestPermissions,
  });

  const {
    settings: {
      notificationChristmasEnabled,
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
    },
  } = getState();

  if (
    notificationChristmasEnabled === undefined &&
    (notificationDiaryEnabled ||
      notificationDisinfectSmartphoneEnabled ||
      notificationWashingHandsOption1Enabled ||
      notificationWashingHandsOption2Enabled)
  ) {
    dispatch(enableNotificationChristmas());
  }

  dispatch(resetNotifications(__i18n));
};

const setDefaultNotifications = (__, cb) => async (dispatch, getState) => {
  let {
    settings: {
      notificationChristmasEnabled,
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      /* eslint-disable-next-line prefer-const */
      notificationWashingHandsOption2Enabled,
    },
    /* eslint-disable-next-line prefer-const */
    ventilationMode: { timestamps: notificationVentilationModeTimestamps },
  } = getState();

  if (
    !notificationChristmasEnabled &&
    !notificationDiaryEnabled &&
    !notificationDisinfectSmartphoneEnabled &&
    !notificationWashingHandsOption1Enabled &&
    !notificationWashingHandsOption2Enabled
  ) {
    dispatch(enableNotificationChristmas());
    notificationChristmasEnabled = true;
    dispatch(enableNotificationDiary());
    notificationDiaryEnabled = true;
    dispatch(enableNotificationDisinfectPhone());
    notificationDisinfectSmartphoneEnabled = true;
    dispatch(enableNotificationWashingHandsOption1());
    notificationWashingHandsOption1Enabled = true;
  }

  setupNotifications(
    {
      notificationChristmasEnabled,
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
      notificationVentilationModeTimestamps,
    },
    __,
    cb,
    0
  );
};

export const updateVentilationModeNotifications = (notificationVentilationModeTimestamps, __) => async (
  dispatch,
  getState
) => {
  const {
    settings: {
      notificationChristmasEnabled,
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
    },
  } = getState();

  setupNotifications(
    {
      notificationChristmasEnabled,
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
      notificationVentilationModeTimestamps,
    },
    __
  );
};

export const activateDefaultNotifications = (__, cb) => async (dispatch) => {
  if (Platform.OS === 'ios') {
    PushNotification.requestPermissions().then((grant) => {
      if (Platform.OS === 'ios' && !grant.alert && !grant.badge && !grant.sound) {
        if (cb) cb();

        return;
      }

      dispatch(setDefaultNotifications(__, cb));
    });
  } else {
    dispatch(setDefaultNotifications(__, cb));
  }
};

const getDailyNotificationTimestamp = (hours, minutes = 0) => {
  const timestamp = moment().hours(hours).minutes(minutes).seconds(0).milliseconds(0);

  if (timestamp.valueOf() < moment().valueOf()) {
    timestamp.add(1, 'day');
  }

  return timestamp.valueOf();
};

const setNotifications = (notifications, __, cb) => {
  if (Platform.OS === 'android') {
    PushNotification.createChannel({
      channelId: 'coronika',
      channelName: 'Coronika Notifications',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    });
  }

  PushNotification.removeAllDeliveredNotifications();
  PushNotification.cancelAllLocalNotifications();

  const {
    notificationChristmasEnabled,
    notificationDiaryEnabled,
    notificationDisinfectSmartphoneEnabled,
    notificationWashingHandsOption1Enabled,
    notificationWashingHandsOption2Enabled,
    notificationVentilationModeTimestamps,
  } = notifications;

  const defaultNotificationOptions = {
    channelId: 'coronika',
    ignoreInForeground: false,
    smallIcon: 'ic_launcher',
    visibility: 'public',
  };
  const defaultNotificationOptionsDaily = {
    ...defaultNotificationOptions,
    repeatType: 'day',
  };

  if (notificationDiaryEnabled) {
    const tag = NOTIFICATION_KEY.DIARY;
    const timestamp = getDailyNotificationTimestamp(19, 30);
    PushNotification.localNotificationSchedule({
      ...defaultNotificationOptionsDaily,
      title: __('notifications.diary.headline'),
      message: __('notifications.diary.text'),
      date: new Date(timestamp),
      tag,
      userInfo: { tag },
    });
  }

  if (notificationDisinfectSmartphoneEnabled) {
    const tag = NOTIFICATION_KEY.DISINFECT_SMARTPHONE;
    const timestamp = getDailyNotificationTimestamp(17, 30);
    let title;
    let message;

    switch (Math.round(Math.random() * 3)) {
      case 1:
        title = __('notifications.disinfect-smartphone.variant-2.headline');
        message = __('notifications.disinfect-smartphone.variant-2.text');
        break;
      case 2:
        title = __('notifications.disinfect-smartphone.variant-3.headline');
        message = __('notifications.disinfect-smartphone.variant-3.text');
        break;
      default:
        title = __('notifications.disinfect-smartphone.variant-1.headline');
        message = __('notifications.disinfect-smartphone.variant-1.text');
    }
    PushNotification.localNotificationSchedule({
      ...defaultNotificationOptionsDaily,
      title,
      message,
      date: new Date(timestamp),
      tag,
      userInfo: { tag },
    });
  }

  if (notificationWashingHandsOption1Enabled) {
    const list = [
      {
        hours: 9,
        message: __('notifications.washing-hands.variant-1.text'),
        title: __('notifications.washing-hands.variant-1.headline'),
      },
      {
        hours: 15,
        message: __('notifications.washing-hands.variant-2.text'),
        title: __('notifications.washing-hands.variant-2.headline'),
      },
      {
        hours: 19,
        message: __('notifications.washing-hands.variant-3.text'),
        title: __('notifications.washing-hands.variant-3.headline'),
      },
    ];

    list.forEach(({ hours, message, title }) => {
      const tag = NOTIFICATION_KEY.WASHING_HANDS;
      const timestamp = getDailyNotificationTimestamp(hours);
      PushNotification.localNotificationSchedule({
        ...defaultNotificationOptionsDaily,
        title,
        message,
        date: new Date(timestamp),
        tag,
        userInfo: { tag },
      });
    });
  }

  if (notificationWashingHandsOption2Enabled) {
    const list = [
      {
        hours: 9,
        message: __('notifications.washing-hands.variant-1.text'),
        title: __('notifications.washing-hands.variant-1.headline'),
      },
      {
        hours: 11,
        message: __('notifications.washing-hands.variant-2.text'),
        title: __('notifications.washing-hands.variant-2.headline'),
      },
      {
        hours: 13,
        message: __('notifications.washing-hands.variant-3.text'),
        title: __('notifications.washing-hands.variant-3.headline'),
      },
      {
        hours: 15,
        message: __('notifications.washing-hands.variant-1.text'),
        title: __('notifications.washing-hands.variant-1.headline'),
      },
      {
        hours: 17,
        message: __('notifications.washing-hands.variant-2.text'),
        title: __('notifications.washing-hands.variant-2.headline'),
      },
      {
        hours: 19,
        message: __('notifications.washing-hands.variant-3.text'),
        title: __('notifications.washing-hands.variant-3.headline'),
      },
    ];

    list.forEach(({ hours, message, title }) => {
      const tag = NOTIFICATION_KEY.WASHING_HANDS;
      const timestamp = getDailyNotificationTimestamp(hours);
      PushNotification.localNotificationSchedule({
        ...defaultNotificationOptionsDaily,
        title,
        message,
        date: new Date(timestamp),
        tag,
        userInfo: { tag },
      });
    });
  }

  // enable christmas notifications if setting is true or if setting is undefined and any other notification setting is true
  if (
    notificationChristmasEnabled ||
    (notificationChristmasEnabled === undefined &&
      (notificationDiaryEnabled ||
        notificationDisinfectSmartphoneEnabled ||
        notificationWashingHandsOption1Enabled ||
        notificationWashingHandsOption2Enabled))
  ) {
    const list = [
      {
        timestamp: 1608249600, // 18.12.2020
        message: __('notifications.christmas.1218.text'),
      },
      {
        timestamp: 1608336000, // 19.12.2020
        message: __('notifications.christmas.1219.text'),
      },
      {
        timestamp: 1608422400, // 20.12.2020
        message: __('notifications.christmas.1220.text'),
      },
      {
        timestamp: 1608508800, // 21.12.2020
        message: __('notifications.christmas.1221.text'),
      },
      {
        timestamp: 1608595200, // 22.12.2020
        message: __('notifications.christmas.1222.text'),
      },
      {
        timestamp: 1608681600, // 23.12.2020
        message: __('notifications.christmas.1223.text'),
      },
      {
        timestamp: 1608768000, // 24.12.2020
        message: __('notifications.christmas.1224.text'),
      },
      {
        timestamp: 1608854400, // 25.12.2020
        message: __('notifications.christmas.1225.text'),
      },
      {
        timestamp: 1608940800, // 26.12.2020
        message: __('notifications.christmas.1226.text'),
      },
    ];

    list.forEach(({ message, timestamp }) => {
      const tag = NOTIFICATION_KEY.CHRISTMAS;
      const notificationTimestamp = moment.unix(timestamp).hours(12).minutes(0).seconds(0).milliseconds(0).valueOf();
      if (notificationTimestamp > moment().valueOf()) {
        PushNotification.localNotificationSchedule({
          ...defaultNotificationOptions,
          message,
          date: new Date(notificationTimestamp),
          tag,
          userInfo: { tag },
        });
      }
    });
  }

  if (notificationVentilationModeTimestamps.length > 0) {
    notificationVentilationModeTimestamps.forEach((timestamp) => {
      const tag = NOTIFICATION_KEY.VENTILATION_MODE;
      const message = __('notifications.ventilation-mode.ventilate.variant-1.text');
      if (timestamp >= moment().valueOf()) {
        PushNotification.localNotificationSchedule({
          ...defaultNotificationOptions,
          message,
          date: new Date(timestamp),
          tag,
          userInfo: { tag },
        });
      }
    });

    const lastTimestamp = Math.max(...notificationVentilationModeTimestamps);
    if (lastTimestamp >= moment().valueOf()) {
      const tag = NOTIFICATION_KEY.VENTILATION_MODE;
      const message = __('notifications.ventilation-mode.end');
      const timestamp = moment(lastTimestamp).add('5', 'seconds').valueOf();
      if (timestamp >= moment().valueOf()) {
        PushNotification.localNotificationSchedule({
          ...defaultNotificationOptions,
          message,
          date: new Date(timestamp),
          tag,
          userInfo: { tag },
        });
      }
    }
  }

  if (cb) {
    cb();
  }
};

const setupNotifications = (notifications, __, cb, timeout = 1000) => {
  if (timeoutSetupNotifications) clearTimeout(timeoutSetupNotifications);

  timeoutSetupNotifications = setTimeout(() => {
    if (Platform.OS === 'ios') {
      PushNotification.requestPermissions().then((grant) => {
        if (Platform.OS === 'ios' && !grant.alert && !grant.badge && !grant.sound) {
          if (cb) cb();

          return;
        }

        setNotifications(notifications, __, cb);
      });
    } else {
      setNotifications(notifications, __, cb);
    }
  }, timeout);
};

const resetNotifications = (__, cb) => async (dispatch, getState) => {
  const {
    settings: {
      notificationChristmasEnabled,
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
    },
    ventilationMode: { timestamps: notificationVentilationModeTimestamps },
  } = getState();

  if (
    notificationChristmasEnabled ||
    notificationDiaryEnabled ||
    notificationDisinfectSmartphoneEnabled ||
    notificationWashingHandsOption1Enabled ||
    notificationWashingHandsOption2Enabled ||
    notificationVentilationModeTimestamps.length > 0
  ) {
    setupNotifications(
      {
        notificationChristmasEnabled,
        notificationDiaryEnabled,
        notificationDisinfectSmartphoneEnabled,
        notificationWashingHandsOption1Enabled,
        notificationWashingHandsOption2Enabled,
        notificationVentilationModeTimestamps,
      },
      __,
      cb,
      0
    );
  }
};

const activateNotification = (notificationKey, __) => async (dispatch, getState) => {
  let {
    settings: {
      notificationChristmasEnabled,
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
    },
    /* eslint-disable-next-line prefer-const */
    ventilationMode: { timestamps: notificationVentilationModeTimestamps },
  } = getState();

  switch (notificationKey) {
    case NOTIFICATION_KEY.CHRISTMAS:
      dispatch(enableNotificationChristmas());
      notificationChristmasEnabled = true;
      break;
    case NOTIFICATION_KEY.DIARY:
      dispatch(enableNotificationDiary());
      notificationDiaryEnabled = true;
      break;
    case NOTIFICATION_KEY.DISINFECT_SMARTPHONE:
      dispatch(enableNotificationDisinfectPhone());
      notificationDisinfectSmartphoneEnabled = true;
      break;
    case NOTIFICATION_KEY.WASHING_HANDS_OPTION_1:
      dispatch(enableNotificationWashingHandsOption1());
      notificationWashingHandsOption1Enabled = true;
      break;
    case NOTIFICATION_KEY.WASHING_HANDS_OPTION_2:
      dispatch(enableNotificationWashingHandsOption2());
      notificationWashingHandsOption2Enabled = true;
      break;
  }

  setupNotifications(
    {
      notificationChristmasEnabled,
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
      notificationVentilationModeTimestamps,
    },
    __
  );
};

const deactivateNotification = (notificationKey, __) => async (dispatch, getState) => {
  let {
    settings: {
      notificationChristmasEnabled,
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
    },
    /* eslint-disable-next-line prefer-const */
    ventilationMode: { timestamps: notificationVentilationModeTimestamps },
  } = getState();

  switch (notificationKey) {
    case NOTIFICATION_KEY.CHRISTMAS:
      dispatch(disableNotificationChristmas());
      notificationChristmasEnabled = false;
      break;
    case NOTIFICATION_KEY.DIARY:
      dispatch(disableNotificationDiary());
      notificationDiaryEnabled = false;
      break;
    case NOTIFICATION_KEY.DISINFECT_SMARTPHONE:
      dispatch(disableNotificationDisinfectPhone());
      notificationDisinfectSmartphoneEnabled = false;
      break;
    case NOTIFICATION_KEY.WASHING_HANDS:
    case NOTIFICATION_KEY.WASHING_HANDS_OPTION_1:
    case NOTIFICATION_KEY.WASHING_HANDS_OPTION_2:
      dispatch(disableNotificationWashingHands());
      notificationWashingHandsOption1Enabled = false;
      notificationWashingHandsOption2Enabled = false;
      break;
  }

  setupNotifications(
    {
      notificationChristmasEnabled,
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
      notificationVentilationModeTimestamps,
    },
    __
  );
};

const mapStateToProps = ({
  settings: {
    notificationChristmasEnabled,
    notificationDiaryEnabled,
    notificationDisinfectSmartphoneEnabled,
    notificationWashingHandsOption1Enabled,
    notificationWashingHandsOption2Enabled,
  },
}) => {
  return {
    notificationChristmasEnabled,
    notificationDiaryEnabled,
    notificationDisinfectSmartphoneEnabled,
    notificationWashingHandsOption1Enabled,
    notificationWashingHandsOption2Enabled,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    disableNotificationChristmas: (__) => dispatch(deactivateNotification(NOTIFICATION_KEY.CHRISTMAS, __)),
    disableNotificationDiary: (__) => dispatch(deactivateNotification(NOTIFICATION_KEY.DIARY, __)),
    disableNotificationDisinfectSmartphone: (__) =>
      dispatch(deactivateNotification(NOTIFICATION_KEY.DISINFECT_SMARTPHONE, __)),
    disableNotificationWashingHands: (__) => dispatch(deactivateNotification(NOTIFICATION_KEY.WASHING_HANDS, __)),
    enableNotificationChristmas: (__) => dispatch(activateNotification(NOTIFICATION_KEY.CHRISTMAS, __)),
    enableNotificationDiary: (__) => dispatch(activateNotification(NOTIFICATION_KEY.DIARY, __)),
    enableNotificationDisinfectSmartphone: (__) =>
      dispatch(activateNotification(NOTIFICATION_KEY.DISINFECT_SMARTPHONE, __)),
    enableNotificationWashingHandsOption1: (__) =>
      dispatch(activateNotification(NOTIFICATION_KEY.WASHING_HANDS_OPTION_1, __)),
    enableNotificationWashingHandsOption2: (__) =>
      dispatch(activateNotification(NOTIFICATION_KEY.WASHING_HANDS_OPTION_2, __)),
  };
};

const Settings = withColorScheme(withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen))));

export default Settings;
