import UilCommentInfoAlt from '@iconscout/react-native-unicons/icons/uil-comment-info-alt';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';
import ModalDefault from './ModalDefault';

class ModalPerson extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      personDisplayName: this.props.personDisplayName || '',
      personMail: this.props.personMail || '',
      personName: this.props.personName || '',
      personPhone: this.props.personPhone || '',
    };

    this.onPressClose = this.onPressClose.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.reset = this.reset.bind(this);
    this.setPersonDisplayName = this.setPersonDisplayName.bind(this);
    this.setPersonMail = this.setPersonMail.bind(this);
    this.setPersonName = this.setPersonName.bind(this);
    this.setPersonPhone = this.setPersonPhone.bind(this);
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

  onPressClose() {
    this.reset();
    this.props.onPressClose();
  }

  onPressConfirm() {
    if (this.props.onPressConfirm) {
      const { id } = this.props;
      const { personMail, personName, personPhone } = this.state;
      this.props.onPressConfirm(id, personName, personPhone, personMail);
    }

    this.reset();
  }

  reset() {
    this.setState({
      personDisplayName: '',
      personMail: '',
      personName: '',
      personPhone: '',
    });
  }

  setPersonDisplayName(value) {
    this.setState({ personDisplayName: value });
  }

  setPersonMail(value) {
    this.setState({ personMail: value });
  }

  setPersonName(value) {
    this.setState({ personName: value });
  }

  setPersonPhone(value) {
    this.setState({ personPhone: value });
  }

  render() {
    const { colors, id, isVisible, onModalHide, vw, __ } = this.props;
    const { personDisplayName, personMail, personName, personPhone } = this.state;

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

    const buttonConfirmDisabled = personName.length < 3;
    const isImported = false;

    return (
      <ModalDefault
        buttonConfirmLabel={
          id !== undefined ? __('entries.modals.update-person.button') : __('entries.modals.new-person.button')
        }
        buttonConfirmDisabled={buttonConfirmDisabled}
        headline={
          id !== undefined ? __('entries.modals.update-person.headline') : __('entries.modals.new-person.headline')
        }
        isVisible={isVisible}
        onModalHide={onModalHide}
        onPressClose={this.onPressClose}
        onPressConfirm={this.onPressConfirm}>
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

export default withColorScheme(withI18n(withViewportUnits(ModalPerson)));
