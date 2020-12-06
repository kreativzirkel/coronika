import UilClock from '@iconscout/react-native-unicons/icons/uil-clock';
import UilEditAlt from '@iconscout/react-native-unicons/icons/uil-edit-alt';
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
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaskIcon from '../../../assets/images/icons/mask.svg';
import { COLOR_PRIMARY } from '../../../constants';
import { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';
import ButtonSwitch from '../../widgets/ButtonSwitch';
import DateTimePickerModal from '../../widgets/DateTimePickerModal';
import { DayOverview } from '../../widgets/DayOverview';
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

    this.delete = this.delete.bind(this);
    this.resetLocation = this.resetLocation.bind(this);
    this.save = this.save.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
  }

  componentDidMount() {
    const { timestamp, timestampEnd, timestampStart, setTimestampEnd, setTimestampStart } = this.props;

    const now = moment();

    if (timestampEnd === 0) {
      const timestampEndFixed = moment(timestamp).hours(now.hours()).minutes(now.minutes()).valueOf();
      setTimestampEnd(timestampEndFixed);
    }

    if (timestampStart === 0) {
      const timestampStartFixed = moment(timestamp).hours(now.hours()).minutes(now.minutes()).valueOf();
      setTimestampStart(timestampStartFixed);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  styles = StyleSheet.create({
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
      padding: this.props.vw(3.5),
      paddingBottom: 0,
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

  delete() {
    this.props.deleteEncounter(this.props.navigation);
  }

  resetLocation() {
    this.props.setLocation(undefined);
  }

  save() {
    this.props.save(this.props.navigation);
  }

  selectLocation(location) {
    this.props.setLocation(location);
    this.props.hideModalSelectLocation();
  }

  render() {
    const {
      colors,
      colorScheme,
      daysList,
      directoryLocations,
      directoryPersons,
      distance,
      id,
      isDateSwitcherModalVisible,
      isSaveButtonDisabled,
      location,
      locationTitle,
      mask,
      modalConfirmDeleteVisible,
      modalHintsVisible,
      modalSelectLocationVisible,
      modalSelectPersonsVisible,
      modalTimestampEndVisible,
      modalTimestampStartVisible,
      note,
      outside,
      persons,
      personsDisplay,
      removePerson,
      timestamp,
      timestampEnd,
      timestampStart,
      ventilation,
      confirmTimestampEnd,
      confirmTimestampStart,
      hideDateSwitcherModal,
      hideModalConfirmDelete,
      hideModalHints,
      hideModalSelectLocation,
      hideModalSelectPersons,
      hideModalTimestampEnd,
      hideModalTimestampStart,
      showDateSwitcherModal,
      showModalConfirmDelete,
      showModalSelectLocation,
      showModalSelectPersons,
      showModalTimestampEnd,
      showModalTimestampStart,
      setDistance,
      setMask,
      setNote,
      setOutside,
      setPersons,
      setTimestamp,
      setVentilation,
      navigation,
      vw,
      __,
    } = this.props;

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

    return (
      <Layout>
        <HeaderBack
          headline={id !== undefined ? __('encounter-screen.headline.edit') : __('encounter-screen.headline.add')}
          navigation={navigation}
        />

        <View style={this.styles.dayOverviewWrapper}>
          <TouchableOpacity onPress={showDateSwitcherModal} disabled={id !== undefined}>
            <DayOverview isDark isReduced timestamp={timestamp} today={today} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.encounterWrapper}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
            enabled
            keyboardVerticalOffset={vw(50)}>
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
                      <TouchableOpacity onPress={() => removePerson(person.id)} style={styles.personsItemRemove}>
                        <UilTimes color={colors.TEXT} size={vw(5.5)} />
                      </TouchableOpacity>
                    </View>
                  ))}
                <TouchableOpacity onPress={showModalSelectPersons} style={styles.personsAddButton}>
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
                <TouchableOpacity onPress={showModalSelectLocation} style={styles.textInputWrapper}>
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
                <TouchableOpacity onPress={showModalTimestampStart} style={styles.textInputWrapper}>
                  <View style={styles.textInput}>
                    <Text style={{ ...styles.textInputText, ...styles.textInputTextTime }}>
                      {moment(timestampStart).format('LT')}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.timeInputDivider}>
                  <UilMinus size={vw(5)} color={iconColorActive} />
                </View>

                <TouchableOpacity onPress={showModalTimestampEnd} style={styles.textInputWrapper}>
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
                onPress={setOutside}
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
                  onPress={setVentilation}
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
                onPress={setMask}
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
                onPress={setDistance}
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
                  onChangeText={setNote}
                  style={{ ...styles.textInputText, ...styles.textInputTextMultiline }}
                  value={note}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

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
          onPressClose={hideModalSelectPersons}
          onPressConfirm={setPersons}
          persons={directoryPersons}
          selectedPersons={persons}
        />

        <ModalSelectLocation
          isVisible={modalSelectLocationVisible}
          locations={directoryLocations}
          onPressClose={hideModalSelectLocation}
          onPressLocation={this.selectLocation}
        />

        <DateTimePickerModal
          cancelTextIOS={__('Cancel')}
          confirmTextIOS={__('Confirm')}
          customHeaderIOS={View}
          date={new Date(timestampStart)}
          headerTextIOS={''}
          isVisible={modalTimestampStartVisible}
          mode={'time'}
          onCancel={hideModalTimestampStart}
          onConfirm={confirmTimestampStart}
        />

        <DateTimePickerModal
          cancelTextIOS={__('Cancel')}
          confirmTextIOS={__('Confirm')}
          customHeaderIOS={View}
          date={new Date(timestampEnd)}
          headerTextIOS={''}
          isVisible={modalTimestampEndVisible}
          mode={'time'}
          onCancel={hideModalTimestampEnd}
          onConfirm={confirmTimestampEnd}
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
