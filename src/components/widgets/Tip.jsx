import React, { memo } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import CollapsibleBox from './CollapsibleBox';
import moment from 'moment';

const Tip = ({
  headline,
  lastUpdated,
  links,
  sources,
  steps,
  stepsIntroText,
  texts,
  vw,
  getFontFamilyBold,
  getFontFamilyRegular,
  __,
}) => {
  const styles = StyleSheet.create({
    contentHeadline: {
      fontFamily: getFontFamilyBold(),
      fontSize: vw(7),
      marginBottom: vw(3),
    },
    contentText: {
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(4.5),
      lineHeight: vw(7),
    },
    contentTextParagraph: {
      marginTop: vw(3),
    },
    listItem: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginTop: vw(4),
      width: vw(70),
    },
    listItemNumber: {
      alignItems: 'center',
      backgroundColor: COLOR_PRIMARY,
      borderRadius: 50,
      height: vw(10),
      justifyContent: 'center',
      marginRight: vw(6),
      width: vw(10),
    },
    listItemNumberText: {
      color: '#ffffff',
      fontFamily: getFontFamilyBold(),
      fontSize: vw(4),
    },
    listItemText: {
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(4.5),
      lineHeight: vw(7),
      marginTop: vw(2),
    },
    scrollView: {
      backgroundColor: '#ffffff',
      height: '100%',
    },
    view: {
      backgroundColor: '#ffffff',
      flex: 1,
      flexDirection: 'column',
      padding: vw(8),
      width: '100%',
    },
    viewContent: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
    },
    viewContentList: {
      alignItems: 'flex-start',
      marginTop: vw(4),
    },
    viewLinksText: {
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(4.5),
      lineHeight: vw(7),
      textDecorationLine: 'underline',
    },
    viewLinksButton: {
      marginTop: vw(3),
    },
    viewSources: {
      marginTop: vw(14),
    },
    viewSourcesText: {
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(3.5),
      lineHeight: vw(5.5),
      textDecorationLine: 'underline',
    },
    viewSourcesButton: {
      marginTop: vw(2),
    },
    viewSourcesLastUpdated: {
      color: COLOR_PRIMARY,
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(3.5),
      lineHeight: vw(5.5),
      marginTop: vw(2.5),
    },
  });

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
                onPress={() => Linking.openURL(url).catch(() => {})}
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
                onPress={() => Linking.openURL(url).catch(() => {})}
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
};

export default memo(withI18n(withViewportUnits(Tip)));
