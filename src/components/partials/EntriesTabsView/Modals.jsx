import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import moment from 'moment';
import React, { Fragment } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { COLOR_PRIMARY } from '../../../constants';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import DateTimePickerModal from '../../widgets/DateTimePickerModal';

class ModalDefaultClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderedBefore: false,
    };

    this.onPressClose = this.onPressClose.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.renderedBefore && props.isVisible) {
      return { renderedBefore: true };
    }

    return null;
  }

  styles = StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      borderTopLeftRadius: this.props.vw(2.3),
      borderTopRightRadius: this.props.vw(2.3),
      padding: this.props.vw(3),
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
    modalButton: {
      alignItems: 'center',
      backgroundColor: COLOR_PRIMARY,
      borderRadius: this.props.vw(2.3),
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: this.props.vw(5),
      padding: this.props.vw(3.5),
    },
    modalButtonDisabled: {
      opacity: 0.2,
    },
    modalButtonText: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(6),
      textTransform: 'lowercase',
    },
  });

  showConfirmationButton = this.props.buttonConfirmLabel && this.props.onPressConfirm;

  onPressClose() {
    if (this.props.onPressClose) this.props.onPressClose();
  }

  onPressConfirm() {
    if (this.props.onPressConfirm) this.props.onPressConfirm();
  }

  render() {
    const { buttonConfirmDisabled, buttonConfirmLabel, children, colors, headline, isVisible, vw } = this.props;
    const { renderedBefore } = this.state;

    if (!renderedBefore && !isVisible) return null;

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
      modalButtonText: {
        ...this.styles.modalButtonText,
        color: colors.TEXT_ALT,
      },
    };

    return (
      <Modal
        backdropColor={colors.MODAL_BACKDROP_COLOR}
        hideModalContentWhileAnimating
        isVisible={isVisible}
        onBackButtonPress={this.onPressClose}
        onBackdropPress={this.onPressClose}
        statusBarTranslucent
        style={styles.modal}
        useNativeDriver>
        <KeyboardAvoidingView behavior={'padding'} enabled>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text numberOfLines={1} style={styles.modalHeaderText}>
                {headline}
              </Text>
              <TouchableOpacity onPress={this.onPressClose} style={styles.modalHeaderIcon}>
                <UilTimes size={vw(9)} color={COLOR_PRIMARY} />
              </TouchableOpacity>
            </View>

            <Fragment>{children}</Fragment>

            {this.showConfirmationButton && (
              <TouchableOpacity disabled={buttonConfirmDisabled} onPress={this.onPressConfirm}>
                <View
                  style={{
                    ...styles.modalButton,
                    ...(buttonConfirmDisabled && styles.modalButtonDisabled),
                  }}>
                  <Text style={styles.modalButtonText}>{buttonConfirmLabel}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const ModalDefault = withColorScheme(withI18n(withViewportUnits(ModalDefaultClass)));

class ModalPersonClass extends React.Component {
  constructor(props) {
    super(props);

    this.setPersonName = this.setPersonName.bind(this);
    this.setPersonPhone = this.setPersonPhone.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.isVisible !== this.props.isVisible ||
      nextProps.personName !== this.props.personName ||
      nextProps.personPhone !== this.props.personPhone ||
      nextProps.buttonConfirmDisabled !== this.props.buttonConfirmDisabled ||
      nextProps.buttonConfirmLabel !== this.props.buttonConfirmLabel
    );
  }

  styles = StyleSheet.create({
    modalTextInput: {
      borderRadius: this.props.vw(2.3),
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
      height: this.props.vw(15),
      marginBottom: this.props.vw(4),
      padding: this.props.vw(4),
    },
  });

  setPersonName(value) {
    if (this.props.setPersonName) this.props.setPersonName(value);
  }

  setPersonPhone(value) {
    if (this.props.setPersonPhone) this.props.setPersonPhone(value);
  }

  render() {
    const {
      buttonConfirmDisabled,
      buttonConfirmLabel,
      colors,
      headline,
      isVisible,
      onPressClose,
      onPressConfirm,
      personName,
      personPhone,
      __,
    } = this.props;

    const styles = {
      ...this.styles,
      modalTextInput: {
        ...this.styles.modalTextInput,
        backgroundColor: colors.SECONDARY,
        color: colors.TEXT,
      },
    };

    return (
      <ModalDefault
        buttonConfirmDisabled={buttonConfirmDisabled}
        buttonConfirmLabel={buttonConfirmLabel}
        headline={headline}
        isVisible={isVisible}
        onPressClose={onPressClose}
        onPressConfirm={onPressConfirm}>
        <TextInput
          autoCompleteType={'off'}
          autoCorrect={false}
          onChangeText={this.setPersonName}
          placeholder={__('entries.modals.new-person.placeholder.name').toLowerCase()}
          placeholderTextColor={'#B0B0B1'}
          style={styles.modalTextInput}
          textContentType={'none'}
          value={personName}
        />

        <TextInput
          autoCompleteType={'off'}
          autoCorrect={false}
          onChangeText={this.setPersonPhone}
          keyboardType={'phone-pad'}
          placeholder={__('entries.modals.new-person.placeholder.phone-number').toLowerCase()}
          placeholderTextColor={'#B0B0B1'}
          style={styles.modalTextInput}
          textContentType={'none'}
          value={personPhone}
        />
      </ModalDefault>
    );
  }
}

export const ModalPerson = withColorScheme(withI18n(withViewportUnits(ModalPersonClass)));

class ModalLocationClass extends React.Component {
  constructor(props) {
    super(props);

    this.setLocationDescription = this.setLocationDescription.bind(this);
    this.setLocationPhone = this.setLocationPhone.bind(this);
    this.setLocationTitle = this.setLocationTitle.bind(this);
  }

  styles = StyleSheet.create({
    modalTextInput: {
      borderRadius: this.props.vw(2.3),
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
      height: this.props.vw(15),
      marginBottom: this.props.vw(4),
      padding: this.props.vw(4),
    },
  });

  setLocationDescription(value) {
    if (this.props.setLocationDescription) this.props.setLocationDescription(value);
  }

  setLocationPhone(value) {
    if (this.props.setLocationPhone) this.props.setLocationPhone(value);
  }

  setLocationTitle(value) {
    if (this.props.setLocationTitle) this.props.setLocationTitle(value);
  }

  render() {
    const {
      buttonConfirmDisabled,
      buttonConfirmLabel,
      colors,
      headline,
      isVisible,
      locationDescription,
      locationPhone,
      locationTitle,
      onPressClose,
      onPressConfirm,
      __,
    } = this.props;

    const styles = {
      ...this.styles,
      modalTextInput: {
        ...this.styles.modalTextInput,
        backgroundColor: colors.SECONDARY,
        color: colors.TEXT,
      },
    };

    return (
      <ModalDefault
        buttonConfirmDisabled={buttonConfirmDisabled}
        buttonConfirmLabel={buttonConfirmLabel}
        headline={headline}
        isVisible={isVisible}
        onPressClose={onPressClose}
        onPressConfirm={onPressConfirm}>
        <TextInput
          autoCompleteType={'off'}
          autoCorrect={false}
          onChangeText={this.setLocationTitle}
          placeholder={__('entries.modals.new-location.placeholder.title').toLowerCase()}
          placeholderTextColor={'#B0B0B1'}
          style={styles.modalTextInput}
          textContentType={'none'}
          value={locationTitle}
        />

        <TextInput
          autoCompleteType={'off'}
          autoCorrect={false}
          onChangeText={this.setLocationDescription}
          placeholder={__('entries.modals.new-location.placeholder.description').toLowerCase()}
          placeholderTextColor={'#B0B0B1'}
          style={styles.modalTextInput}
          textContentType={'none'}
          value={locationDescription}
        />

        <TextInput
          autoCompleteType={'off'}
          autoCorrect={false}
          onChangeText={this.setLocationPhone}
          keyboardType={'phone-pad'}
          placeholder={__('entries.modals.new-location.placeholder.phone-number').toLowerCase()}
          placeholderTextColor={'#B0B0B1'}
          style={styles.modalTextInput}
          textContentType={'none'}
          value={locationPhone}
        />
      </ModalDefault>
    );
  }
}

export const ModalLocation = withColorScheme(withI18n(withViewportUnits(ModalLocationClass)));

class ModalLocationSelectionClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalTimestampEndVisible: false,
      modalTimestampStartVisible: false,
    };

    this.closeModalTimestampEnd = this.closeModalTimestampEnd.bind(this);
    this.closeModalTimestampStart = this.closeModalTimestampStart.bind(this);
    this.confirmModalTimestampEnd = this.confirmModalTimestampEnd.bind(this);
    this.confirmModalTimestampStart = this.confirmModalTimestampStart.bind(this);
    this.openModalTimestampEnd = this.openModalTimestampEnd.bind(this);
    this.openModalTimestampStart = this.openModalTimestampStart.bind(this);
    this.setLocationDescription = this.setLocationDescription.bind(this);
  }

  styles = StyleSheet.create({
    modalTextInput: {
      borderRadius: this.props.vw(2.3),
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
      height: this.props.vw(15),
      marginBottom: this.props.vw(4),
      padding: this.props.vw(4),
    },
    modalTextInputTime: {
      paddingTop: this.props.vw(4.9),
    },
    modalTextInputText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
    },
    modalTimeInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalTimeInputWrapper: {
      width: this.props.vw(38),
    },
    modalTimeInputDivider: {
      marginTop: this.props.vw(4),
    },
    modalTimeInput: {
      borderRadius: this.props.vw(2.3),
    },
  });

  closeModalTimestampEnd() {
    this.setState({ modalTimestampEndVisible: false });
  }

  closeModalTimestampStart() {
    this.setState({ modalTimestampStartVisible: false });
  }

  confirmModalTimestampEnd(timestamp) {
    this.closeModalTimestampEnd();

    if (this.props.confirmModalTimestampEnd) this.props.confirmModalTimestampEnd(timestamp);
  }

  confirmModalTimestampStart(timestamp) {
    this.closeModalTimestampStart();

    if (this.props.confirmModalTimestampStart) this.props.confirmModalTimestampStart(timestamp);
  }

  openModalTimestampEnd() {
    this.setState({ modalTimestampEndVisible: true });
  }

  openModalTimestampStart() {
    this.setState({ modalTimestampStartVisible: true });
  }

  setLocationDescription(value) {
    if (this.props.setLocationDescription) this.props.setLocationDescription(value);
  }

  render() {
    const {
      buttonConfirmDisabled,
      buttonConfirmLabel,
      colors,
      headline,
      isVisible,
      locationDescription,
      locationTimestampEnd,
      locationTimestampStart,
      locationTitle,
      onPressClose,
      onPressConfirm,
      vw,
      __,
    } = this.props;
    const { modalTimestampEndVisible, modalTimestampStartVisible } = this.state;

    const styles = {
      ...this.styles,
      modalTextInput: {
        ...this.styles.modalTextInput,
        backgroundColor: colors.SECONDARY,
        color: colors.TEXT,
      },
      modalTextInputText: {
        ...this.styles.modalTextInputText,
        color: colors.TEXT,
      },
      modalTimeInput: {
        ...this.styles.modalTimeInput,
        backgroundColor: colors.GRAY_3,
      },
    };

    return (
      <ModalDefault
        buttonConfirmDisabled={buttonConfirmDisabled}
        buttonConfirmLabel={buttonConfirmLabel}
        headline={headline}
        isVisible={isVisible}
        onPressClose={onPressClose}
        onPressConfirm={onPressConfirm}>
        <TextInput
          autoCompleteType={'off'}
          autoCorrect={false}
          editable={false}
          style={styles.modalTextInput}
          textContentType={'none'}
          value={locationTitle}
        />

        <TextInput
          autoCompleteType={'off'}
          autoCorrect={false}
          onChangeText={this.setLocationDescription}
          placeholder={__('entries.modals.select-location.placeholder.description').toLowerCase()}
          placeholderTextColor={'#B0B0B1'}
          style={styles.modalTextInput}
          textContentType={'none'}
          value={locationDescription}
        />

        <View style={styles.modalTimeInputContainer}>
          <TouchableOpacity onPress={this.openModalTimestampStart} style={styles.modalTimeInputWrapper}>
            <View style={{ ...styles.modalTextInput, ...styles.modalTextInputTime }}>
              <Text style={styles.modalTextInputText}>{moment(locationTimestampStart).format('LT')}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.modalTimeInputDivider}>
            <UilMinus size={vw(7)} color={'#d6d6d6'} />
          </View>

          <TouchableOpacity onPress={this.openModalTimestampEnd} style={styles.modalTimeInputWrapper}>
            <View style={{ ...styles.modalTextInput, ...styles.modalTextInputTime }}>
              <Text style={styles.modalTextInputText}>{moment(locationTimestampEnd).format('LT')}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.modalTimeInput}>
          <DateTimePickerModal
            cancelTextIOS={__('Cancel')}
            confirmTextIOS={__('Confirm')}
            customHeaderIOS={View}
            date={new Date(locationTimestampStart)}
            headerTextIOS={''}
            isVisible={modalTimestampStartVisible}
            mode={'time'}
            onCancel={this.closeModalTimestampStart}
            onConfirm={this.confirmModalTimestampStart}
          />

          <DateTimePickerModal
            cancelTextIOS={__('Cancel')}
            confirmTextIOS={__('Confirm')}
            customHeaderIOS={View}
            date={new Date(locationTimestampEnd)}
            headerTextIOS={''}
            isVisible={modalTimestampEndVisible}
            mode={'time'}
            onCancel={this.closeModalTimestampEnd}
            onConfirm={this.confirmModalTimestampEnd}
          />
        </View>
      </ModalDefault>
    );
  }
}

