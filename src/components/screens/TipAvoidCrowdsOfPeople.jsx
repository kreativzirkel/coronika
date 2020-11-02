import React, { memo } from 'react';
import withI18n from '../../i18n';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';
import Tip from '../widgets/Tip';

const TipAvoidCrowdsOfPeople = ({ navigation, __ }) => {
  const sources = [
    {
      text: 'www.bundesgesundheitsministerium.de',
      url: 'https://www.bundesgesundheitsministerium.de/en/press/2020/coronavirus.html',
    },
  ];

  const steps = [
    __('tips.avoid-crowds-of-people.list.item-1'),
    __('tips.avoid-crowds-of-people.list.item-2'),
    __('tips.avoid-crowds-of-people.list.item-3'),
    __('tips.avoid-crowds-of-people.list.item-4'),
    __('tips.avoid-crowds-of-people.list.item-5'),
  ];

  return (
    <Layout>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <Tip
        headline={__('tips.avoid-crowds-of-people.headline')}
        lastUpdated={1604188800000}
        steps={steps}
        sources={sources}
        texts={[__('tips.avoid-crowds-of-people.text')]}
      />
    </Layout>
  );
};

export default memo(withI18n(TipAvoidCrowdsOfPeople));
