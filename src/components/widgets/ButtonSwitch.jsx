import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';

class ButtonSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.activeState !== this.props.activeState || nextProps.disabled !== this.props.disabled;
  }

  styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      borderRadius: this.props.vw(2.3),
      borderWidth: this.props.vw(0.5),
      flex: 1,
      height: this.props.vw(12),
      justifyContent: 'center',
      padding: this.props.vw(2.3),
    },
    buttonActive: {
      borderColor: COLOR_PRIMARY,
    },
    buttonText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
      textAlign: 'center',
      textTransform: 'lowercase',
    },
    buttonTextActive: {
      //
    },
    buttonWrapper: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonSeparator: {
      width: this.props.vw(2.3),
    },
  });

  onPress(buttonValue) {
    if (!this.props.onPress) return;

    if (buttonValue === this.props.activeState) {
      this.props.onPress(undefined);
    } else {
      this.props.onPress(buttonValue);
    }
  }

  render() {
    const { activeState, colors, colorScheme, disabled, labels } = this.props;

    const styles = {
      ...this.styles,
      button: {
        ...this.styles.button,
        backgroundColor: colors.SECONDARY,
        borderColor: colors.SECONDARY,
      },
      buttonActive: {
        ...this.styles.buttonActive,
        backgroundColor: colors.BACKGROUND,
      },
      buttonDisabled: {
        backgroundColor: colors.BACKGROUND,
        borderColor: colors.BACKGROUND,
      },
      buttonDisabledActive: {
        borderColor: colorScheme === 'dark' ? colors.GRAY_2 : colors.GRAY_4,
      },
      buttonText: {
        ...this.styles.buttonText,
        color: colorScheme === 'dark' ? colors.GRAY_2 : colors.GRAY_4,
      },
      buttonTextDisabled: {
        color: colorScheme === 'dark' ? colors.GRAY_2 : colors.GRAY_4,
      },
      buttonTextActive: {
        ...this.styles.buttonTextActive,
        color: colors.TEXT,
      },
    };

    return (
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => this.onPress(true)}
          style={{
            ...styles.button,
            ...(activeState === true && styles.buttonActive),
            ...(disabled && styles.buttonDisabled),
            ...(disabled && activeState === true && styles.buttonDisabledActive),
          }}>
          <Text
            numberOfLines={1}
            style={{
              ...styles.buttonText,
              ...(activeState === true && styles.buttonTextActive),
              ...(disabled && styles.buttonTextDisabled),
            }}>
            {labels?.[0]}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonSeparator} />
        <TouchableOpacity
          disabled={disabled}
          onPress={() => this.onPress(false)}
          style={{
            ...styles.button,
            ...(activeState === false && styles.buttonActive),
            ...(disabled && styles.buttonDisabled),
            ...(disabled && activeState === false && styles.buttonDisabledActive),
          }}>
          <Text
            numberOfLines={1}
            style={{
              ...styles.buttonText,
              ...(activeState === false && styles.buttonTextActive),
              ...(disabled && styles.buttonTextDisabled),
            }}>
            {labels?.[1]}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withColorScheme(withI18n(withViewportUnits(ButtonSwitch)));
