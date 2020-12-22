import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import CollapsibleBox from '../../widgets/CollapsibleBox';
import ModalDefault from '../../widgets/ModalDefault';

class ModalHintClass extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.isVisible !== this.props.isVisible;
  }

  styles = StyleSheet.create({
    modalText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.4),
      marginBottom: this.props.vw(5),
      paddingLeft: this.props.vw(3),
      paddingRight: this.props.vw(3),
    },
    modalTextHeadline: {
      fontFamily: this.props.fontFamilyBold,
    },
    viewSources: {
      marginBottom: this.props.vw(6),
      marginLeft: this.props.vw(3),
      marginRight: this.props.vw(3),
    },
    viewSourcesText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(3.5),
      lineHeight: this.props.vw(5.5),
      textDecorationLine: 'underline',
    },
    viewSourcesButton: {
      marginTop: this.props.vw(2),
    },
  });

  openSource() {
    Linking.openURL(
      'https://www.infektionsschutz.de/coronavirus/alltag-in-zeiten-von-corona/regelmaessig-lueften.html'
    ).catch(() => {});
  }

  render() {
    const { colors, isVisible, onPressClose, __ } = this.props;

    const styles = {
      ...this.styles,
      modalText: {
        ...this.styles.modalText,
        color: colors.TEXT,
      },
      viewSourcesText: {
        ...this.styles.viewSourcesText,
        color: colors.TEXT,
      },
    };

    return (
      <ModalDefault
        buttonConfirmLabel={__('Close')}
        isVisible={isVisible}
        onPressClose={onPressClose}
        onPressConfirm={onPressClose}>
        <Text style={{ ...styles.modalText, ...styles.modalTextHeadline }}>
          {__('ventilation-mode-screen.modals.hints.content.headline')}
        </Text>

        <Text style={styles.modalText}>{__('ventilation-mode-screen.modals.hints.content.text')}</Text>

        <CollapsibleBox headline={__('tips.sources.headline')} style={styles.viewSources}>
          <TouchableOpacity onPress={this.openSource} style={styles.viewSourcesButton}>
            <Text style={styles.viewSourcesText}>{'infektionsschutz.de'}</Text>
          </TouchableOpacity>
        </CollapsibleBox>
      </ModalDefault>
    );
  }
}

export default withColorScheme(withI18n(withViewportUnits(ModalHintClass)));
