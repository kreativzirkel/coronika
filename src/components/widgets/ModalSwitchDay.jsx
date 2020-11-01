import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import withColorScheme from '../../utils/withColorScheme';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import { COLOR_PRIMARY } from '../../constants';

const today = moment().hours(0).minutes(0).seconds(0).milliseconds(0);

class DaysListItemClass extends React.Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  styles = StyleSheet.create({
    day: {
      borderRadius: this.props.vw(2.3),
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: this.props.vw(2.5),
      marginRight: this.props.vw(2.5),
      marginTop: this.props.vw(2.3),
      padding: this.props.vw(3),
      paddingBottom: this.props.vw(3.8),
      paddingTop: this.props.vw(3.8),
    },
    dayText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.2),
    },
    dayTextCaption: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(3),
    },
    dayTextWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
    },
  });

  onPress() {
    if (this.props.onPress) this.props.onPress(this.props.timestamp);
  }

  render() {
    const { colors, timestamp, __ } = this.props;

    const currentDay = moment(timestamp);
    const isToday = currentDay.diff(today) === 0;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={{ ...this.styles.day, backgroundColor: colors.SECONDARY }}>
          <View style={this.styles.dayTextWrapper}>
            <Text numberOfLines={1} style={{ ...this.styles.dayText, color: colors.TEXT }}>
              {currentDay.format('dd')} {currentDay.format('DD.MMM')}
            </Text>
            <Text numberOfLines={1} style={{ ...this.styles.dayTextCaption, color: colors.TEXT }}>
              {isToday ? __('today') : currentDay.from(today)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const DaysListItem = withColorScheme(withI18n(withViewportUnits(DaysListItemClass)));

class ModalSwitchDay extends React.Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
    this.daysListRenderItem = this.daysListRenderItem.bind(this);
    this.onPressDaysListItem = this.onPressDaysListItem.bind(this);
  }

  styles = StyleSheet.create({
    daysList: {
      height: this.props.vh(40),
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      borderTopLeftRadius: this.props.vw(2.3),
      borderTopRightRadius: this.props.vw(2.3),
      padding: this.props.vw(3),
      paddingBottom: this.props.vw(6),
    },
    modalHeader: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: this.props.vw(4.5),
      paddingLeft: this.props.vw(3),
      paddingRight: this.props.vw(3),
      paddingTop: this.props.vw(2),
      width: '100%',
    },
    modalHeaderIcon: {
      alignSelf: 'flex-start',
    },
    modalHeaderText: {
      flex: 1,
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(5),
      textTransform: 'lowercase',
    },
  });

  closeModal() {
    if (this.props.closeModal) this.props.closeModal();
  }

  daysListGetItemKey(timestamp) {
    return `days-list-item-${timestamp}`;
  }

  daysListRenderItem({ item }) {
    return <DaysListItem onPress={this.onPressDaysListItem} timestamp={item} />;
  }

  onPressDaysListItem(timestamp) {
    this.props.setTimestamp(timestamp);
    this.closeModal();
  }

  render() {
    const { colors, days, isVisible, vw, __ } = this.props;

    const styles = {
      ...this.styles,
      modalContent: {
        ...this.styles.modalContent,
        backgroundColor: colors.BACKGROUND,
      },
      modalHeaderText: {
        ...this.styles.modalHeaderText,
        color: colors.TEXT,
      },
    };

    return (
      <Modal
        backdropColor={colors.MODAL_BACKDROP_COLOR}
        hideModalContentWhileAnimating
        isVisible={isVisible}
        onBackButtonPress={this.closeModal}
        onBackdropPress={this.closeModal}
        statusBarTranslucent
        style={styles.modal}
        useNativeDriver>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text numberOfLines={1} style={styles.modalHeaderText}>
              {__('modals-switch-day.headline')}
            </Text>
            <TouchableOpacity onPress={this.closeModal} style={styles.modalHeaderIcon}>
              <UilTimes size={vw(8)} color={COLOR_PRIMARY} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={days}
            initialNumToRender={10}
            keyExtractor={this.daysListGetItemKey}
            removeClippedSubviews={true}
            renderItem={this.daysListRenderItem}
            style={styles.daysList}
            windowSize={5}
          />
        </View>
      </Modal>
    );
  }
}

export default withColorScheme(withI18n(withViewportUnits(ModalSwitchDay)));
