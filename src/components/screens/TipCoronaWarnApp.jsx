import React, { memo } from 'react';
import { Platform } from 'react-native';
import withI18n from '../../i18n';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';
import Tip from '../widgets/Tip';

const TipCoronaWarnApp = ({ navigation, __ }) => {
  let appDownloadText = __('tips.corona-warn-app.link.app-store.text');
  let appDownloadUrl = 'https://apps.apple.com/de/app/corona-warn-app/id1512595757';

  if (Platform.OS === 'android') {
    appDownloadText = __('tips.corona-warn-app.link.google-play.text');
    appDownloadUrl = 'https://play.google.com/store/apps/details?id=de.rki.coronawarnapp';
  }

  const links = [
    {
      text: appDownloadText,
      url: appDownloadUrl,
    },
  ];

  return (
    <Layout>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <Tip
        headline={__('tips.corona-warn-app.headline')}
        links={links}
        texts={[__('tips.corona-warn-app.text-1'), __('tips.corona-warn-app.text-2')]}
      />
    </Layout>
  );
};

export default memo(withI18n(TipCoronaWarnApp));
