import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';
import Tip from '../widgets/Tip';

const TipAmIInfected = ({ navigation, __ }) => {
  const sources = [
    { text: 'covapp.charite.de', url: 'https://covapp.charite.de/' },
    { text: 'www.rki.de', url: 'https://www.rki.de/SharedDocs/FAQ/NCOV2019/FAQ_Liste.html' },
  ];

  const steps = [
    __('tips.am-i-infected.list.item-1'),
    __('tips.am-i-infected.list.item-2'),
    __('tips.am-i-infected.list.item-3'),
  ];

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <ScrollView>
        <Tip
          headline={__('tips.am-i-infected.headline')}
          lastUpdated={1586174400000}
          steps={steps}
          sources={sources}
          texts={[__('tips.am-i-infected.text')]}
        />
      </ScrollView>
    </Layout>
  );
};

export default memo(withI18n(TipAmIInfected));
