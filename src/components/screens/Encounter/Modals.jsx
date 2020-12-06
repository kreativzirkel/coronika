import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../../constants';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import LocationsList from '../../widgets/LocationsList';
import ModalDefault from '../../widgets/ModalDefault';
import PersonsList from '../../widgets/PersonsList';
import deepEqual from 'fast-deep-equal';

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
