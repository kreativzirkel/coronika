import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';
import ModalDefault from './ModalDefault';

class ModalLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationDescription: this.props.locationDescription || '',
      locationPhone: this.props.locationPhone || '',
      locationTitle: this.props.locationTitle || '',
    };

    this.onPressClose = this.onPressClose.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.reset = this.reset.bind(this);
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

  onPressClose() {
    this.reset();
    this.props.onPressClose();
  }

  onPressConfirm() {
    if (this.props.onPressConfirm) {
      const { id } = this.props;
      const { locationDescription, locationPhone, locationTitle } = this.state;
      this.props.onPressConfirm(id, locationTitle, locationDescription, locationPhone);
    }

    this.reset();
  }

  reset() {
    this.setState({
      locationDescription: '',
      locationPhone: '',
      locationTitle: '',
    });
  }

  setLocationDescription(value) {
    this.setState({ locationDescription: value });
  }

  setLocationPhone(value) {
    this.setState({ locationPhone: value });
  }

  setLocationTitle(value) {
    this.setState({ locationTitle: value });
  }

  render() {
    const { colors, id, isVisible, __ } = this.props;
    const { locationDescription, locationPhone, locationTitle } = this.state;

    const styles = {
      ...this.styles,
      modalTextInput: {
        ...this.styles.modalTextInput,
        backgroundColor: colors.SECONDARY,
        color: colors.TEXT,
      },
    };

    const buttonConfirmDisabled = locationTitle.length < 3;

    return (
      <ModalDefault
        buttonConfirmLabel={
          id !== undefined ? __('entries.modals.update-location.button') : __('entries.modals.new-location.button')
        }
        buttonConfirmDisabled={buttonConfirmDisabled}
        headline={
          id !== undefined ? __('entries.modals.update-location.headline') : __('entries.modals.new-location.headline')
        }
        isVisible={isVisible}
        onPressClose={this.onPressClose}
        onPressConfirm={this.onPressConfirm}>
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

export default withColorScheme(withI18n(withViewportUnits(ModalLocation)));
