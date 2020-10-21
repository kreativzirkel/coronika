import moment from 'moment';
import React, { memo } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import CollapsibleBox from './CollapsibleBox';

class Tip extends React.Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    contentHeadline: {
      fontFamily: this.props.getFontFamilyBold(),
      fontSize: this.props.vw(7),
      marginBottom: this.props.vw(3),
    },
    contentText: {
      fontFamily: this.props.getFontFamilyRegular(),
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
      color: '#ffffff',
      fontFamily: this.props.getFontFamilyBold(),
      fontSize: this.props.vw(4),
    },
    listItemText: {
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(4.5),
      lineHeight: this.props.vw(7),
      marginTop: this.props.vw(2),
    },
    scrollView: {
      backgroundColor: '#ffffff',
      height: '100%',
    },
    view: {
      backgroundColor: '#ffffff',
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
      fontFamily: this.props.getFontFamilyRegular(),
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
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(3.5),
      lineHeight: this.props.vw(5.5),
      textDecorationLine: 'underline',
    },
    viewSourcesButton: {
      marginTop: this.props.vw(2),
    },
    viewSourcesLastUpdated: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(3.5),
      lineHeight: this.props.vw(5.5),
      marginTop: this.props.vw(2.5),
    },
  });

  openUrl(url) {
    Linking.openURL(url).catch(() => {});
  }

  render() {
    const { headline, lastUpdated, links, sources, steps, stepsIntroText, texts, __ } = this.props;

    return (
      <ScrollView style={this.styles.scrollView}>
        <View style={this.styles.view}>
          <View style={this.styles.viewContent}>
            <Text style={this.styles.contentHeadline}>{headline}</Text>
            {texts &&
              texts.map((text, index) => (
                <Text
                  key={`tip-text-${index}`}
                  style={{ ...this.styles.contentText, ...(index > 0 && this.styles.contentTextParagraph) }}>
                  {text}
                </Text>
              ))}
          </View>

          {steps && (
            <View style={{ ...this.styles.viewContent, ...this.styles.viewContentList }}>
              {stepsIntroText && <Text style={this.styles.contentText}>{stepsIntroText}</Text>}

              {steps.map((stepText, index) => (
                <View key={`tip-list-item-${index}`} style={this.styles.listItem}>
                  <View style={this.styles.listItemNumber}>
                    <Text style={this.styles.listItemNumberText}>{index + 1}</Text>
                  </View>

                  <Text style={this.styles.listItemText}>{stepText}</Text>
                </View>
              ))}
            </View>
          )}

          {links && (
            <View style={{ ...this.styles.viewContent, ...this.styles.viewContentList }}>
              {links.map(({ text, url }, index) => (
                <TouchableOpacity
                  key={`tip-link-${index}`}
                  onPress={() => this.openUrl(url)}
                  style={this.styles.viewLinksButton}>
                  <Text style={this.styles.viewLinksText}>{text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {sources && (
            <CollapsibleBox headline={__('tips.sources.headline')} style={this.styles.viewSources}>
              {sources.map(({ text, url }, index) => (
                <TouchableOpacity
                  key={`tip-source-${index}`}
                  onPress={() => this.openUrl(url)}
                  style={this.styles.viewSourcesButton}>
                  <Text style={this.styles.viewSourcesText}>{text}</Text>
                </TouchableOpacity>
              ))}
              <Text style={this.styles.viewSourcesLastUpdated}>
                {`${__('tips.sources.last-updated')} ${moment(lastUpdated).format('L')}`}
              </Text>
            </CollapsibleBox>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default memo(withI18n(withViewportUnits(Tip)));
