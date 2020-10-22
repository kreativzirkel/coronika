import moment from 'moment';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';
import CollapsibleBox from './CollapsibleBox';

class Tip extends React.Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    contentHeadline: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(7),
      marginBottom: this.props.vw(3),
    },
    contentText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.5),
      lineHeight: this.props.vw(7),
    },
    contentTextParagraph: {
      marginTop: this.props.vw(3),
    },
    listItem: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginTop: this.props.vw(4),
      width: this.props.vw(70),
    },
    listItemNumber: {
      alignItems: 'center',
      backgroundColor: COLOR_PRIMARY,
      borderRadius: 50,
      height: this.props.vw(10),
      justifyContent: 'center',
      marginRight: this.props.vw(6),
      width: this.props.vw(10),
    },
    listItemNumberText: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(4),
    },
    listItemText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.5),
      lineHeight: this.props.vw(7),
      marginTop: this.props.vw(2),
    },
    scrollView: {
      height: '100%',
    },
    view: {
      flex: 1,
      flexDirection: 'column',
      padding: this.props.vw(8),
      width: '100%',
    },
    viewContent: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
    },
    viewContentList: {
      alignItems: 'flex-start',
      marginTop: this.props.vw(4),
    },
    viewLinksText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.5),
      lineHeight: this.props.vw(7),
      textDecorationLine: 'underline',
    },
    viewLinksButton: {
      marginTop: this.props.vw(3),
    },
    viewSources: {
      marginTop: this.props.vw(14),
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
    viewSourcesLastUpdated: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(3.5),
      lineHeight: this.props.vw(5.5),
      marginTop: this.props.vw(2.5),
    },
  });

  openUrl(url) {
    Linking.openURL(url).catch(() => {});
  }

  render() {
    const { colors, headline, lastUpdated, links, sources, steps, stepsIntroText, texts, __ } = this.props;

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
      listItemNumberText: {
        ...this.styles.listItemNumberText,
        color: colors.TEXT_ALT,
      },
      listItemText: {
        ...this.styles.listItemText,
        color: colors.TEXT,
      },
      scrollView: {
        ...this.styles.scrollView,
        backgroundColor: colors.BACKGROUND,
      },
      view: {
        ...this.styles.view,
        backgroundColor: colors.BACKGROUND,
      },
      viewLinksText: {
        ...this.styles.viewLinksText,
        color: colors.TEXT,
      },
      viewSourcesText: {
        ...this.styles.viewSourcesText,
        color: colors.TEXT,
      },
    };

    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.view}>
          <View style={styles.viewContent}>
            <Text style={styles.contentHeadline}>{headline}</Text>
            {texts &&
              texts.map((text, index) => (
                <Text
                  key={`tip-text-${index}`}
                  style={{ ...styles.contentText, ...(index > 0 && styles.contentTextParagraph) }}>
                  {text}
                </Text>
              ))}
          </View>

          {steps && (
            <View style={{ ...styles.viewContent, ...styles.viewContentList }}>
              {stepsIntroText && <Text style={styles.contentText}>{stepsIntroText}</Text>}

              {steps.map((stepText, index) => (
                <View key={`tip-list-item-${index}`} style={styles.listItem}>
                  <View style={styles.listItemNumber}>
                    <Text style={styles.listItemNumberText}>{index + 1}</Text>
                  </View>

                  <Text style={styles.listItemText}>{stepText}</Text>
                </View>
              ))}
            </View>
          )}

          {links && (
            <View style={{ ...styles.viewContent, ...styles.viewContentList }}>
              {links.map(({ text, url }, index) => (
                <TouchableOpacity
                  key={`tip-link-${index}`}
                  onPress={() => this.openUrl(url)}
                  style={styles.viewLinksButton}>
                  <Text style={styles.viewLinksText}>{text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {sources && (
            <CollapsibleBox headline={__('tips.sources.headline')} style={styles.viewSources}>
              {sources.map(({ text, url }, index) => (
                <TouchableOpacity
                  key={`tip-source-${index}`}
                  onPress={() => this.openUrl(url)}
                  style={styles.viewSourcesButton}>
                  <Text style={styles.viewSourcesText}>{text}</Text>
                </TouchableOpacity>
              ))}
              <Text style={styles.viewSourcesLastUpdated}>
                {`${__('tips.sources.last-updated')} ${moment(lastUpdated).format('L')}`}
              </Text>
            </CollapsibleBox>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default withColorScheme(withI18n(withViewportUnits(Tip)));
