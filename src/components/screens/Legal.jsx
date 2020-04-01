import UilExternalLinkAlt from '@iconscout/react-native-unicons/icons/uil-external-link-alt';
import React from 'react';
import { FlatList, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import licenses from '../../licenses';
import withViewportUnits from '../../utils/withViewportUnits';
import CollapsibleBox from '../widgets/CollapsibleBox';
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
    const { currentLanguage, navigation, vw, __ } = this.props;
    const { activeTab } = this.state;

    // noinspection JSUnresolvedFunction
    const styles = StyleSheet.create({
      collapsible: {
        marginTop: vw(5),
      },
      contentText: {
        fontFamily: 'JetBrainsMono-Regular',
        fontSize: vw(4),
        lineHeight: vw(6),
      },
      contentTextHeadline: {
        fontFamily: 'JetBrainsMono-Bold',
        fontSize: vw(4.5),
        lineHeight: vw(7),
        marginBottom: vw(1),
        marginTop: vw(2),
      },
      licenseItem: {
        backgroundColor: COLOR_SECONDARY,
        borderRadius: vw(2.3),
        flexDirection: 'column',
        marginLeft: vw(2.5),
        marginRight: vw(2.5),
        marginTop: vw(2.3),
        padding: vw(3),
        paddingBottom: vw(3.8),
        paddingRight: vw(13),
        paddingTop: vw(3.8),
      },
      licenseItemName: {
        fontFamily: 'JetBrainsMono-Bold',
        fontSize: vw(4),
        lineHeight: vw(5),
      },
      licenseItemLicense: {
        alignSelf: 'flex-start',
      },
      licenseItemContent: {
        flexDirection: 'row',
        marginTop: vw(0.5),
      },
      licenseItemContentText: {
        fontFamily: 'JetBrainsMono-Regular',
        fontSize: vw(3.8),
      },
      licenseItemLink: {
        alignItems: 'center',
        bottom: 0,
        height: vw(12),
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        top: 0,
        width: vw(12),
      },
      licensesList: {
        flex: 1,
        width: '100%',
      },
      licensesListWrapper: {
        flex: 1,
        paddingBottom: vw(2.3),
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

    const licensesList = [];

    Object.keys(licenses).forEach((item) => {
      const { licenses: license, licenseUrl, repository } = licenses[item];
      const nameSplit = item.split('@');
      const name = nameSplit[0].length > 0 ? nameSplit[0] : `@${nameSplit[1]}`;
      const version = nameSplit[nameSplit.length - 1];

      licensesList.push({ license, licenseUrl, name, repository, version });
    });

    licensesList.push({
      license: 'Apache-2.0',
      licenseUrl: 'https://www.jetbrains.com/lp/mono/#license',
      name: 'JetBrains Mono',
      repository: 'https://www.jetbrains.com/lp/mono/',
      version: '1.0.3',
    });

    licensesList.push({
      license: 'Custom',
      licenseUrl: 'https://dejavu-fonts.github.io/License.html',
      name: 'DejaVu Fonts',
      repository: 'https://dejavu-fonts.github.io/',
      version: '2.37',
    });

    licensesList.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    const openLink = (url) => Linking.openURL(url).catch(() => {});

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
              <TabBarItem
                active={activeTab === TABS.LICENSES}
                label={__('legal-screen.tabs.licenses.label')}
                onPress={() => this.setActiveTab(TABS.LICENSES)}
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

                  {!['de', 'en'].includes(currentLanguage) && (
                    <CollapsibleBox headline={'English version'} style={styles.collapsible}>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.privacy.section-1.headline', 'en')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.privacy.section-1.text', 'en')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.privacy.section-2.headline', 'en')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.privacy.section-2.text', 'en')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.privacy.section-3.headline', 'en')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.privacy.section-3.text', 'en')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.privacy.section-4.headline', 'en')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.privacy.section-4.text', 'en')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.privacy.section-5.headline', 'en')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.privacy.section-5.text', 'en')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.privacy.section-6.headline', 'en')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.privacy.section-6.text', 'en')}</Text>
                    </CollapsibleBox>
                  )}

                  {currentLanguage !== 'de' && (
                    <CollapsibleBox headline={'Deutsche Version'} style={styles.collapsible}>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.privacy.section-1.headline', 'de')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.privacy.section-1.text', 'de')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.privacy.section-2.headline', 'de')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.privacy.section-2.text', 'de')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.privacy.section-3.headline', 'de')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.privacy.section-3.text', 'de')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.privacy.section-4.headline', 'de')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.privacy.section-4.text', 'de')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.privacy.section-5.headline', 'de')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.privacy.section-5.text', 'de')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.privacy.section-6.headline', 'de')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.privacy.section-6.text', 'de')}</Text>
                    </CollapsibleBox>
                  )}
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

                  {!['de', 'en'].includes(currentLanguage) && (
                    <CollapsibleBox headline={'English version'} style={styles.collapsible}>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.imprint.section-1.headline', 'en')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.imprint.section-1.text', 'en')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.imprint.section-2.headline', 'en')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.imprint.section-2.text', 'en')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.imprint.section-3.headline', 'en')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.imprint.section-3.text', 'en')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.imprint.section-4.headline', 'en')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.imprint.section-4.text', 'en')}</Text>
                    </CollapsibleBox>
                  )}

                  {currentLanguage !== 'de' && (
                    <CollapsibleBox headline={'Deutsche Version'} style={styles.collapsible}>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.imprint.section-1.headline', 'de')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.imprint.section-1.text', 'de')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.imprint.section-2.headline', 'de')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.imprint.section-2.text', 'de')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.imprint.section-3.headline', 'de')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.imprint.section-3.text', 'de')}</Text>
                      <Text style={styles.contentTextHeadline}>
                        {__('legal-screen.imprint.section-4.headline', 'de')}
                      </Text>
                      <Text style={styles.contentText}>{__('legal-screen.imprint.section-4.text', 'de')}</Text>
                    </CollapsibleBox>
                  )}
                </View>
              </ScrollView>
            )}

            {activeTab === TABS.LICENSES && (
              <View style={styles.licensesListWrapper}>
                <FlatList
                  data={licensesList}
                  initialNumToRender={50}
                  keyExtractor={({ name }) => name}
                  renderItem={({ item: { license, licenseUrl, name, repository, version } }) => (
                    <View style={styles.licenseItem}>
                      <TouchableOpacity onPress={() => openLink(repository)} style={styles.licenseItemLink}>
                        <UilExternalLinkAlt color={COLOR_PRIMARY} size={vw(6)} />
                      </TouchableOpacity>
                      <Text style={styles.licenseItemName}>{name}</Text>
                      <View style={styles.licenseItemContent}>
                        <Text style={styles.licenseItemContentText}>{version}</Text>
                        <Text style={styles.licenseItemContentText}>{' - '}</Text>
                        <TouchableOpacity onPress={() => openLink(licenseUrl)} style={styles.licenseItemLicense}>
                          <Text style={styles.licenseItemContentText}>{license}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  style={styles.licensesList}
                />
              </View>
            )}
          </View>
        </View>
      </Layout>
    );
  }
}

export default withI18n(withViewportUnits(Legal));
