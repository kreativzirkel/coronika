import React from 'react';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import { COLOR_SECONDARY } from '../../constants';
import Header from '../widgets/Header';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import Layout from '../widgets/Layout';
import { CommonActions } from '@react-navigation/native';
import TabBar from '../widgets/TabBar';
import TabBarItem from '../widgets/TabBarItem';

const TABS = {
  IMPRINT: 0,
  LICENSES: 1,
  POLICY: 2,
};

class Legal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: TABS.POLICY,
    };
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab });
  }

  render() {
    const { navigation, vw, __ } = this.props;
    const { activeTab } = this.state;
    const goBack = () => navigation.dispatch(CommonActions.goBack());

    // noinspection JSUnresolvedFunction
    const styles = StyleSheet.create({
      contentText: {
        fontFamily: 'JetBrainsMono-Regular',
        fontSize: vw(4.5),
        lineHeight: vw(7),
      },
      contentTextHeadline: {
        fontFamily: 'JetBrainsMono-Bold',
        fontSize: vw(4.5),
        lineHeight: vw(7),
        marginBottom: vw(1),
        marginTop: vw(2),
      },
      header: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: Platform.OS === 'ios' ? 'space-between' : 'flex-end',
      },
      headerHeadline: {
        fontFamily: 'JetBrainsMono-Bold',
        fontSize: vw(5),
        marginLeft: 'auto',
        textTransform: 'lowercase',
      },
      view: {
        backgroundColor: '#ffffff',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
      },
      viewTabContent: {
        padding: vw(2.5),
      },
    });

    return (
      <Layout backgroundColor={COLOR_SECONDARY}>
        <Header>
          <View style={styles.header}>
            {Platform.OS === 'ios' && (
              <TouchableOpacity onPress={() => goBack()} style={{ marginBottom: -vw(3), marginTop: -vw(3) }}>
                <UilArrowLeft size={vw(12)} color={'#000000'} />
              </TouchableOpacity>
            )}

            <Text style={styles.headerHeadline}>{__('legal-screen.header.headline')}</Text>
          </View>
        </Header>

        <View style={styles.view}>
          <View style={{ backgroundColor: COLOR_SECONDARY }}>
            <TabBar>
              <TabBarItem
                active={activeTab === TABS.POLICY}
                label={__('legal-screen.tabs.privacy.label')}
                onPress={() => this.setActiveTab(TABS.POLICY)}
              />
              <TabBarItem
                active={activeTab === TABS.IMPRINT}
                label={__('legal-screen.tabs.imprint.label')}
                onPress={() => this.setActiveTab(TABS.IMPRINT)}
              />
            </TabBar>
          </View>

          <View style={{ flex: 1, width: '100%' }}>
            {activeTab === TABS.POLICY && (
              <ScrollView>
                <View style={styles.viewTabContent}>
                  <Text style={styles.contentTextHeadline}>{__('legal-screen.privacy.section-1.headline')}</Text>
                  <Text style={styles.contentText}>{__('legal-screen.privacy.section-1.text')}</Text>
                  <Text style={styles.contentTextHeadline}>{__('legal-screen.privacy.section-2.headline')}</Text>
                  <Text style={styles.contentText}>{__('legal-screen.privacy.section-2.text')}</Text>
                  <Text style={styles.contentTextHeadline}>{__('legal-screen.privacy.section-3.headline')}</Text>
                  <Text style={styles.contentText}>{__('legal-screen.privacy.section-3.text')}</Text>
                  <Text style={styles.contentTextHeadline}>{__('legal-screen.privacy.section-4.headline')}</Text>
                  <Text style={styles.contentText}>{__('legal-screen.privacy.section-4.text')}</Text>
                  <Text style={styles.contentTextHeadline}>{__('legal-screen.privacy.section-5.headline')}</Text>
                  <Text style={styles.contentText}>{__('legal-screen.privacy.section-5.text')}</Text>
                  <Text style={styles.contentTextHeadline}>{__('legal-screen.privacy.section-6.headline')}</Text>
                  <Text style={styles.contentText}>{__('legal-screen.privacy.section-6.text')}</Text>
                </View>
              </ScrollView>
            )}

            {activeTab === TABS.IMPRINT && (
              <ScrollView>
                <View style={styles.viewTabContent}>
                  <Text style={styles.contentTextHeadline}>{__('legal-screen.imprint.section-1.headline')}</Text>
                  <Text style={styles.contentText}>{__('legal-screen.imprint.section-1.text')}</Text>
                  <Text style={styles.contentTextHeadline}>{__('legal-screen.imprint.section-2.headline')}</Text>
                  <Text style={styles.contentText}>{__('legal-screen.imprint.section-2.text')}</Text>
                  <Text style={styles.contentTextHeadline}>{__('legal-screen.imprint.section-3.headline')}</Text>
                  <Text style={styles.contentText}>{__('legal-screen.imprint.section-3.text')}</Text>
                  <Text style={styles.contentTextHeadline}>{__('legal-screen.imprint.section-4.headline')}</Text>
                  <Text style={styles.contentText}>{__('legal-screen.imprint.section-4.text')}</Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Layout>
    );
  }
}

export default withI18n(withViewportUnits(Legal));
