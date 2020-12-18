import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import React, { Fragment } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';

class ModalDefaultClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderedBefore: false,
    };

    this.onModalHide = this.onModalHide.bind(this);
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
      fontSize: this.props.vw(5),
      textTransform: 'lowercase',
    },
  });

  showConfirmationButton = this.props.buttonConfirmLabel && this.props.onPressConfirm;

  onModalHide() {
    if (this.props.onModalHide) this.props.onModalHide();
  }

  onPressClose() {
    if (this.props.onPressClose) this.props.onPressClose();
  }

  onPressConfirm() {
    if (this.props.onPressConfirm) this.props.onPressConfirm();
  }

  render() {
    const {
      buttonConfirmDisabled,
      buttonConfirmLabel,
      children,
      colors,
      defaultKeyboardAvoidingViewDisabled,
      headline,
      isVisible,
      vw,
    } = this.props;
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
        onModalHide={this.onModalHide}
        statusBarTranslucent
        style={styles.modal}
        useNativeDriver>
        <KeyboardAvoidingView behavior={'padding'} enabled={!defaultKeyboardAvoidingViewDisabled}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text numberOfLines={1} style={styles.modalHeaderText}>
                {headline}
              </Text>
              <TouchableOpacity onPress={this.onPressClose} style={styles.modalHeaderIcon}>
                <UilTimes size={vw(8)} color={COLOR_PRIMARY} />
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

export default withColorScheme(withI18n(withViewportUnits(ModalDefaultClass)));
