import React, { memo } from 'react';
import withI18n from '../../i18n';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';
import Tip from '../widgets/Tip';

const TipCoughingSneezing = ({ navigation, __ }) => {
  const sources = [
    {
      text: 'www.bundesgesundheitsministerium.de',
      url:
        'https://www.bundesgesundheitsministerium.de/fileadmin/Dateien/3_Downloads/A/Asylsuchende/Hygieneverhalten_62530100.pdf',
    },
    {
      text: 'www.health.gov.au',
      url:
        'https://www.health.gov.au/news/health-alerts/novel-coronavirus-2019-ncov-health-alert/what-you-need-to-know-about-coronavirus-covid-19',
    },
  ];

  const steps = [
    __('tips.coughing-sneezing.list.item-1'),
    __('tips.coughing-sneezing.list.item-2'),
    __('tips.coughing-sneezing.list.item-3'),
    __('tips.coughing-sneezing.list.item-4'),
    __('tips.coughing-sneezing.list.item-5'),
  ];

  return (
    <Layout>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <Tip
        headline={__('tips.coughing-sneezing.headline')}
        lastUpdated={1584489600000}
        steps={steps}
        sources={sources}
        texts={[__('tips.coughing-sneezing.text')]}
      />
    </Layout>
  );
};

export default memo(withI18n(TipCoughingSneezing));
