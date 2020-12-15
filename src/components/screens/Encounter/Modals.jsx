import UilClock from '@iconscout/react-native-unicons/icons/uil-clock';
import UilEditAlt from '@iconscout/react-native-unicons/icons/uil-edit-alt';
import UilImport from '@iconscout/react-native-unicons/icons/uil-import';
import UilLocationPinAlt from '@iconscout/react-native-unicons/icons/uil-location-pin-alt';
import UilSocialDistancing from '@iconscout/react-native-unicons/icons/uil-social-distancing';
import UilSun from '@iconscout/react-native-unicons/icons/uil-sun';
import UilUsersAlt from '@iconscout/react-native-unicons/icons/uil-users-alt';
import UilWind from '@iconscout/react-native-unicons/icons/uil-wind';
import deepEqual from 'fast-deep-equal';
import React, { Fragment } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaskIcon from '../../../assets/images/icons/mask.svg';
import { COLOR_PRIMARY } from '../../../constants';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import LocationsList from '../../widgets/LocationsList';
import ModalDefault from '../../widgets/ModalDefault';
import PersonsList from '../../widgets/PersonsList';
import SearchBar from '../../widgets/SearchBar';
import importPersons from '../Directory/importPersons';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';

class ModalDeleteEncounterClass extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.isVisible !== this.props.isVisible;
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
    return false;
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
    return false;
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

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.isVisible !== this.props.isVisible;
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

    this.state = {
      searchValue: '',
    };

    this.searchInput = React.createRef();
    this.onPressAddLocation = this.onPressAddLocation.bind(this);
    this.onPressClose = this.onPressClose.bind(this);
    this.onPressSearchIcon = this.onPressSearchIcon.bind(this);
    this.setSearchValue = this.setSearchValue.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.isVisible !== this.props.isVisible || nextState.searchValue !== this.state.searchValue;
  }

  styles = StyleSheet.create({
    buttonCreateNew: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: this.props.vw(4),
      marginTop: this.props.vw(5),
    },
    buttonCreateNewIcon: {
      marginRight: this.props.vw(1.5),
    },
    buttonCreateNewText: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
      textTransform: 'lowercase',
    },
    listWrapper: {
      height: this.props.vh(55),
    },
    listEmptyWrapper: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: this.props.vw(10),
    },
    listEmptyText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.2),
      lineHeight: this.props.vw(6.5),
      marginBottom: this.props.vw(4.5),
      textAlign: 'center',
    },
  });

  onPressAddLocation() {
    if (this.props.onPressAddLocation) this.props.onPressAddLocation();
  }

  onPressClose() {
    this.setSearchValue('');
    this.props.onPressClose();
  }

  onPressSearchIcon() {
    const { searchValue } = this.state;

    if (searchValue.length > 0) {
      Keyboard.dismiss();
      this.setSearchValue('');
    } else {
      this.searchInput.current.focus();
    }
  }

  setSearchValue(value) {
    this.setState({ searchValue: value });
  }

  render() {
    const { colors, isVisible, locations, onPressLocation, vw, __ } = this.props;
    const { searchValue } = this.state;

    const isSearchFilled = searchValue.trim().length > 0;
    const filteredLocations = isSearchFilled
      ? locations.filter(({ title }) => title.toLowerCase().indexOf(searchValue.trim().toLowerCase()) !== -1)
      : locations;

    return (
      <ModalDefault
        defaultKeyboardAvoidingViewDisabled
        headline={__('encounter-screen.modals.select-location.headline')}
        isVisible={isVisible}
        onPressClose={this.onPressClose}>
        <KeyboardAvoidingView behavior={'padding'} enabled>
          <SearchBar
            onPressSearchIcon={this.onPressSearchIcon}
            ref={this.searchInput}
            searchValue={searchValue}
            setSearchValue={this.setSearchValue}
            showBorder
          />
        </KeyboardAvoidingView>

        <TouchableOpacity onPress={this.onPressAddLocation} style={this.styles.buttonCreateNew}>
          <UilPlus color={COLOR_PRIMARY} size={vw(5.5)} style={this.styles.buttonCreateNewIcon} />
          <Text style={this.styles.buttonCreateNewText}>{__('entries.locations.list.new')}</Text>
        </TouchableOpacity>

        <View style={this.styles.listWrapper}>
          {filteredLocations.length > 0 ? (
            <LocationsList locations={filteredLocations} orderByLastUsage onPressItem={onPressLocation} />
          ) : (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={this.styles.listEmptyWrapper}>
                {isSearchFilled ? (
                  <Text style={{ ...this.styles.listEmptyText, color: colors.TEXT }}>
                    {__('entries.search.list.empty')}
                  </Text>
                ) : (
                  <Text style={{ ...this.styles.listEmptyText, color: colors.TEXT }}>
                    {__('entries.locations.list.empty')}
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          )}
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
      searchValue: '',
    };

    this.searchInput = React.createRef();
    this.importPersons = this.importPersons.bind(this);
    this.onPressAddPerson = this.onPressAddPerson.bind(this);
    this.onPressClose = this.onPressClose.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.onPressSearchIcon = this.onPressSearchIcon.bind(this);
    this.setSearchValue = this.setSearchValue.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const isVisibleFirstTime = props.isVisible && !state.isVisible;

    if (isVisibleFirstTime) {
      return {
        isVisible: props.isVisible,
      };
    }

    return null;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      (nextProps.isVisible && !this.state.isVisible) ||
      nextProps.isVisible !== this.props.isVisible ||
      nextState.searchValue !== this.state.searchValue ||
      nextProps.selectedPersons.length !== this.props.selectedPersons.length ||
      !deepEqual(nextProps.selectedPersons, this.props.selectedPersons)
    );
  }

  styles = StyleSheet.create({
    buttonCreateNew: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: this.props.vw(4),
      marginTop: this.props.vw(5),
    },
    buttonCreateNewIcon: {
      marginRight: this.props.vw(1.5),
    },
    buttonCreateNewText: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
      textTransform: 'lowercase',
    },
    listWrapper: {
      height: this.props.vh(50),
    },
    listEmptyWrapper: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: this.props.vw(10),
    },
    listEmptyText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.2),
      lineHeight: this.props.vw(6.5),
      marginBottom: this.props.vw(4.5),
      textAlign: 'center',
    },
    personsImportButton: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    personsImportButtonIcon: {
      marginRight: this.props.vw(1.5),
    },
    personsImportButtonText: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.5),
      textTransform: 'lowercase',
    },
  });

  importPersons() {
    const {
      store: { dispatch },
    } = this.context;
    const { __ } = this.props;

    dispatch(importPersons(__));
  }

  onPressAddPerson() {
    if (this.props.onPressAddPerson) this.props.onPressAddPerson();
  }

  onPressClose() {
    this.setSearchValue('');
    this.props.onPressClose();
  }

  onPressConfirm() {
    if (this.props.onPressConfirm) {
      const { selectedPersons } = this.state;

      this.props.onPressConfirm(selectedPersons);
    }

    this.onPressClose();
  }

  onPressSearchIcon() {
    const { searchValue } = this.state;

    if (searchValue.length > 0) {
      Keyboard.dismiss();
      this.setSearchValue('');
    } else {
      this.searchInput.current.focus();
    }
  }

  setSearchValue(value) {
    this.setState({ searchValue: value });
  }

  toggleSelection(id) {
    if (this.props.togglePerson) this.props.togglePerson(id);
  }

  render() {
    const { colors, isVisible, persons, selectedPersons, vw, __ } = this.props;
    const { searchValue } = this.state;

    const isSearchFilled = searchValue.trim().length > 0;
    const visiblePersons = persons.filter(({ hidden }) => !hidden);
    const filteredPersons = isSearchFilled
      ? visiblePersons.filter(({ fullName }) => fullName.toLowerCase().indexOf(searchValue.trim().toLowerCase()) !== -1)
      : visiblePersons;

    return (
      <ModalDefault
        buttonConfirmLabel={__('Confirm')}
        defaultKeyboardAvoidingViewDisabled
        headline={__('encounter-screen.modals.select-persons.headline')}
        isVisible={isVisible}
        onPressClose={this.onPressClose}
        onPressConfirm={this.onPressConfirm}>
        <KeyboardAvoidingView behavior={'padding'} enabled>
          <SearchBar
            onPressSearchIcon={this.onPressSearchIcon}
            ref={this.searchInput}
            searchValue={searchValue}
            setSearchValue={this.setSearchValue}
            showBorder
          />
        </KeyboardAvoidingView>

        <TouchableOpacity onPress={this.onPressAddPerson} style={this.styles.buttonCreateNew}>
          <UilPlus color={COLOR_PRIMARY} size={vw(5.5)} style={this.styles.buttonCreateNewIcon} />
          <Text style={this.styles.buttonCreateNewText}>{__('entries.persons.list.new')}</Text>
        </TouchableOpacity>

        <View style={this.styles.listWrapper}>
          {filteredPersons.length > 0 ? (
            <PersonsList
              allowSelection
              orderByLastUsage
              toggleSelection={this.toggleSelection}
              persons={filteredPersons}
              selectedPersons={selectedPersons}
            />
          ) : (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={this.styles.listEmptyWrapper}>
                {isSearchFilled ? (
                  <Text style={{ ...this.styles.listEmptyText, color: colors.TEXT }}>
                    {__('entries.search.list.empty')}
                  </Text>
                ) : (
                  <Fragment>
                    <Text style={{ ...this.styles.listEmptyText, color: colors.TEXT }}>
                      {__('entries.persons.list.empty')}
                    </Text>
                    <TouchableOpacity onPress={this.importPersons} style={this.styles.personsImportButton}>
                      <UilImport color={COLOR_PRIMARY} size={vw(5.5)} style={this.styles.personsImportButtonIcon} />
                      <Text style={this.styles.personsImportButtonText}>
                        {__('entries.persons.list.import.button')}
                      </Text>
                    </TouchableOpacity>
                  </Fragment>
                )}
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </ModalDefault>
    );
  }
}

export const ModalSelectPersons = withColorScheme(withI18n(withViewportUnits(ModalSelectPersonsClass)));
