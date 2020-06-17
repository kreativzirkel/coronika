import React from 'react';
import { Appearance } from 'react-native';
import DateTimePickerModalBase from 'react-native-modal-datetime-picker';

const DateTimePickerModal = (props) => {
  const isDarkMode = Appearance.getColorScheme() === 'dark';

  /* eslint-disable-next-line react/jsx-props-no-spreading */
  return <DateTimePickerModalBase {...{ ...props, isDarkModeEnabled: isDarkMode }} />;
};

export default DateTimePickerModal;
