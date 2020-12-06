import UilClock from '@iconscout/react-native-unicons/icons/uil-clock';
import UilEditAlt from '@iconscout/react-native-unicons/icons/uil-edit-alt';
import UilLocationPinAlt from '@iconscout/react-native-unicons/icons/uil-location-pin-alt';
import UilSocialDistancing from '@iconscout/react-native-unicons/icons/uil-social-distancing';
import UilSun from '@iconscout/react-native-unicons/icons/uil-sun';
import UilUsersAlt from '@iconscout/react-native-unicons/icons/uil-users-alt';
import UilWind from '@iconscout/react-native-unicons/icons/uil-wind';
import deepEqual from 'fast-deep-equal';
import React, { Fragment } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaskIcon from '../../../assets/images/icons/mask.svg';
import { COLOR_PRIMARY } from '../../../constants';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import LocationsList from '../../widgets/LocationsList';
import ModalDefault from '../../widgets/ModalDefault';
import PersonsList from '../../widgets/PersonsList';

class ModalDeleteEncounterClass extends React.Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    modalButton: {
      alignItems: 'center',
      backgroundColor: COLOR_PRIMARY,
      borderRadius: this.props.vw(2.3),
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: this.props.vw(5),
      padding: this.props.vw(3.5),
    },
    modalButtonDefault: {
      //
    },
    modalButtonDelete: {
      //
    },
    modalButtonText: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(5),
      textTransform: 'lowercase',
    },
    modalButtonDefaultText: {
      //
    },
    modalText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.4),
      marginBottom: this.props.vw(5),
      paddingLeft: this.props.vw(3),
      paddingRight: this.props.vw(3),
    },
  });

  render() {
    const { colors, isVisible, onPressClose, onPressDelete, __ } = this.props;

    const styles = {
      ...this.styles,
      modalButtonDefault: {
        ...this.styles.modalButtonDefault,
        backgroundColor: colors.SECONDARY,
      },
      modalButtonDelete: {
        ...this.styles.modalButtonDelete,
        backgroundColor: colors.ERROR,
      },
      modalButtonText: {
        ...this.styles.modalButtonText,
        color: colors.TEXT_ALT,
      },
      modalButtonDefaultText: {
        ...this.styles.modalButtonDefaultText,
        color: colors.TEXT,
      },
      modalText: {
        ...this.styles.modalText,
        color: colors.TEXT,
      },
    };

    return (
      <ModalDefault
        headline={__('encounter-screen.modals.delete.headline')}
        isVisible={isVisible}
        onPressClose={onPressClose}>
        <Text style={styles.modalText}>{__('encounter-screen.modals.delete.text')}</Text>

        <TouchableOpacity onPress={onPressDelete}>
          <View style={{ ...styles.modalButton, ...styles.modalButtonDelete }}>
            <Text style={styles.modalButtonText}>{__('encounter-screen.modals.delete.button-delete')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressClose}>
          <View style={{ ...styles.modalButton, ...styles.modalButtonDefault }}>
            <Text style={{ ...styles.modalButtonText, ...styles.modalButtonDefaultText }}>{__('Cancel')}</Text>
          </View>
        </TouchableOpacity>
      </ModalDefault>
    );
  }
}

export const ModalDeleteEncounter = withColorScheme(withI18n(withViewportUnits(ModalDeleteEncounterClass)));

class EncounterOptionHint extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.activeState !== this.props.activeState;
  }

  render() {
    const { IconComponent, iconColor, iconSize, iconStyle, text, textStyle } = this.props;

    return (
      <Fragment>
        <IconComponent color={iconColor} size={iconSize} style={iconStyle} />
        <Text style={textStyle}>{text}</Text>
      </Fragment>
    );
  }
}

class EncounterOptionHintMask extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.activeState !== this.props.activeState;
  }

  render() {
    const { iconColor, iconSize, iconStyle, text, textStyle } = this.props;

    return (
      <Fragment>
        <MaskIcon color={iconColor} height={iconSize} width={iconSize} style={iconStyle} />
        <Text style={textStyle}>{text}</Text>
      </Fragment>
    );
  }
}

