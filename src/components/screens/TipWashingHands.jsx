import React, { memo } from 'react';
import { COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';
import Tip from '../widgets/Tip';

const TipWashingHands = ({ navigation, __ }) => {
  const sources = [
    { text: 'www.who.int', url: 'https://www.who.int/gpsc/clean_hands_protection/en/' },
    { text: 'www.cdc.gov', url: 'https://www.cdc.gov/handwashing/when-how-handwashing.html' },
  ];

  const steps = [
    __('tips.washing-hands.list.item-1'),
    __('tips.washing-hands.list.item-2'),
    __('tips.washing-hands.list.item-3'),
    __('tips.washing-hands.list.item-4'),
    __('tips.washing-hands.list.item-5'),
  ];

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <Tip
        headline={__('tips.washing-hands.headline')}
        lastUpdated={1584489600000}
        steps={steps}
        sources={sources}
        texts={[__('tips.washing-hands.text')]}
      />
    </Layout>
  );
};

export default memo(withI18n(TipWashingHands));
