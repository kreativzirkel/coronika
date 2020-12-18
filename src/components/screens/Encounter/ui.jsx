import UilClock from '@iconscout/react-native-unicons/icons/uil-clock';
import UilEditAlt from '@iconscout/react-native-unicons/icons/uil-edit-alt';
import UilInfoCircle from '@iconscout/react-native-unicons/icons/uil-info-circle';
import UilLocationPinAlt from '@iconscout/react-native-unicons/icons/uil-location-pin-alt';
import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-native-unicons/icons/uil-trash-alt';
import UilSocialDistancing from '@iconscout/react-native-unicons/icons/uil-social-distancing';
import UilSun from '@iconscout/react-native-unicons/icons/uil-sun';
import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import UilUsersAlt from '@iconscout/react-native-unicons/icons/uil-users-alt';
import UilWind from '@iconscout/react-native-unicons/icons/uil-wind';
import moment from 'moment';
import React, { Fragment } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { v4 as uuidv4 } from 'uuid';
import MaskIcon from '../../../assets/images/icons/mask.svg';
import { COLOR_PRIMARY } from '../../../constants';
import { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';
import ButtonSwitch from '../../widgets/ButtonSwitch';
import DateTimePickerModal from '../../widgets/DateTimePickerModal';
import { DayOverview } from '../../widgets/DayOverview';
import ModalLocation from '../../widgets/ModalLocation';
import ModalPerson from '../../widgets/ModalPerson';
import ModalSwitchDay from '../../widgets/ModalSwitchDay';
import { ModalDeleteEncounter, ModalHints, ModalSelectLocation, ModalSelectPersons } from './Modals';

const today = moment().hours(0).minutes(0).seconds(0).milliseconds(0);

class EncounterOption extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.activeState !== this.props.activeState;
  }

  render() {
    const {
      activeState,
      IconComponent,
      iconColorActive,
      iconColorInactive,
      iconSize,
      iconStyle,
      labels,
      onPress,
    } = this.props;

    return (
      <Fragment>
        <IconComponent
          color={activeState !== undefined ? iconColorActive : iconColorInactive}
          size={iconSize}
          style={iconStyle}
        />
        <ButtonSwitch activeState={activeState} labels={labels} onPress={onPress} />
      </Fragment>
    );
  }
}

class EncounterOptionMask extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.activeState !== this.props.activeState;
  }

  render() {
    const { activeState, iconColorActive, iconColorInactive, iconSize, iconStyle, labels, onPress } = this.props;

    return (
      <Fragment>
        <MaskIcon
          color={activeState !== undefined ? iconColorActive : iconColorInactive}
          height={iconSize}
          width={iconSize}
          style={iconStyle}
        />
        <ButtonSwitch activeState={activeState} labels={labels} onPress={onPress} />
      </Fragment>
    );
  }
}