class ModalHintsClass extends React.Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    optionIcon: {
      marginLeft: this.props.vw(2.3),
      marginRight: this.props.vw(4.6),
      marginTop: -this.props.vw(0.75),
    },
    optionTextStyle: {
      flex: 1,
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.4),
    },
    optionWrapper: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginBottom: this.props.vw(5),
    },
    wrapper: {
      height: this.props.vh(65),
      marginBottom: this.props.vw(2.3),
      padding: this.props.vw(2.3),
      paddingBottom: 0,
      width: '100%',
    },
  });

  render() {
    const { colors, isVisible, onPressClose, vw, __ } = this.props;

    const styles = {
      ...this.styles,
      optionTextStyle: {
        ...this.styles.optionTextStyle,
        color: colors.TEXT,
      },
    };

    const iconColor = colors.TEXT;
    const iconSize = vw(7);

    return (
      <ModalDefault
        buttonConfirmLabel={__('Close')}
        headline={__('encounter-screen.modals.hints.headline')}
        isVisible={isVisible}
        onPressClose={onPressClose}
        onPressConfirm={onPressClose}>
        <ScrollView style={styles.wrapper}>
          <View style={styles.optionWrapper}>
            <EncounterOptionHint
              IconComponent={UilUsersAlt}
              iconColor={iconColor}
              iconSize={iconSize}
              iconStyle={styles.optionIcon}
              text={__('encounter-screen.modals.hints.persons.text')}
              textStyle={styles.optionTextStyle}
            />
          </View>

          <View style={styles.optionWrapper}>
            <EncounterOptionHint
              IconComponent={UilLocationPinAlt}
              iconColor={iconColor}
              iconSize={iconSize}
              iconStyle={styles.optionIcon}
              text={__('encounter-screen.modals.hints.location.text')}
              textStyle={styles.optionTextStyle}
            />
          </View>

          <View style={styles.optionWrapper}>
            <EncounterOptionHint
              IconComponent={UilClock}
              iconColor={iconColor}
              iconSize={iconSize}
              iconStyle={styles.optionIcon}
              text={__('encounter-screen.modals.hints.time.text')}
              textStyle={styles.optionTextStyle}
            />
          </View>

          <View style={styles.optionWrapper}>
            <EncounterOptionHint
              IconComponent={UilSun}
              iconColor={iconColor}
              iconSize={iconSize}
              iconStyle={styles.optionIcon}
              text={__('encounter-screen.modals.hints.outside.text')}
              textStyle={styles.optionTextStyle}
            />
          </View>

          <View style={styles.optionWrapper}>
            <EncounterOptionHint
              IconComponent={UilWind}
              iconColor={iconColor}
              iconSize={iconSize}
              iconStyle={styles.optionIcon}
              text={__('encounter-screen.modals.hints.ventilated.text')}
              textStyle={styles.optionTextStyle}
            />
          </View>

          <View style={styles.optionWrapper}>
            <EncounterOptionHintMask
              iconColor={iconColor}
              iconSize={iconSize}
              iconStyle={styles.optionIcon}
              text={__('encounter-screen.modals.hints.mask.text')}
              textStyle={styles.optionTextStyle}
            />
          </View>

          <View style={styles.optionWrapper}>
            <EncounterOptionHint
              IconComponent={UilSocialDistancing}
              iconColor={iconColor}
              iconSize={iconSize}
              iconStyle={styles.optionIcon}
              text={__('encounter-screen.modals.hints.distance.text')}
              textStyle={styles.optionTextStyle}
            />
          </View>

          <View style={styles.optionWrapper}>
            <EncounterOptionHint
              IconComponent={UilEditAlt}
              iconColor={iconColor}
              iconSize={iconSize}
              iconStyle={styles.optionIcon}
              text={__('encounter-screen.modals.hints.note.text')}
              textStyle={styles.optionTextStyle}
            />
          </View>
        </ScrollView>
      </ModalDefault>
    );
  }
}

export const ModalHints = withColorScheme(withI18n(withViewportUnits(ModalHintsClass)));

class ModalSelectLocationClass extends React.Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    listWrapper: {
      height: this.props.vh(65),
    },
  });

  render() {
    const { isVisible, locations, onPressClose, onPressLocation, __ } = this.props;

    return (
      <ModalDefault
        headline={__('encounter-screen.modals.select-location.headline')}
        isVisible={isVisible}
        onPressClose={onPressClose}>
        <View style={this.styles.listWrapper}>
          <LocationsList locations={locations} orderByLastUsage onPressItem={onPressLocation} />
        </View>
      </ModalDefault>
    );
  }
}

export const ModalSelectLocation = withColorScheme(withI18n(withViewportUnits(ModalSelectLocationClass)));

class ModalSelectPersonsClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: this.props.isVisible,
      selectedPersons: this.props.selectedPersons,
    };

    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const isVisibleFirstTime = props.isVisible && !state.isVisible;

    if (
      isVisibleFirstTime ||
      props.selectedPersons.length !== state.selectedPersons.length ||
      !deepEqual(props.selectedPersons, state.selectedPersons)
    ) {
      return {
        isVisible: props.isVisible,
        selectedPersons: isVisibleFirstTime ? props.selectedPersons : state.selectedPersons,
      };
    }

    return null;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      (nextProps.isVisible && !this.state.isVisible) ||
      nextProps.isVisible !== this.props.isVisible ||
      nextProps.selectedPersons.length !== this.state.selectedPersons.length ||
      nextState.selectedPersons.length !== this.state.selectedPersons.length ||
      !deepEqual(nextProps.selectedPersons, this.state.selectedPersons) ||
      !deepEqual(nextState.selectedPersons, this.state.selectedPersons)
    );
  }

  styles = StyleSheet.create({
    listWrapper: {
      height: this.props.vh(60),
    },
  });

  onPressConfirm() {
    if (this.props.onPressConfirm) {
      const { selectedPersons } = this.state;

      this.props.onPressConfirm(selectedPersons);
    }

    this.props.onPressClose();
  }

  toggleSelection(id) {
    if (this.state.selectedPersons.includes(id)) {
      this.setState({ selectedPersons: this.state.selectedPersons.filter((personId) => personId !== id) });
    } else {
      this.setState({ selectedPersons: [...this.state.selectedPersons, id] });
    }
  }

  render() {
    const { isVisible, persons, onPressClose, __ } = this.props;
    const { selectedPersons } = this.state;

    return (
      <ModalDefault
        buttonConfirmLabel={__('Confirm')}
        headline={__('encounter-screen.modals.select-persons.headline')}
        isVisible={isVisible}
        onPressClose={onPressClose}
        onPressConfirm={this.onPressConfirm}>
        <View style={this.styles.listWrapper}>
          <PersonsList
            allowSelection
            orderByLastUsage
            toggleSelection={this.toggleSelection}
            persons={persons.filter(({ hidden }) => !hidden)}
            selectedPersons={selectedPersons}
          />
        </View>
      </ModalDefault>
    );
  }
}

export const ModalSelectPersons = withColorScheme(withI18n(withViewportUnits(ModalSelectPersonsClass)));
