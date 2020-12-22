import UilEditAlt from '@iconscout/react-native-unicons/icons/uil-edit-alt';
import UilGift from '@iconscout/react-native-unicons/icons/uil-gift';
import UilWind from '@iconscout/react-native-unicons/icons/uil-wind';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';
import withI18n from '../../i18n';

class WhatsNew extends React.Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    hintWrapper: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginBottom: this.props.vw(5),
    },
    hintIcon: {
      marginRight: this.props.vw(3),
    },
    hintText: {
      flex: 1,
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.4),
    },
    wrapper: {
      flexDirection: 'column',
      width: '100%',
    },
  });

  render() {
    const { colors, vw, __ } = this.props;

    const styles = {
      ...this.styles,
      hintText: {
        ...this.styles.hintText,
        color: colors.TEXT,
      },
    };

    const iconSize = vw(9);

    return (
      <View style={styles.wrapper}>
        <View style={styles.hintWrapper}>
          <UilWind color={COLOR_PRIMARY} size={iconSize} style={styles.hintIcon} />
          <Text style={styles.hintText}>{__('whats-new.ventilation-mode.text')}</Text>
        </View>

        <View style={styles.hintWrapper}>
          <UilEditAlt color={COLOR_PRIMARY} size={iconSize} style={styles.hintIcon} />
          <Text style={styles.hintText}>{__('whats-new.encounters.text')}</Text>
        </View>

        <View style={styles.hintWrapper}>
          <UilGift color={COLOR_PRIMARY} size={iconSize} style={styles.hintIcon} />
          <Text style={styles.hintText}>{__('whats-new.christmas.text')}</Text>
        </View>
      </View>
    );
  }
}

export default withColorScheme(withI18n(withViewportUnits(WhatsNew)));
