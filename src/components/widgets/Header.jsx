import React, { memo } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import withViewportUnits from '../../utils/withViewportUnits';
import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import { CommonActions } from '@react-navigation/native';

const Header = memo(
  withViewportUnits(({ children, vw }) => {
    // noinspection JSUnresolvedFunction
    const styles = StyleSheet.create({
      header: {
        alignItems: 'center',
        flexDirection: 'row',
        flexGrow: 0,
        flexShrink: 0,
        padding: vw(3.5),
        paddingBottom: vw(7),
        paddingTop: vw(5.5),
        width: '100%',
      },
    });

    return <View style={styles.header}>{children}</View>;
  })
);

export const HeaderBack = memo(
  withViewportUnits(({ headline, navigation, vw }) => {
    // noinspection JSUnresolvedFunction
    const styles = StyleSheet.create({
      header: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: Platform.OS === 'ios' ? 'space-between' : 'flex-end',
      },
      headerHeadline: {
        fontFamily: 'JetBrainsMono-Bold',
        fontSize: vw(5),
        marginLeft: 'auto',
        textTransform: 'lowercase',
      },
    });

    const goBack = () => navigation.dispatch(CommonActions.goBack());

    return (
      <Header>
        <View style={styles.header}>
          {Platform.OS === 'ios' && (
            <TouchableOpacity onPress={() => goBack()} style={{ marginBottom: -vw(3), marginTop: -vw(3) }}>
              <UilArrowLeft size={vw(12)} color={'#000000'} />
            </TouchableOpacity>
          )}

          <Text style={styles.headerHeadline}>{headline}</Text>
        </View>
      </Header>
    );
  })
);

export default Header;
