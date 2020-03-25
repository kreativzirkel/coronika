import PushNotificationIOS from '@react-native-community/push-notification-ios';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import withViewportUnits from '../../../utils/withViewportUnits';
import {
  disableNotificationDiary,
  disableNotificationDisinfectPhone,
  disableNotificationWashingHands,
  enableNotificationDiary,
  enableNotificationDisinfectPhone,
  enableNotificationWashingHandsOption1,
  enableNotificationWashingHandsOption2,
} from './actions';
import Screen from './ui';
import { Platform } from 'react-native';

const NOTIFICATION_KEY = {
  DIARY: 'coronika.notification.diary.daily',
  DISINFECT_SMARTPHONE: 'coronika.notification.disinfect-smartphone.daily',
  WASHING_HANDS: 'coronika.notification.washing-hands',
  WASHING_HANDS_OPTION_1: 'coronika.notification.washing-hands.option-1',
  WASHING_HANDS_OPTION_2: 'coronika.notification.washing-hands.option-2',
};

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
          case NOTIFICATION_KEY.WASHING_HANDS:
            navigation.navigate('TipWashingHands');
            break;
        }
      }

      PushNotification.clearAllNotifications();

      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    popInitialNotification: false,
    requestPermissions,
  });
};

const setDefaultNotifications = (__, cb) => async (dispatch, getState) => {
  let {
    settings: {
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
    },
  } = getState();

  if (
    !notificationDiaryEnabled &&
    !notificationDisinfectSmartphoneEnabled &&
    !notificationWashingHandsOption1Enabled &&
    !notificationWashingHandsOption2Enabled
  ) {
    dispatch(enableNotificationDiary());
    notificationDiaryEnabled = true;
    dispatch(enableNotificationDisinfectPhone());
    notificationDisinfectSmartphoneEnabled = true;
    dispatch(enableNotificationWashingHandsOption1());
    notificationWashingHandsOption1Enabled = true;
  }

  setupNotifications(
    {
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
    },
    __,
    cb
  );
};

export const activateDefaultNotifications = (__, cb) => async (dispatch, getState) => {
  if (Platform.OS === 'ios') {
    PushNotification.requestPermissions().then((grant) => {
      if (Platform.OS === 'ios' && !grant.alert && !grant.badge && !grant.sound) {
        if (cb) {
          cb();
        }

        return;
      }

      dispatch(setDefaultNotifications(__, cb));
    });
  } else {
    dispatch(setDefaultNotifications(__, cb));
  }
};

const getDailyNotificationTimestamp = (hours, minutes = 0) => {
  const timestamp = moment()
    .hours(hours)
    .minutes(minutes)
    .seconds(0)
    .milliseconds(0);

  if (timestamp.valueOf() < moment().valueOf()) {
    timestamp.add(1, 'day');
  }

  return timestamp.valueOf();
};

const setNotifications = (notifications, __, cb) => {
  PushNotification.cancelAllLocalNotifications();

  const {
    notificationDiaryEnabled,
    notificationDisinfectSmartphoneEnabled,
    notificationWashingHandsOption1Enabled,
    notificationWashingHandsOption2Enabled,
  } = notifications;

  const defaultNotificationOptions = {
    repeatType: 'day',
    smallIcon: 'ic_launcher',
    visibility: 'public',
  };

  if (notificationDiaryEnabled) {
    const tag = NOTIFICATION_KEY.DIARY;
    const timestamp = getDailyNotificationTimestamp(19, 30);
    PushNotification.localNotificationSchedule({
      ...defaultNotificationOptions,
      title: __('notifications.diary.headline'),
      message: __('notifications.diary.text'),
      date: new Date(timestamp),
      tag,
      userInfo: { tag },
    });
  }

  if (notificationDisinfectSmartphoneEnabled) {
    const tag = NOTIFICATION_KEY.DISINFECT_SMARTPHONE;
    const timestamp = getDailyNotificationTimestamp(14, 43);
    PushNotification.localNotificationSchedule({
      ...defaultNotificationOptions,
      title: __('notifications.desinfect-smartphone.variant-1.headline'),
      message: __('notifications.desinfect-smartphone.variant-1.text'),
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
        ...defaultNotificationOptions,
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
        ...defaultNotificationOptions,
        title,
        message,
        date: new Date(timestamp),
        tag,
        userInfo: { tag },
      });
    });
  }

  if (cb) {
    cb();
  }
};

const setupNotifications = (notifications, __, cb) => {
  if (Platform.OS === 'ios') {
    PushNotification.requestPermissions().then((grant) => {
      if (Platform.OS === 'ios' && !grant.alert && !grant.badge && !grant.sound) {
        if (cb) {
          cb();
        }

        return;
      }

      setNotifications(notifications, __, cb);
    });
  } else {
    setNotifications(notifications, __, cb);
  }
};

const activateNotification = (notificationKey, __) => async (dispatch, getState) => {
  let {
    settings: {
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
    },
  } = getState();

  switch (notificationKey) {
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
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
    },
    __
  );
};

const deactivateNotification = (notificationKey, __) => async (dispatch, getState) => {
  let {
    settings: {
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
    },
  } = getState();

  switch (notificationKey) {
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
      notificationDiaryEnabled,
      notificationDisinfectSmartphoneEnabled,
      notificationWashingHandsOption1Enabled,
      notificationWashingHandsOption2Enabled,
    },
    __
  );
};

const mapStateToProps = ({
  settings: {
    notificationDiaryEnabled,
    notificationDisinfectSmartphoneEnabled,
    notificationWashingHandsOption1Enabled,
    notificationWashingHandsOption2Enabled,
  },
}) => {
  return {
    notificationDiaryEnabled,
    notificationDisinfectSmartphoneEnabled,
    notificationWashingHandsOption1Enabled,
    notificationWashingHandsOption2Enabled,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    disableNotificationDiary: (__) => dispatch(deactivateNotification(NOTIFICATION_KEY.DIARY, __)),
    disableNotificationDisinfectSmartphone: (__) =>
      dispatch(deactivateNotification(NOTIFICATION_KEY.DISINFECT_SMARTPHONE, __)),
    disableNotificationWashingHands: (__) => dispatch(deactivateNotification(NOTIFICATION_KEY.WASHING_HANDS, __)),
    enableNotificationDiary: (__) => dispatch(activateNotification(NOTIFICATION_KEY.DIARY, __)),
    enableNotificationDisinfectSmartphone: (__) =>
      dispatch(activateNotification(NOTIFICATION_KEY.DISINFECT_SMARTPHONE, __)),
    enableNotificationWashingHandsOption1: (__) =>
      dispatch(activateNotification(NOTIFICATION_KEY.WASHING_HANDS_OPTION_1, __)),
    enableNotificationWashingHandsOption2: (__) =>
      dispatch(activateNotification(NOTIFICATION_KEY.WASHING_HANDS_OPTION_2, __)),
  };
};

const Container = container(Screen, {
  componentDidMount() {},
});

const Settings = withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Container)));

export default Settings;
