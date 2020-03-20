import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';
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
        <HeaderBack headline={__('legal-screen.header.headline')} navigation={navigation} />

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
