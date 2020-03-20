import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../../constants';
import Layout from '../../widgets/Layout';
import { HeaderBack } from '../../widgets/Header';
import Toggle from '../../widgets/Toggle';

const Settings = ({ navigation, vw, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    contentText: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.5),
      lineHeight: vw(7),
    },
    contentTextHeadline: {
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(5.5),
      lineHeight: vw(7),
      marginBottom: vw(1),
      textTransform: 'lowercase',
    },
    headline: {
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(7),
      marginBottom: vw(4),
      textTransform: 'lowercase',
    },
    setting: {
      alignItems: 'center',
      backgroundColor: COLOR_SECONDARY,
      borderRadius: vw(2.3),
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: vw(2.3),
      padding: vw(3),
      paddingBottom: vw(3.8),
      paddingTop: vw(3.8),
    },
    settingLabel: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.2),
      width: '85%',
    },
    settingToggle: {
      marginBottom: -vw(2.5),
      marginTop: -vw(2.5),
    },
    view: {
      backgroundColor: '#ffffff',
      flex: 1,
      flexDirection: 'column',
      width: '100%',
    },
    viewContent: {
      padding: vw(2.5),
    },
    viewSetting: {
      marginBottom: vw(8),
      width: '100%',
    },
  });

  const Setting = ({ active, label, onPress }) => (
    <View style={styles.setting}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Toggle active={active} onPress={() => onPress()} style={styles.settingToggle} />
    </View>
  );

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('settings-screen.header.headline')} navigation={navigation} />

      <View style={styles.view}>
        <ScrollView>
          <View style={styles.viewContent}>
            <Text style={styles.headline}>{__('settings-screen.notifications.headline')}</Text>

            <View style={styles.viewSetting}>
              <Text style={styles.contentTextHeadline}>
                {__('settings-screen.notifications.washing-hands.headline')}
              </Text>
              <Setting
                label={__('settings-screen.notifications.washing-hands.option-1.label')}
                onPress={() => console.log('test')}
              />
              <Setting
                label={__('settings-screen.notifications.washing-hands.option-2.label')}
                onPress={() => console.log('test')}
              />
            </View>

            <View style={styles.viewSetting}>
              <Text style={styles.contentTextHeadline}>
                {__('settings-screen.notifications.disinfect-smartphone.headline')}
              </Text>
              <Setting
                label={__('settings-screen.notifications.disinfect-smartphone.option.label')}
                onPress={() => console.log('test')}
              />
            </View>

            <View style={styles.viewSetting}>
              <Text style={styles.contentTextHeadline}>{__('settings-screen.notifications.diary.headline')}</Text>
              <Setting
                label={__('settings-screen.notifications.diary.option.label')}
                onPress={() => console.log('test')}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default Settings;
