import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import deepEqual from 'fast-deep-equal';
import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { COLOR_PRIMARY } from '../../../constants';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';

class PersonOverviewListItemClass extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const { colors, timestamp, __ } = this.props;

    const currentDay = moment(timestamp);
    const today = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
    const isToday = currentDay.diff(today) === 0;

    return (
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
    );
  }
}

const PersonOverviewListItem = withColorScheme(withI18n(withViewportUnits(PersonOverviewListItemClass)));

const getPersonTimestamps = (days, personId) => {
  return Object.keys(days)
    .filter((timestamp) => days[timestamp].persons.find(({ id }) => id === personId))
    .map((key) => parseInt(key, 10))
    .sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;

      return 0;
    });
};

const getPersonName = (persons, personId) => {
  const person = persons.find(({ id }) => id === personId);
  if (person) {
    return person.recordID !== undefined && !!person.fullNameDisplay && person.fullNameDisplay.trim().length > 0
      ? person.fullNameDisplay
      : person.fullName;
  }

  return '';
};

class ModalPersonOverview extends React.Component {
  constructor(props) {
    super(props);

    const { days, personId, persons } = this.props;

    this.state = {
      days,
      daysList: getPersonTimestamps(days, personId),
      personId,
      personName: getPersonName(persons, personId),
      renderedBefore: false,
    };

    this.closeModal = this.closeModal.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (!state.renderedBefore && props.isVisible) {
      update = { ...update, renderedBefore: true };
    }

    if (props.personId !== state.personId || !deepEqual(props.days, state.days)) {
      update = {
        ...update,
        days: props.days,
        daysList: getPersonTimestamps(props.days, props.personId),
        personId: props.personId,
        personName: getPersonName(props.persons, props.personId),
      };
    }

    return Object.keys(update).length > 0 ? update : null;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.isVisible !== this.props.isVisible ||
      nextState.renderedBefore !== this.state.renderedBefore ||
      nextProps.personId !== this.props.personId ||
      !deepEqual(nextProps.days, this.state.days)
    );
  }

  styles = StyleSheet.create({
    personsList: {
      maxHeight: this.props.vh(60),
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalButton: {
      alignItems: 'center',
      backgroundColor: COLOR_PRIMARY,
      borderRadius: this.props.vw(2.3),
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: this.props.vw(3),
      padding: this.props.vw(3.5),
    },
    modalButtonText: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(5),
      textTransform: 'lowercase',
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

  personOverviewListGetItemKey(timestamp) {
    return `person-overview-list-item-${timestamp}`;
  }

  personOverviewRenderItem({ item }) {
    return <PersonOverviewListItem timestamp={item} />;
  }

  render() {
    const { colors, isVisible, vw } = this.props;
    const { daysList, personName, renderedBefore } = this.state;

    if (!renderedBefore && !isVisible) return null;

    const styles = {
      ...this.styles,
      modalButtonText: {
        ...this.styles.modalButtonText,
        color: colors.TEXT_ALT,
      },
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
              {personName}
            </Text>
            <TouchableOpacity onPress={this.closeModal} style={styles.modalHeaderIcon}>
              <UilTimes size={vw(8)} color={COLOR_PRIMARY} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={daysList}
            initialNumToRender={10}
            keyExtractor={this.personOverviewListGetItemKey}
            removeClippedSubviews={true}
            renderItem={this.personOverviewRenderItem}
            style={styles.personsList}
            windowSize={5}
          />
        </View>
      </Modal>
    );
  }
}

export default withColorScheme(withI18n(withViewportUnits(ModalPersonOverview)));
