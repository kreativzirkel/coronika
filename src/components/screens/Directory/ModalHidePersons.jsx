import UilCheckCircle from '@iconscout/react-native-unicons/icons/uil-check-circle';
import UilCircle from '@iconscout/react-native-unicons/icons/uil-circle';
import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import withColorScheme from '../../../utils/withColorScheme';
import withI18n from '../../../i18n';
import withViewportUnits from '../../../utils/withViewportUnits';
import { COLOR_PRIMARY } from '../../../constants';
import deepEqual from 'fast-deep-equal';

class PersonsListItemClass extends React.Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.isSelected !== this.props.isSelected;
  }

  styles = StyleSheet.create({
    person: {
      alignItems: 'center',
      borderRadius: this.props.vw(2.3),
      flexDirection: 'row',
      marginLeft: this.props.vw(2.5),
      marginRight: this.props.vw(2.5),
      marginTop: this.props.vw(2.3),
      padding: this.props.vw(3),
      paddingBottom: this.props.vw(3.8),
      paddingTop: this.props.vw(3.8),
    },
    personText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.2),
      marginLeft: this.props.vw(3),
    },
  });

  onPress() {
    if (this.props.onPress) this.props.onPress(this.props.id);
  }

  render() {
    const { colors, isSelected, personName, vw } = this.props;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={{ ...this.styles.person, backgroundColor: colors.SECONDARY }}>
          {isSelected ? (
            <UilCheckCircle size={vw(5)} color={COLOR_PRIMARY} />
          ) : (
            <UilCircle size={vw(5)} color={colors.TEXT} />
          )}
          <Text numberOfLines={1} style={{ ...this.styles.personText, color: colors.TEXT }}>
            {personName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const PersonsListItem = withColorScheme(withI18n(withViewportUnits(PersonsListItemClass)));

class ModalHidePersons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: this.props.persons,
      selectedPersons: this.props.persons.filter(({ hidden }) => hidden).map(({ id }) => id),
    };

    this.closeModal = this.closeModal.bind(this);
    this.onPressConfirmSelection = this.onPressConfirmSelection.bind(this);
    this.onPressPersonsListItem = this.onPressPersonsListItem.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (!deepEqual(props.persons, state.persons)) {
      return {
        persons: props.persons,
        selectedPersons: props.persons.filter(({ hidden }) => hidden).map(({ id }) => id),
      };
    }

    return null;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.isVisible !== this.props.isVisible ||
      nextState.selectedPersons.length !== this.state.selectedPersons.length ||
      !deepEqual(nextProps.persons, this.state.persons)
    );
  }

  styles = StyleSheet.create({
    personsList: {
      height: this.props.vh(60),
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalButton: {
      alignItems: 'center',
      backgroundColor: COLOR_PRIMARY,
      borderRadius: this.props.vw(2.3),
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: this.props.vw(3),
      padding: this.props.vw(3.5),
    },
    modalButtonText: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(5),
      textTransform: 'lowercase',
    },
    modalContent: {
      borderTopLeftRadius: this.props.vw(2.3),
      borderTopRightRadius: this.props.vw(2.3),
      padding: this.props.vw(3),
      paddingBottom: this.props.vw(6),
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
  });

  closeModal() {
    if (this.props.closeModal) this.props.closeModal();
  }

  personsListGetItemKey({ id }) {
    return `persons-list-item-${id}`;
  }

  onPressConfirmSelection() {
    if (this.props.confirmSelection) this.props.confirmSelection(this.state.selectedPersons);
  }

  onPressPersonsListItem(personId) {
    const { selectedPersons } = this.state;
    if (selectedPersons.includes(personId)) {
      this.setState({ selectedPersons: selectedPersons.filter((id) => id !== personId) });
    } else {
      this.setState({ selectedPersons: [...selectedPersons, personId] });
    }
  }

  render() {
    const { colors, persons, isVisible, vw, __ } = this.props;
    const { selectedPersons } = this.state;

    const styles = {
      ...this.styles,
      modalButtonText: {
        ...this.styles.modalButtonText,
        color: colors.TEXT_ALT,
      },
      modalContent: {
        ...this.styles.modalContent,
        backgroundColor: colors.BACKGROUND,
      },
      modalHeaderText: {
        ...this.styles.modalHeaderText,
        color: colors.TEXT,
      },
    };

    return (
      <Modal
        backdropColor={colors.MODAL_BACKDROP_COLOR}
        hideModalContentWhileAnimating
        isVisible={isVisible}
        onBackButtonPress={this.closeModal}
        onBackdropPress={this.closeModal}
        statusBarTranslucent
        style={styles.modal}
        useNativeDriver>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text numberOfLines={1} style={styles.modalHeaderText}>
              {__('directory-screen.modals.hide-persons.headline')}
            </Text>
            <TouchableOpacity onPress={this.closeModal} style={styles.modalHeaderIcon}>
              <UilTimes size={vw(8)} color={COLOR_PRIMARY} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={persons}
            initialNumToRender={10}
            keyExtractor={this.personsListGetItemKey}
            removeClippedSubviews={true}
            renderItem={({ item: { id, fullName, fullNameDisplay, recordID } }) => {
              const personName =
                recordID !== undefined && !!fullNameDisplay && fullNameDisplay.trim().length > 0
                  ? fullNameDisplay
                  : fullName;

              return (
                <PersonsListItem
                  id={id}
                  onPress={this.onPressPersonsListItem}
                  personName={personName}
                  isSelected={selectedPersons.includes(id)}
                />
              );
            }}
            style={styles.personsList}
            windowSize={5}
          />

          <TouchableOpacity onPress={this.onPressConfirmSelection}>
            <View style={styles.modalButton}>
              <Text style={styles.modalButtonText}>{__('directory-screen.modals.hide-persons.button.save')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default withColorScheme(withI18n(withViewportUnits(ModalHidePersons)));