export const ModalLocationSelection = withColorScheme(withI18n(withViewportUnits(ModalLocationSelectionClass)));

class ModalLocationMoreClass extends React.Component {
  constructor(props) {
    super(props);

    this.onPressDelete = this.onPressDelete.bind(this);
    this.onPressEdit = this.onPressEdit.bind(this);
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
    modalButtonDelete: {
      //
    },
    modalButtonText: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(6),
      textTransform: 'lowercase',
    },
    modalText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.4),
      marginBottom: this.props.vw(5),
      paddingLeft: this.props.vw(3),
      paddingRight: this.props.vw(3),
    },
  });

  onPressDelete() {
    if (this.props.onPressDelete) this.props.onPressDelete();
  }

  onPressEdit() {
    if (this.props.onPressEdit) this.props.onPressEdit();
  }

  render() {
    const {
      colors,
      isVisible,
      isLocationPhoneVisible,
      locationDescription,
      locationPhone,
      locationTitle,
      locationTimestampStart,
      locationTimestampEnd,
      onPressClose,
      __,
    } = this.props;

    const styles = {
      ...this.styles,
      modalButtonDelete: {
        ...this.styles.modalButtonDelete,
        backgroundColor: colors.ERROR,
      },
      modalButtonText: {
        ...this.styles.modalButtonText,
        color: colors.TEXT_ALT,
      },
      modalText: {
        ...this.styles.modalText,
        color: colors.TEXT,
      },
    };

    const showDescription = !!locationDescription && locationDescription.trim().length > 0;
    const showPhone = isLocationPhoneVisible && !!locationPhone && locationPhone.trim().length > 0;
    let timestampText = '';
    const showTimestamp = locationTimestampStart > 0;
    if (showTimestamp) {
      timestampText = moment(locationTimestampStart).format('LT');

      if (locationTimestampEnd && locationTimestampStart !== locationTimestampEnd) {
        timestampText = `${timestampText} - ${moment(locationTimestampEnd).format('LT')}`;
      }
    }

    return (
      <ModalDefault headline={locationTitle} isVisible={isVisible} onPressClose={onPressClose}>
        {showDescription && <Text style={styles.modalText}>{locationDescription}</Text>}

        {showPhone && <Text style={styles.modalText}>{locationPhone}</Text>}

        {showTimestamp && <Text style={styles.modalText}>{timestampText}</Text>}

        <TouchableOpacity onPress={this.onPressEdit}>
          <View style={styles.modalButton}>
            <Text style={styles.modalButtonText}>{__('entries.modals.more.edit')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onPressDelete}>
          <View style={{ ...styles.modalButton, ...styles.modalButtonDelete }}>
            <Text style={styles.modalButtonText}>{__('entries.modals.more.delete')}</Text>
          </View>
        </TouchableOpacity>
      </ModalDefault>
    );
  }
}

