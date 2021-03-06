import UilCommentInfoAlt from '@iconscout/react-native-unicons/icons/uil-comment-info-alt';
import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../../constants';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import DateTimePickerModal from '../../widgets/DateTimePickerModal';
import ModalDefault from '../../widgets/ModalDefault';

class ModalPersonClass extends React.Component {
  constructor(props) {
    super(props);

    this.setPersonDisplayName = this.setPersonDisplayName.bind(this);
    this.setPersonName = this.setPersonName.bind(this);
    this.setPersonPhone = this.setPersonPhone.bind(this);
    this.setPersonMail = this.setPersonMail.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.isVisible !== this.props.isVisible ||
      nextProps.personDisplayName !== this.props.personDisplayName ||
      nextProps.personName !== this.props.personName ||
      nextProps.personPhone !== this.props.personPhone ||
      nextProps.personMail !== this.props.personMail ||
      nextProps.buttonConfirmDisabled !== this.props.buttonConfirmDisabled ||
      nextProps.buttonConfirmLabel !== this.props.buttonConfirmLabel
    );
  }

  styles = StyleSheet.create({
    hintWrapper: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginBottom: this.props.vw(4),
    },
    hintIcon: {
      marginRight: this.props.vw(2.5),
      marginTop: this.props.vw(0),
    },
    hintText: {
      flex: 1,
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
    },
    modalText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.4),
      marginBottom: this.props.vw(5),
      paddingLeft: this.props.vw(3),
      paddingRight: this.props.vw(3),
    },
    modalTextInput: {
      borderRadius: this.props.vw(2.3),
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
      height: this.props.vw(14),
      marginBottom: this.props.vw(4),
      padding: this.props.vw(4),
    },
    modalTextInputDisabled: {
      //
    },
  });

  setPersonDisplayName(value) {
    if (this.props.setPersonDisplayName) this.props.setPersonDisplayName(value);
  }

  setPersonName(value) {
    if (this.props.setPersonName) this.props.setPersonName(value);
  }

  setPersonPhone(value) {
    if (this.props.setPersonPhone) this.props.setPersonPhone(value);
  }

  setPersonMail(value) {
    if (this.props.setPersonMail) this.props.setPersonMail(value);
  }

  render() {
    const {
      buttonConfirmDisabled,
      buttonConfirmLabel,
      colors,
      headline,
      isImported,
      isVisible,
      onPressClose,
      onPressConfirm,
      personDisplayName,
      personName,
      personPhone,
      personMail,
      vw,
      __,
    } = this.props;

    const styles = {
      ...this.styles,
      hintText: {
        ...this.styles.hintText,
        color: colors.TEXT,
      },
      modalText: {
        ...this.styles.modalText,
        color: colors.TEXT,
      },
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
        {!isImported && (
          <TextInput
            autoCompleteType={'off'}
            autoCorrect={false}
            onChangeText={this.setPersonName}
            placeholder={`${__('entries.modals.new-person.placeholder.name').toLowerCase()} *`}
            placeholderTextColor={'#B0B0B1'}
            style={styles.modalTextInput}
            textContentType={'none'}
            value={personName}
          />
        )}

        {isImported && <Text style={styles.modalText}>{personName}</Text>}

        {isImported && (
          <TextInput
            autoCompleteType={'off'}
            autoCorrect={false}
            onChangeText={this.setPersonDisplayName}
            placeholder={__('entries.modals.new-person.placeholder.display-name').toLowerCase()}
            placeholderTextColor={'#B0B0B1'}
            style={styles.modalTextInput}
            textContentType={'none'}
            value={personDisplayName}
          />
        )}

        {!isImported && (
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
        )}

        {!isImported && (
          <TextInput
            autoCompleteType={'off'}
            autoCorrect={false}
            onChangeText={this.setPersonMail}
            placeholder={__('entries.modals.new-person.placeholder.mail').toLowerCase()}
            placeholderTextColor={'#B0B0B1'}
            style={styles.modalTextInput}
            textContentType={'none'}
            value={personMail}
          />
        )}

        {!isImported && (
          <View style={styles.hintWrapper}>
            <UilCommentInfoAlt color={COLOR_PRIMARY} size={vw(6)} style={styles.hintIcon} />
            <Text style={styles.hintText}>{__('entries.modals.new-person.hint.phone-number')}</Text>
          </View>
        )}
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
      height: this.props.vw(14),
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
          placeholder={`${__('entries.modals.new-location.placeholder.title').toLowerCase()} *`}
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
    modalText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.4),
      marginBottom: this.props.vw(5),
      paddingLeft: this.props.vw(3),
      paddingRight: this.props.vw(3),
    },
    modalTextInput: {
      borderRadius: this.props.vw(2.3),
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
      height: this.props.vw(14),
      marginBottom: this.props.vw(4),
      padding: this.props.vw(4),
    },
    modalTextInputTime: {
      paddingTop: this.props.vw(4.6),
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
      modalText: {
        ...this.styles.modalText,
        color: colors.TEXT,
      },
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
        <Text style={styles.modalText}>{locationTitle}</Text>

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
          <View style={{ ...styles.modalButton, ...styles.modalButtonDefault }}>
            <Text style={{ ...styles.modalButtonText, ...styles.modalButtonDefaultText }}>
              {__('entries.modals.more.edit')}
            </Text>
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
    this.onPressHide = this.onPressHide.bind(this);
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

  onPressDelete() {
    if (this.props.onPressDelete) this.props.onPressDelete();
  }

  onPressEdit() {
    if (this.props.onPressEdit) this.props.onPressEdit();
  }

  onPressHide() {
    if (this.props.onPressHide) this.props.onPressHide();
  }

  render() {
    const {
      allowDelete,
      allowHide,
      allowUpdate,
      colors,
      isImported,
      isVisible,
      personDisplayName,
      personName,
      personPhone,
      personMail,
      onPressClose,
      __,
    } = this.props;

    const headline = isImported
      ? !!personDisplayName && personDisplayName.trim().length > 0
        ? personDisplayName
        : personName
      : personName;

    const showName = isImported && !!personDisplayName && personDisplayName.trim().length > 0;
    const showPhone = allowUpdate && !isImported && !!personPhone && personPhone.trim().length > 0;
    const showMail = allowUpdate && !isImported && !!personMail && personMail.trim().length > 0;

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
      <ModalDefault headline={headline} isVisible={isVisible} onPressClose={onPressClose}>
        {showName && <Text style={styles.modalText}>{personName}</Text>}

        {showPhone && <Text style={styles.modalText}>{personPhone}</Text>}

        {showMail && <Text style={styles.modalText}>{personMail}</Text>}

        {allowUpdate && (
          <TouchableOpacity onPress={this.onPressEdit}>
            <View style={{ ...styles.modalButton, ...styles.modalButtonDefault }}>
              <Text style={{ ...styles.modalButtonText, ...styles.modalButtonDefaultText }}>
                {__('entries.modals.more.edit')}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {allowHide && (
          <TouchableOpacity onPress={this.onPressHide}>
            <View style={{ ...styles.modalButton, ...styles.modalButtonDefault }}>
              <Text style={{ ...styles.modalButtonText, ...styles.modalButtonDefaultText }}>
                {__('entries.modals.more.hide')}
              </Text>
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
