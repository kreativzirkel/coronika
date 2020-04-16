import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';
import Tip from '../widgets/Tip';

const TipNotFeelingWell = ({ navigation, __ }) => {
  const sources = [
    { text: 'covapp.charite.de', url: 'https://covapp.charite.de/' },
    { text: 'www.who.int', url: 'https://www.who.int/health-topics/coronavirus' },
  ];

  const steps = [
    __('tips.not-feeling-well.list.item-1'),
    __('tips.not-feeling-well.list.item-2'),
    __('tips.not-feeling-well.list.item-3'),
    __('tips.not-feeling-well.list.item-4'),
  ];

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <ScrollView>
        <Tip
          headline={__('tips.not-feeling-well.headline')}
          lastUpdated={1586174400000}
          steps={steps}
          stepsIntroText={__('tips.not-feeling-well.list.intro')}
          sources={sources}
          texts={[__('tips.not-feeling-well.text')]}
        />
      </ScrollView>
    </Layout>
  );
};

export default memo(withI18n(TipNotFeelingWell));
