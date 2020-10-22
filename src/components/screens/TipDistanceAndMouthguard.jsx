import React, { memo } from 'react';
import withI18n from '../../i18n';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';
import Tip from '../widgets/Tip';

const TipDistanceAndMouthguard = ({ navigation, __ }) => {
  const links = [
    {
      text: 'www.rki.de',
      url: 'https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/nCoV_node.html',
    },
  ];

  return (
    <Layout>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <Tip
        headline={__('tips.distance-and-mouthguard.headline')}
        links={links}
        texts={[__('tips.distance-and-mouthguard.text-1'), __('tips.distance-and-mouthguard.text-2')]}
      />
    </Layout>
  );
};

export default memo(withI18n(TipDistanceAndMouthguard));
