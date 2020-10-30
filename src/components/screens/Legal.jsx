import UilExternalLinkAlt from '@iconscout/react-native-unicons/icons/uil-external-link-alt';
import React from 'react';
import { FlatList, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import licenses from '../../licenses';
import withColorScheme from '../../utils/withColorScheme';
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

class Legal extends React.Component {
  constructor(props) {
    super(props);

    const licensesList = [];

    Object.keys(licenses).forEach((item) => {
      const { licenses: license, licenseUrl, repository } = licenses[item];
      const nameSplit = item.split('@');
      const name = nameSplit[0].length > 0 ? nameSplit[0] : `@${nameSplit[1]}`;
      const version = nameSplit[nameSplit.length - 1];

      licensesList.push({ license, licenseUrl, name, repository, version });
    });

    licensesList.push({
      license: 'Custom',
      licenseUrl: 'https://dejavu-fonts.github.io/License.html',
      name: 'DejaVu Fonts',
      repository: 'https://dejavu-fonts.github.io/',
      version: '2.37',
    });

    licensesList.push({
      license: 'Apache-2.0',
      licenseUrl: 'https://www.jetbrains.com/lp/mono/#license',
      name: 'JetBrains Mono',
      repository: 'https://www.jetbrains.com/lp/mono/',
      version: '1.0.3',
    });

    licensesList.push({
      license: 'SIL Open Font License 1.1',
      licenseUrl: 'https://github.com/googlefonts/noto-fonts/blob/master/LICENSE',
      name: 'Noto Fonts',
      repository: 'https://github.com/googlefonts/noto-fonts',
      version: '',
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

    this.state = {
      activeTab: TABS.POLICY,
      licensesList,
    };

    this.openTabImprint = this.openTabImprint.bind(this);
    this.openTabLicenses = this.openTabLicenses.bind(this);
    this.openTabPolicy = this.openTabPolicy.bind(this);
    this.renderLicenseItem = this.renderLicenseItem.bind(this);
  }

  openLink(url) {
    Linking.openURL(url).catch(() => {});
  }

  openTabImprint() {
    this.setActiveTab(TABS.IMPRINT);
  }

  openTabLicenses() {
    this.setActiveTab(TABS.LICENSES);
  }

  openTabPolicy() {
    this.setActiveTab(TABS.POLICY);
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab });
  }

  renderLicenseItem({ item: { license, licenseUrl, name, repository, version } }) {
    const { colors, vw } = this.props;
    const hasVersion = version.toString().trim().length > 0;

    return (
      <View style={{ ...this.styles.licenseItem, backgroundColor: colors.SECONDARY }}>
        <TouchableOpacity onPress={() => this.openLink(repository)} style={this.styles.licenseItemLink}>
          <UilExternalLinkAlt color={COLOR_PRIMARY} size={vw(5.5)} />
        </TouchableOpacity>
        <Text style={{ ...this.styles.licenseItemName, color: colors.TEXT }}>{name}</Text>
        <View style={this.styles.licenseItemContent}>
          {hasVersion && <Text style={{ ...this.styles.licenseItemContentText, color: colors.TEXT }}>{version}</Text>}
          {hasVersion && (
            <Text
              style={{
                ...this.styles.licenseItemContentText,
                color: colors.TEXT,
                marginLeft: vw(2),
                marginRight: vw(2),
              }}>
              {'-'}
            </Text>
          )}
          <TouchableOpacity onPress={() => this.openLink(licenseUrl)} style={this.styles.licenseItemLicense}>
            <Text style={{ ...this.styles.licenseItemContentText, color: colors.TEXT }}>{license}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderLicenseItemKeyExtractor({ name }) {
    return name;
  }

  styles = StyleSheet.create({
    collapsible: {
      marginTop: this.props.vw(5),
    },
    contentText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
      lineHeight: this.props.vw(6),
    },
    contentTextHeadline: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(4.5),
      lineHeight: this.props.vw(7),
      marginBottom: this.props.vw(1),
      marginTop: this.props.vw(2),
    },
    licenseItem: {
      borderRadius: this.props.vw(2.3),
      flexDirection: 'column',
      marginLeft: this.props.vw(2.5),
      marginRight: this.props.vw(2.5),
      marginTop: this.props.vw(2.3),
      padding: this.props.vw(3),
      paddingBottom: this.props.vw(2.5),
      paddingRight: this.props.vw(13),
      paddingTop: this.props.vw(2.5),
    },
    licenseItemName: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(3.6),
      lineHeight: this.props.vw(4.7),
    },
    licenseItemLicense: {
      alignSelf: 'flex-start',
    },
    licenseItemContent: {
      flexDirection: 'row',
      marginTop: this.props.vw(0.5),
    },
    licenseItemContentText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(3.2),
    },
    licenseItemLink: {
      alignItems: 'center',
      bottom: 0,
      height: this.props.vw(12),
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
      top: 0,
      width: this.props.vw(12),
    },
    licensesList: {
      flex: 1,
      width: '100%',
    },
    licensesListWrapper: {
      flex: 1,
      paddingBottom: this.props.vw(2.3),
    },
    tabBarWrapper: {},
    view: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
    },
    viewTabContent: {
      padding: this.props.vw(2.5),
    },
    viewTabContentWrapper: {
      flex: 1,
      width: '100%',
    },
  });

  render() {
    const { colors, currentLanguage, navigation, __ } = this.props;
    const { activeTab, licensesList } = this.state;

    const styles = {
      ...this.styles,
      contentText: {
        ...this.styles.contentText,
        color: colors.TEXT,
      },
      contentTextHeadline: {
        ...this.styles.contentTextHeadline,
        color: colors.TEXT,
      },
      tabBarWrapper: {
        ...this.styles.tabBarWrapper,
        backgroundColor: colors.SECONDARY,
      },
      view: {
        ...this.styles.view,
        backgroundColor: colors.BACKGROUND,
      },
    };

    return (
      <Layout>
        <HeaderBack headline={__('legal-screen.header.headline')} navigation={navigation} />

        <View style={styles.view}>
          <View style={styles.tabBarWrapper}>
            <TabBar>
              <TabBarItem
                active={activeTab === TABS.POLICY}
                label={__('legal-screen.tabs.privacy.label')}
                onPress={this.openTabPolicy}
              />
              <TabBarItem
                active={activeTab === TABS.IMPRINT}
                label={__('legal-screen.tabs.imprint.label')}
                onPress={this.openTabImprint}
              />
              <TabBarItem
                active={activeTab === TABS.LICENSES}
                label={__('legal-screen.tabs.licenses.label')}
                onPress={this.openTabLicenses}
              />
            </TabBar>
          </View>

          <View style={styles.viewTabContentWrapper}>
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
                  initialNumToRender={10}
                  keyExtractor={this.renderLicenseItemKeyExtractor}
                  removeClippedSubviews={true}
                  renderItem={this.renderLicenseItem}
                  windowSize={5}
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

export default withColorScheme(withI18n(withViewportUnits(Legal)));
