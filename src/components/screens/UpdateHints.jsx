import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';
import WhatsNew from '../widgets/WhatsNew';

class UpdateHints extends React.Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    scrollView: {
      height: '100%',
    },
    view: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
    },
    viewContent: {
      flex: 1,
      flexDirection: 'column',
      padding: this.props.vw(8),
      width: '100%',
    },
  });

  render() {
    const { colors, navigation, __ } = this.props;

    const styles = {
      ...this.styles,
      view: {
        ...this.styles.view,
        backgroundColor: colors.BACKGROUND,
      },
    };

    return (
      <Layout>
        <HeaderBack headline={__('update-hints-screen.header.headline')} navigation={navigation} />

        <View style={styles.view}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.viewContent}>
              <WhatsNew />
            </View>
          </ScrollView>
        </View>
      </Layout>
    );
  }
}

export default withColorScheme(withI18n(withViewportUnits(UpdateHints)));
