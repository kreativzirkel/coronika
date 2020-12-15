import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';

class BjoernSteigerFoundation extends React.Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    contentHeadline: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(6),
      marginBottom: this.props.vw(3),
    },
    contentText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.2),
      lineHeight: this.props.vw(6.5),
    },
    contentTextParagraph: {
      marginTop: this.props.vw(3),
    },
    linkButton: {
      marginTop: this.props.vw(6),
    },
    linkButtonText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.2),
      lineHeight: this.props.vw(6.5),
      textDecorationLine: 'underline',
    },
    scrollView: {
      height: '100%',
    },
    view: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
    },
    viewContent: {
      flex: 1,
      flexDirection: 'column',
      padding: this.props.vw(8),
      width: '100%',
    },
  });

  openFoundationWebsite() {
    Linking.openURL('https://www.steiger-stiftung.de/').catch(() => {});
  }

  render() {
    const { colors, navigation, __ } = this.props;

    const styles = {
      ...this.styles,
      contentHeadline: {
        ...this.styles.contentHeadline,
        color: colors.TEXT,
      },
      contentText: {
        ...this.styles.contentText,
        color: colors.TEXT,
      },
      linkButtonText: {
        ...this.styles.linkButtonText,
        color: colors.TEXT,
      },
      view: {
        ...this.styles.view,
        backgroundColor: colors.BACKGROUND,
      },
    };

    return (
      <Layout>
        <HeaderBack headline={__('bjoern-steiger-stiftung-screen.header.headline')} navigation={navigation} />

        <View style={styles.view}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.viewContent}>
              <Text style={styles.contentText}>{__('bjoern-steiger-stiftung-screen.content.text')}</Text>

              <TouchableOpacity onPress={this.openFoundationWebsite} style={styles.linkButton}>
                <Text style={styles.linkButtonText}>{'www.steiger-stiftung.de'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Layout>
    );
  }
}

export default withColorScheme(withI18n(withViewportUnits(BjoernSteigerFoundation)));