export const ModalLocationMore = withColorScheme(withI18n(withViewportUnits(ModalLocationMoreClass)));

class ModalPersonMoreClass extends React.Component {
  constructor(props) {
    super(props);

    this.onPressDelete = this.onPressDelete.bind(this);
    this.onPressEdit = this.onPressEdit.bind(this);
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
    modalButtonDelete: {
      //
    },
    modalButtonText: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(6),
      textTransform: 'lowercase',
    },
    modalText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.4),
      marginBottom: this.props.vw(5),
      paddingLeft: this.props.vw(3),
      paddingRight: this.props.vw(3),
    },
  });

  onPressDelete() {
    if (this.props.onPressDelete) this.props.onPressDelete();
  }

  onPressEdit() {
    if (this.props.onPressEdit) this.props.onPressEdit();
  }

  render() {
    const { allowDelete, allowUpdate, colors, isVisible, personName, personPhone, onPressClose, __ } = this.props;

    const showPhone = allowUpdate && !!personPhone && personPhone.trim().length > 0;

    const styles = {
      ...this.styles,
      modalButtonDelete: {
        ...this.styles.modalButtonDelete,
        backgroundColor: colors.ERROR,
      },
      modalButtonText: {
        ...this.styles.modalButtonText,
        color: colors.TEXT_ALT,
      },
      modalText: {
        ...this.styles.modalText,
        color: colors.TEXT,
      },
    };

    return (
      <ModalDefault headline={personName} isVisible={isVisible} onPressClose={onPressClose}>
        {showPhone && <Text style={styles.modalText}>{personPhone}</Text>}

        {allowUpdate && (
          <TouchableOpacity onPress={this.onPressEdit}>
            <View style={styles.modalButton}>
              <Text style={styles.modalButtonText}>{__('entries.modals.more.edit')}</Text>
            </View>
          </TouchableOpacity>
        )}

        {allowDelete && (
          <TouchableOpacity onPress={this.onPressDelete}>
            <View style={{ ...styles.modalButton, ...styles.modalButtonDelete }}>
              <Text style={styles.modalButtonText}>{__('entries.modals.more.delete')}</Text>
            </View>
          </TouchableOpacity>
        )}
      </ModalDefault>
    );
  }
}

export const ModalPersonMore = withColorScheme(withI18n(withViewportUnits(ModalPersonMoreClass)));
