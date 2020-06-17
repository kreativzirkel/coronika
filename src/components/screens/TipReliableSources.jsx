import React, { memo } from 'react';
import { COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';
import Tip from '../widgets/Tip';

const TipReliableSources = ({ navigation, __ }) => {
  const links = [
    { text: 'covapp.charite.de', url: 'https://covapp.charite.de/' },
    { text: 'www.rki.de', url: 'https://www.rki.de/' },
    { text: 'www.bzga.de', url: 'https://www.bzga.de/' },
    { text: 'www.mags.nrw', url: 'https://www.mags.nrw/' },
  ];

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <Tip
        headline={__('tips.reliable-sources.headline')}
        lastUpdated={1586174400000}
        links={links}
        texts={[__('tips.reliable-sources.text')]}
      />
    </Layout>
  );
};

export default memo(withI18n(TipReliableSources));