class Encounter extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      distance: this.props.distance,
      location: this.props.location,
      locationTitle: this.props.locationTitle,
      mask: this.props.mask,
      modalLocationVisible: false,
      modalLocationVisibleNext: false,
      modalPersonVisible: false,
      modalPersonVisibleNext: false,
      modalSelectLocationVisible: false,
      modalSelectLocationVisibleNext: false,
      modalSelectPersonsVisible: false,
      modalTimestampEndVisible: false,
      modalTimestampStartVisible: false,
      note: this.props.note,
      outside: this.props.outside,
      persons: this.props.persons,
      personsDisplay: this.props.personsDisplay,
      timestampEnd: this.props.timestampEnd,
      timestampStart: this.props.timestampStart,
      ventilation: this.props.ventilation,
    };

    this.addLocation = this.addLocation.bind(this);
    this.addPerson = this.addPerson.bind(this);
    this.confirmSelectedPersons = this.confirmSelectedPersons.bind(this);
    this.delete = this.delete.bind(this);
    this.hideModalLocation = this.hideModalLocation.bind(this);
    this.hideModalPerson = this.hideModalPerson.bind(this);
    this.hideModalSelectLocation = this.hideModalSelectLocation.bind(this);
    this.hideModalSelectPersons = this.hideModalSelectPersons.bind(this);
    this.hideModalTimestampEnd = this.hideModalTimestampEnd.bind(this);
    this.hideModalTimestampStart = this.hideModalTimestampStart.bind(this);
    this.onModalLocationHide = this.onModalLocationHide.bind(this);
    this.onModalPersonHide = this.onModalPersonHide.bind(this);
    this.onModalSelectLocationHide = this.onModalSelectLocationHide.bind(this);
    this.onModalSelectPersonsHide = this.onModalSelectPersonsHide.bind(this);
    this.removePerson = this.removePerson.bind(this);
    this.resetLocation = this.resetLocation.bind(this);
    this.save = this.save.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.setDistance = this.setDistance.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setMask = this.setMask.bind(this);
    this.setNote = this.setNote.bind(this);
    this.setOutside = this.setOutside.bind(this);
    this.setTimestampEnd = this.setTimestampEnd.bind(this);
    this.setTimestampStart = this.setTimestampStart.bind(this);
    this.setVentilation = this.setVentilation.bind(this);
    this.showModalLocation = this.showModalLocation.bind(this);
    this.showModalPerson = this.showModalPerson.bind(this);
    this.showModalSelectLocation = this.showModalSelectLocation.bind(this);
    this.showModalSelectPersons = this.showModalSelectPersons.bind(this);
    this.showModalTimestampEnd = this.showModalTimestampEnd.bind(this);
    this.showModalTimestampStart = this.showModalTimestampStart.bind(this);
    this.togglePerson = this.togglePerson.bind(this);
  }

  componentDidMount() {
    const { timestamp } = this.props;
    const { timestampEnd, timestampStart } = this.state;

    if (timestampEnd === 0) {
      const timestampEndFixed = moment(timestamp).hours(0).minutes(0).valueOf();
      this.setTimestampEnd(timestampEndFixed);
    }

    if (timestampStart === 0) {
      const timestampStartFixed = moment(timestamp).hours(0).minutes(0).valueOf();
      this.setTimestampStart(timestampStartFixed);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  styles = StyleSheet.create({
    headerWrapper: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
    },
    headerComponentWrapper: {
      width: this.props.vw(90),
    },
    headerIconWrapper: {
      alignItems: 'center',
      height: this.props.vw(12),
      justifyContent: 'center',
      marginTop: -this.props.vw(1.5),
      width: this.props.vw(8),
    },
    button: {
      alignItems: 'center',
      backgroundColor: COLOR_PRIMARY,
      borderRadius: this.props.vw(2.3),
      flexDirection: 'row',
      justifyContent: 'center',
      padding: this.props.vw(3.5),
    },
    buttonDelete: {
      alignItems: 'center',
      height: this.props.vw(12),
      justifyContent: 'center',
      marginLeft: this.props.vw(2),
      width: this.props.vw(12),
    },
    buttonDisabled: {
      opacity: 0.2,
    },
    buttonSave: {
      flex: 1,
    },
    buttonText: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(5),
      textTransform: 'lowercase',
    },
    dayOverviewWrapper: {
      marginBottom: this.props.vw(0.7),
      width: '100%',
    },
    encounterWrapper: {
      flex: 1,
      padding: this.props.vw(2.3),
      width: '100%',
    },
    encounterButtonWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      padding: this.props.vw(2.3),
      width: '100%',
    },
    locationWrapper: {
      flex: 1,
    },
    locationButtonReset: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
      top: 0,
      width: this.props.vw(10),
    },
    modalTimeInput: {
      borderRadius: this.props.vw(2.3),
    },
    optionIcon: {
      marginLeft: this.props.vw(2.3),
      marginRight: this.props.vw(4.6),
    },
    optionIconNote: {
      marginTop: this.props.vw(3.6),
    },
    optionIconPersons: {
      marginTop: this.props.vw(3.6),
    },
    optionWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: this.props.vw(2.3),
    },
    optionWrapperNote: {
      alignItems: 'flex-start',
    },
    optionWrapperPersons: {
      alignItems: 'flex-start',
    },
    personsWrapper: {
      borderRadius: this.props.vw(2.3),
      borderWidth: this.props.vw(0.8),
      flex: 1,
      minHeight: this.props.vw(14),
      padding: this.props.vw(1.5),
    },
    personsAddButton: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: this.props.vw(1.8),
      marginTop: this.props.vw(1.8),
    },
    personsAddButtonIcon: {
      marginRight: this.props.vw(2.3),
    },
    personsAddButtonText: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
      textTransform: 'lowercase',
    },
    personsItem: {
      borderRadius: this.props.vw(2.3),
      marginBottom: this.props.vw(1.8),
      padding: this.props.vw(3),
    },
    personsItemText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
      paddingRight: this.props.vw(8),
    },
    personsItemRemove: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
      top: 0,
      width: this.props.vw(9),
    },
    textInput: {
      borderRadius: this.props.vw(2.3),
      flex: 1,
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
      height: this.props.vw(12),
      justifyContent: 'center',
      padding: this.props.vw(2.3),
      paddingLeft: this.props.vw(3),
      paddingRight: this.props.vw(3),
    },
    textInputLocationSelected: {
      paddingRight: this.props.vw(10),
    },
    textInputMultiline: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      height: this.props.vw(30),
    },
    textInputText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
    },
    textInputTextLocationEmpty: {
      textTransform: 'lowercase',
    },
    textInputTextMultiline: {
      flex: 1,
      height: '100%',
    },
    textInputTextTime: {
      textAlign: 'center',
    },
    textInputWrapper: {
      flex: 1,
    },
    timeInputContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    timeInputDivider: {
      marginLeft: this.props.vw(2),
      marginRight: this.props.vw(2),
    },
  });

  addLocation(id, locationTitle, locationDescription, locationPhone) {
    if (this.props.addLocation) {
      const locationId = uuidv4();
      this.props.addLocation(locationId, locationTitle, locationDescription, locationPhone);
      this.setState({
        location: locationId,
        locationTitle,
        modalLocationVisible: false,
        modalLocationVisibleNext: false,
        modalSelectLocationVisibleNext: false,
      });
    }
  }

  addPerson(id, personName, personPhone, personMail) {
    if (this.props.addPerson) {
      const { personsDisplay } = this.state;
      const personId = uuidv4();
      this.props.addPerson(personId, personName, personPhone, personMail);
      this.togglePerson(personId);
      this.setState({
        modalPersonVisible: false,
        modalPersonVisibleNext: false,
        personsDisplay: [...personsDisplay, { id: personId, name: personName }],
      });
    }
  }

  confirmSelectedPersons() {
    const { directoryPersons } = this.props;
    const { persons } = this.state;

    const personsDisplay = persons.map((personId) => {
      const person = directoryPersons.find((p) => p.id === personId);
      const personName = person.fullNameDisplay || person.fullName;

      return {
        id: personId,
        name: personName,
      };
    });

    this.setState({ personsDisplay });
  }

  delete() {
    this.props.deleteEncounter(this.props.navigation);
  }

  hideModalLocation() {
    this.setState({ modalLocationVisible: false, modalLocationVisibleNext: false });
  }

  onModalLocationHide() {
    if (this.state.modalSelectLocationVisibleNext) {
      this.setState({ modalSelectLocationVisible: true, modalSelectLocationVisibleNext: false });
    }
  }

  hideModalPerson() {
    this.setState({ modalPersonVisible: false, modalPersonVisibleNext: false });
  }

  onModalPersonHide() {
    this.setState({ modalSelectPersonsVisible: true });
  }

  hideModalSelectLocation() {
    this.setState({ modalSelectLocationVisible: false });
  }

  onModalSelectLocationHide() {
    if (this.state.modalLocationVisibleNext) {
      this.setState({ modalLocationVisible: true });
    }
  }

  hideModalSelectPersons() {
    this.confirmSelectedPersons();
    this.setState({ modalSelectPersonsVisible: false });
  }

  onModalSelectPersonsHide() {
    if (this.state.modalPersonVisibleNext) {
      this.setState({ modalPersonVisible: true });
    }
  }

  hideModalTimestampEnd() {
    this.setState({ modalTimestampEndVisible: false });
  }

  hideModalTimestampStart() {
    this.setState({ modalTimestampStartVisible: false });
  }

  removePerson(id) {
    const { directoryPersons } = this.props;

    const persons = this.state.persons.filter((p) => p !== id);
    const personsDisplay = persons.map((personId) => {
      const person = directoryPersons.find((p) => p.id === personId);
      const personName = person.fullNameDisplay || person.fullName;

      return {
        id: personId,
        name: personName,
      };
    });

    this.setState({ persons, personsDisplay });
  }

  resetLocation() {
    this.setLocation(undefined);
  }

  save() {
    const { distance, location, mask, note, outside, persons, timestampEnd, timestampStart, ventilation } = this.state;
    const encounter = {
      distance,
      location,
      mask,
      note,
      outside,
      persons,
      timestampEnd,
      timestampStart,
      ventilation,
    };
    this.props.save(encounter, this.props.navigation);
  }

  selectLocation(location) {
    this.setLocation(location);
    this.setState({ modalSelectLocationVisible: false });
  }

  setDistance(value) {
    this.setState({ distance: value });
  }

  setLocation(value) {
    const locationTitle = this.props.directoryLocations.find(({ id: locationId }) => locationId === value)?.title;
    this.setState({ location: value, locationTitle });
  }

  setMask(value) {
    this.setState({ mask: value });
  }

  setNote(value) {
    let note = '';

    if (value?.trim()?.length > 0 && value?.length <= 512) {
      note = value;
    }

    this.setState({ note });
  }

  setOutside(value) {
    if (value === undefined || value === true) {
      this.setState({ outside: value, ventilation: undefined });
    } else {
      this.setState({ outside: value });
    }
  }

  setTimestampEnd(value) {
    const timestampEnd = moment(value).valueOf();
    const timestampStart = timestampEnd > this.state.timestampStart ? this.state.timestampStart : timestampEnd;

    this.setState({ modalTimestampEndVisible: false, timestampStart, timestampEnd });
  }

  setTimestampStart(value) {
    const timestampStart = moment(value).valueOf();
    const timestampEnd = timestampStart < this.state.timestampEnd ? this.state.timestampEnd : timestampStart;

    this.setState({ modalTimestampStartVisible: false, timestampStart, timestampEnd });
  }

  setVentilation(value) {
    this.setState({ ventilation: value });
  }

  showModalLocation() {
    this.setState({
      modalSelectLocationVisible: false,
      modalLocationVisibleNext: true,
      modalSelectLocationVisibleNext: true,
    });
  }

  showModalPerson() {
    this.confirmSelectedPersons();
    this.setState({ modalSelectPersonsVisible: false, modalPersonVisibleNext: true });
  }

  showModalSelectLocation() {
    this.setState({ modalSelectLocationVisible: true });
  }

  showModalSelectPersons() {
    this.setState({ modalSelectPersonsVisible: true });
  }

  showModalTimestampEnd() {
    this.setState({ modalTimestampEndVisible: true });
  }

  showModalTimestampStart() {
    this.setState({ modalTimestampStartVisible: true });
  }

  togglePerson(id) {
    const { persons } = this.state;

    if (persons.includes(id)) {
      this.setState({ persons: persons.filter((p) => p !== id) });
    } else {
      this.setState({ persons: [...persons, id] });
    }
  }

  render() {
    const {
      colors,
      colorScheme,
      daysList,
      directoryLocations,
      directoryPersons,
      id,
      isDateSwitcherModalVisible,
      modalConfirmDeleteVisible,
      modalHintsVisible,
      timestamp,
      hideDateSwitcherModal,
      hideModalConfirmDelete,
      hideModalHints,
      showDateSwitcherModal,
      showModalConfirmDelete,
      showModalHints,
      setTimestamp,
      navigation,
      vw,
      __,
    } = this.props;
    const {
      distance,
      location,
      locationTitle,
      mask,
      modalLocationVisible,
      modalPersonVisible,
      modalSelectLocationVisible,
      modalSelectPersonsVisible,
      modalTimestampEndVisible,
      modalTimestampStartVisible,
      note,
      outside,
      persons,
      personsDisplay,
      timestampEnd,
      timestampStart,
      ventilation,
    } = this.state;

    const styles = {
      ...this.styles,
      buttonText: {
        ...this.styles.buttonText,
        color: colors.TEXT_ALT,
      },
      encounterWrapper: {
        ...this.styles.encounterWrapper,
        backgroundColor: colors.BACKGROUND,
      },
      encounterButtonWrapper: {
        ...this.styles.encounterButtonWrapper,
        backgroundColor: colors.BACKGROUND,
      },
      personsWrapper: {
        ...this.styles.personsWrapper,
        backgroundColor: colors.BACKGROUND,
        borderColor: colors.SECONDARY,
      },
      personsItem: {
        ...this.styles.personsItem,
        backgroundColor: colors.SECONDARY,
      },
      personsItemText: {
        ...this.styles.personsItemText,
        color: colors.TEXT,
      },
      textInput: {
        ...this.styles.textInput,
        backgroundColor: colors.SECONDARY,
        color: colors.TEXT,
      },
      textInputText: {
        ...this.styles.textInputText,
        color: colors.TEXT,
      },
      textInputTextLocation: {
        color: location !== undefined ? colors.TEXT : colorScheme === 'dark' ? colors.GRAY_2 : colors.GRAY_4,
      },
    };

    const iconColorActive = colors.TEXT;
    const iconColorInactive = colorScheme === 'dark' ? colors.GRAY_2 : colors.GRAY_4;
    const iconSize = vw(7);
    const isSaveButtonDisabled = persons.length === 0 && location === undefined;

    return (
      <Layout>
        <View style={styles.headerWrapper}>
          <View style={styles.headerComponentWrapper}>
            <HeaderBack
              headline={id !== undefined ? __('encounter-screen.headline.edit') : __('encounter-screen.headline.add')}
              navigation={navigation}
            />
          </View>
          <TouchableOpacity onPress={showModalHints} style={styles.headerIconWrapper}>
            <UilInfoCircle color={colors.TEXT} size={vw(6.5)} />
          </TouchableOpacity>
        </View>

        <View style={this.styles.dayOverviewWrapper}>
          <TouchableOpacity onPress={showDateSwitcherModal} disabled={id !== undefined}>
            <DayOverview isDark isReduced timestamp={timestamp} today={today} />
          </TouchableOpacity>
        </View>

        <View style={styles.encounterWrapper}>
          <KeyboardAwareScrollView extraScrollHeight={vw(30)}>
            <View style={{ ...styles.optionWrapper, ...styles.optionWrapperPersons }}>
              <UilUsersAlt
                color={persons?.length > 0 ? iconColorActive : iconColorInactive}
                size={iconSize}
                style={{ ...styles.optionIcon, ...styles.optionIconPersons }}
              />

              <View style={styles.personsWrapper}>
                {personsDisplay?.length > 0 &&
                  personsDisplay.map((person) => (
                    <View key={`encounter-person-${person.id}`} style={styles.personsItem}>
                      <Text numberOfLines={1} style={styles.personsItemText}>
                        {person.name}
                      </Text>
                      <TouchableOpacity onPress={() => this.removePerson(person.id)} style={styles.personsItemRemove}>
                        <UilTimes color={colors.TEXT} size={vw(5.5)} />
                      </TouchableOpacity>
                    </View>
                  ))}
                <TouchableOpacity onPress={this.showModalSelectPersons} style={styles.personsAddButton}>
                  <UilPlus color={COLOR_PRIMARY} size={vw(6)} style={styles.personsAddButtonIcon} />
                  <Text numberOfLines={1} style={styles.personsAddButtonText}>
                    {__('encounter-screen.persons.add')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.optionWrapper}>
              <UilLocationPinAlt
                color={location !== undefined ? iconColorActive : iconColorInactive}
                size={iconSize}
                style={styles.optionIcon}
              />

              <View style={styles.locationWrapper}>
                <TouchableOpacity onPress={this.showModalSelectLocation} style={styles.textInputWrapper}>
                  <View
                    style={{ ...styles.textInput, ...(location !== undefined && styles.textInputLocationSelected) }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        ...styles.textInputText,
                        ...styles.textInputTextLocation,
                        ...(location === undefined && styles.textInputTextLocationEmpty),
                      }}>
                      {location !== undefined ? locationTitle : __('location')}
                    </Text>
                  </View>
                </TouchableOpacity>

                {location !== undefined && (
                  <TouchableOpacity onPress={this.resetLocation} style={styles.locationButtonReset}>
                    <UilTimes size={vw(6)} color={colors.TEXT} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.optionWrapper}>
              <UilClock color={iconColorActive} size={iconSize} style={styles.optionIcon} />

              <View style={styles.timeInputContainer}>
                <TouchableOpacity onPress={this.showModalTimestampStart} style={styles.textInputWrapper}>
                  <View style={styles.textInput}>
                    <Text style={{ ...styles.textInputText, ...styles.textInputTextTime }}>
                      {moment(timestampStart).format('LT')}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.timeInputDivider}>
                  <UilMinus size={vw(5)} color={iconColorActive} />
                </View>

                <TouchableOpacity onPress={this.showModalTimestampEnd} style={styles.textInputWrapper}>
                  <View style={styles.textInput}>
                    <Text style={{ ...styles.textInputText, ...styles.textInputTextTime }}>
                      {moment(timestampEnd).format('LT')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.optionWrapper}>
              <EncounterOption
                activeState={outside}
                IconComponent={UilSun}
                iconColorActive={iconColorActive}
                iconColorInactive={iconColorInactive}
                iconSize={iconSize}
                iconStyle={styles.optionIcon}
                labels={[__('encounter-screen.options.outside.yes'), __('encounter-screen.options.outside.no')]}
                onPress={this.setOutside}
              />
            </View>

            {outside === false && (
              <View style={styles.optionWrapper}>
                <EncounterOption
                  activeState={ventilation}
                  IconComponent={UilWind}
                  iconColorActive={iconColorActive}
                  iconColorInactive={iconColorInactive}
                  iconSize={iconSize}
                  iconStyle={styles.optionIcon}
                  labels={[__('encounter-screen.options.ventilated.yes'), __('encounter-screen.options.ventilated.no')]}
                  onPress={this.setVentilation}
                />
              </View>
            )}

            <View style={styles.optionWrapper}>
              <EncounterOptionMask
                activeState={mask}
                IconComponent={UilSocialDistancing}
                iconColorActive={iconColorActive}
                iconColorInactive={iconColorInactive}
                iconSize={iconSize}
                iconStyle={styles.optionIcon}
                labels={[__('encounter-screen.options.mask.yes'), __('encounter-screen.options.mask.no')]}
                onPress={this.setMask}
              />
            </View>

            <View style={styles.optionWrapper}>
              <EncounterOption
                activeState={distance}
                IconComponent={UilSocialDistancing}
                iconColorActive={iconColorActive}
                iconColorInactive={iconColorInactive}
                iconSize={iconSize}
                iconStyle={styles.optionIcon}
                labels={[__('encounter-screen.options.distance.yes'), __('encounter-screen.options.distance.no')]}
                onPress={this.setDistance}
              />
            </View>

            <View style={{ ...styles.optionWrapper, ...styles.optionWrapperNote }}>
              <UilEditAlt
                size={iconSize}
                color={note?.length > 0 ? iconColorActive : iconColorInactive}
                style={{ ...styles.optionIcon, ...styles.optionIconNote }}
              />

              <View style={{ ...styles.textInput, ...styles.textInputMultiline }}>
                <TextInput
                  multiline
                  onChangeText={this.setNote}
                  style={{ ...styles.textInputText, ...styles.textInputTextMultiline }}
                  value={note}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>

        <View style={styles.encounterButtonWrapper}>
          <TouchableOpacity disabled={isSaveButtonDisabled} onPress={this.save} style={styles.buttonSave}>
            <View
              style={{
                ...styles.button,
                ...(isSaveButtonDisabled && styles.buttonDisabled),
              }}>
              <Text numberOfLines={1} style={styles.buttonText}>
                {__('encounter-screen.button.save')}
              </Text>
            </View>
          </TouchableOpacity>

          {id !== undefined && (
            <TouchableOpacity onPress={showModalConfirmDelete} style={styles.buttonDelete}>
              <UilTrashAlt size={vw(7)} color={colors.ERROR} />
            </TouchableOpacity>
          )}
        </View>

        <ModalHints isVisible={modalHintsVisible} onPressClose={hideModalHints} />

        <ModalSwitchDay
          closeModal={hideDateSwitcherModal}
          days={daysList}
          isVisible={isDateSwitcherModalVisible}
          setTimestamp={setTimestamp}
        />

        <ModalSelectPersons
          isVisible={modalSelectPersonsVisible}
          onModalHide={this.onModalSelectPersonsHide}
          onPressClose={this.hideModalSelectPersons}
          onPressConfirm={this.hideModalSelectPersons}
          onPressAddPerson={this.showModalPerson}
          persons={directoryPersons}
          selectedPersons={persons}
          togglePerson={this.togglePerson}
        />

        <ModalPerson
          isVisible={modalPersonVisible}
          onModalHide={this.onModalPersonHide}
          onPressClose={this.hideModalPerson}
          onPressConfirm={this.addPerson}
        />

        <ModalSelectLocation
          isVisible={modalSelectLocationVisible}
          locations={directoryLocations}
          onModalHide={this.onModalSelectLocationHide}
          onPressAddLocation={this.showModalLocation}
          onPressClose={this.hideModalSelectLocation}
          onPressLocation={this.selectLocation}
        />

        <ModalLocation
          isVisible={modalLocationVisible}
          onModalHide={this.onModalLocationHide}
          onPressClose={this.hideModalLocation}
          onPressConfirm={this.addLocation}
        />

        <DateTimePickerModal
          cancelTextIOS={__('Cancel')}
          confirmTextIOS={__('Confirm')}
          customHeaderIOS={View}
          date={new Date(timestampStart)}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          headerTextIOS={''}
          isVisible={modalTimestampStartVisible}
          mode={'time'}
          onCancel={this.hideModalTimestampStart}
          onConfirm={this.setTimestampStart}
        />

        <DateTimePickerModal
          cancelTextIOS={__('Cancel')}
          confirmTextIOS={__('Confirm')}
          customHeaderIOS={View}
          date={new Date(timestampEnd)}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          headerTextIOS={''}
          isVisible={modalTimestampEndVisible}
          mode={'time'}
          onCancel={this.hideModalTimestampEnd}
          onConfirm={this.setTimestampEnd}
        />

        <ModalDeleteEncounter
          isVisible={modalConfirmDeleteVisible}
          onPressClose={hideModalConfirmDelete}
          onPressDelete={this.delete}
        />
      </Layout>
    );
  }
}

export default Encounter;
