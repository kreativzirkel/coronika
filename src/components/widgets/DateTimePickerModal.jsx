import React from 'react';
import { useDarkMode } from 'react-native-dark-mode';
import DateTimePickerModalBase from 'react-native-modal-datetime-picker';

const DateTimePickerModal = (props) => {
  const isDarkMode = useDarkMode();

  /* eslint-disable-next-line react/jsx-props-no-spreading */
  return <DateTimePickerModalBase {...{ ...props, isDarkModeEnabled: isDarkMode }} />;
};

export default DateTimePickerModal;
