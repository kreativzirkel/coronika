import React, { memo } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import CollapsibleBox from './CollapsibleBox';
import moment from 'moment';

const Tip = ({
  headline,
  lastUpdated,
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

      <View style={{ ...styles.viewContent, ...styles.viewContentList }}>
        {stepsIntroText && <Text style={styles.contentText}>{stepsIntroText}</Text>}

        {steps &&
          steps.map((stepText, index) => (
            <View key={`tip-list-item-${index}`} style={styles.listItem}>
              <View style={styles.listItemNumber}>
                <Text style={styles.listItemNumberText}>{index + 1}</Text>
              </View>

              <Text style={styles.listItemText}>{stepText}</Text>
            </View>
          ))}
      </View>

      <CollapsibleBox headline={__('tips.sources.headline')} style={styles.viewSources}>
        {sources &&
          sources.map(({ text, url }, index) => (
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
    </View>
  );
};

export default memo(withI18n(withViewportUnits(Tip)));
