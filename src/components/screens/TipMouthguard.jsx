import React, { memo } from 'react';
import { COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';
import Tip from '../widgets/Tip';

const TipMouthguard = ({ navigation, __ }) => {
  const sources = [
    { text: 'www.rki.de', url: 'https://www.rki.de/SharedDocs/FAQ/NCOV2019/FAQ_Liste.html' },
    {
      text: 'www.canada.ca',
      url:
        'https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks.html',
    },
  ];

  const steps = [
    __('tips.mouthguard.list.item-1'),
    __('tips.mouthguard.list.item-2'),
    __('tips.mouthguard.list.item-3'),
    __('tips.mouthguard.list.item-4'),
  ];

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <Tip
        headline={__('tips.mouthguard.headline')}
        lastUpdated={1584489600000}
        steps={steps}
        stepsIntroText={__('tips.mouthguard.list.intro')}
        sources={sources}
        texts={[__('tips.mouthguard.text-1'), __('tips.mouthguard.text-2')]}
      />
    </Layout>
  );
};

export default memo(withI18n(TipMouthguard));
