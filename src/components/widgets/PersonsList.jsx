import UilEllipsisV from '@iconscout/react-native-unicons/icons/uil-ellipsis-v';
import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import UilMobileAndroid from '@iconscout/react-native-unicons/icons/uil-mobile-android';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import cloneDeep from 'lodash/cloneDeep';
import deepEqual from 'fast-deep-equal';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';
import ListItemSeparator from './ListItemSeparator';
import withI18n from '../../i18n';

class PersonListItemClass extends React.Component {
  constructor(props) {
    super(props);

    this.openMore = this.openMore.bind(this);
    this.PersonItemComponent = this.PersonItemComponent.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props.isPersonSelected !== nextProps.isPersonSelected || this.props.fullName !== nextProps.fullName;
  }

  styles = StyleSheet.create({
    moreButton: {
      alignItems: 'center',
      bottom: 0,
      flexDirection: 'row',
      padding: this.props.vw(2),
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
    person: {
      borderRadius: this.props.vw(2.3),
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    },
    personTextIconImported: {
      marginLeft: this.props.vw(1.5),
    },
    personTextWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    personTextWrapperWithPadding: {
      paddingRight: this.props.vw(9),
    },
    selectButton: {
      alignItems: 'center',
      bottom: 0,
      flexDirection: 'row',
      marginBottom: -this.props.vw(1.25),
      marginTop: -this.props.vw(1.25),
      position: 'absolute',
      right: this.props.vw(3),
      top: 0,
      zIndex: 1,
    },
    selectButtonInner: {
      backgroundColor: 'transparent',
      borderRadius: 50,
    },
    selectButtonInnerSelected: {
      backgroundColor: COLOR_PRIMARY,
    },
    viewCounter: {
      alignItems: 'center',
      bottom: 0,
      flexDirection: 'row',
      marginBottom: -this.props.vw(1.2),
      marginTop: -this.props.vw(1.2),
      position: 'absolute',
      right: this.props.vw(3),
      top: 0,
      zIndex: 1,
    },
    viewCounterText: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(6),
    },
  });

  openMore() {
    if (this.props.onPressMore)
      this.props.onPressMore(this.props.id, this.props.fullName, this.props.phoneNumbers[0]?.number);
  }

  toggleSelection = () => {
    requestAnimationFrame(() => {
      this.props.toggleSelection(this.props.id);
    });
  };

  PersonItemComponent() {
    const {
      allowPersonDelete,
      allowSelection,
      colors,
      counter,
      fullName,
      isPersonSelected,
      recordID,
      showCounter,
      vw,
    } = this.props;

    return (
      <View style={{ ...this.styles.person, backgroundColor: colors.SECONDARY }}>
        <View
          style={{
            ...this.styles.personTextWrapper,
            ...((allowPersonDelete || allowSelection || showCounter) && this.styles.personTextWrapperWithPadding),
          }}>
          <Text numberOfLines={1} style={{ ...this.styles.personText, color: colors.TEXT }}>
            {fullName}
          </Text>

          {recordID !== undefined && (
            <View style={this.styles.personTextIconImported}>
              <UilMobileAndroid color={colors.GRAY_3} size={vw(5)} />
            </View>
          )}
        </View>

        {allowSelection && (
          <View style={this.styles.selectButton}>
            <View
              style={{
                ...this.styles.selectButtonInner,
                ...(isPersonSelected && this.styles.selectButtonInnerSelected),
              }}>
              {isPersonSelected ? (
                <UilMinus size={vw(7)} color={colors.TEXT_ALT} />
              ) : (
                <UilPlus size={vw(7)} color={COLOR_PRIMARY} />
              )}
            </View>
          </View>
        )}

        {allowPersonDelete && (
          <TouchableOpacity onPress={this.openMore} style={this.styles.moreButton}>
            <UilEllipsisV size={vw(7)} color={COLOR_PRIMARY} />
          </TouchableOpacity>
        )}

        {showCounter && (
          <View style={this.styles.viewCounter}>
            <Text style={this.styles.viewCounterText}>{counter}</Text>
          </View>
        )}
      </View>
    );
  }

  render() {
    const { allowSelection } = this.props;

    const PersonItem = this.PersonItemComponent;

    return allowSelection ? (
      <TouchableOpacity onPress={this.toggleSelection}>
        <PersonItem />
      </TouchableOpacity>
    ) : (
      <PersonItem />
    );
  }
}

const PersonsListItem = withColorScheme(withI18n(withViewportUnits(PersonListItemClass)));

const sortPersons = (inputPersonsList, orderByLastUsage = false) => {
  if (orderByLastUsage && inputPersonsList) {
    inputPersonsList.sort((a, b) => {
      const lastUsedA = a.lastUsed || 0;
      const lastUsedB = b.lastUsed || 0;

      if (lastUsedA > lastUsedB) {
        return -1;
      }

      if (lastUsedA < lastUsedB) {
        return 1;
      }

      const fullNameA = a.fullName.toLowerCase();
      const fullNameB = b.fullName.toLowerCase();

      if (fullNameA < fullNameB) {
        return -1;
      }

      if (fullNameA > fullNameB) {
        return 1;
      }

      return 0;
    });

    if (
      !inputPersonsList.find(({ separatorItem }) => separatorItem === true) &&
      inputPersonsList.find(({ lastUsed, separatorItem }) => !separatorItem && !lastUsed)
    ) {
      const persons = cloneDeep(inputPersonsList);
      for (const i in persons) {
        if (Object.prototype.hasOwnProperty.call(persons, i)) {
          const p = persons[i];
          const index = parseInt(i, 10);

          if (index === 0 && !p.lastUsed) break;

          if (index > 0 && !p.lastUsed) {
            persons.splice(i, 0, { fullName: '', id: `persons-separator-${i}`, separatorItem: true });
            break;
          }
        }
      }

      return persons;
    }
  }

  return inputPersonsList;
};

class PersonsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: sortPersons(this.props.persons, this.props.orderByLastUsage),
      personsRaw: this.props.persons,
      personsLength: this.props.persons.length,
      selectedPersonsLength: this.props.selectedPersons.length,
    };

    this.getItemLayout = this.getItemLayout.bind(this);
    this.onPressMorePerson = this.onPressMorePerson.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.persons.length !== state.personsLength ||
      props.selectedPersons.length !== state.selectedPersonsLength ||
      !deepEqual(props.persons, state.personsRaw)
    ) {
      return {
        persons: sortPersons(props.persons, props.orderByLastUsage),
        personsRaw: props.persons,
        personsLength: props.persons.length,
        selectedPersonsLength: props.selectedPersons.length,
      };
    }

    return null;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.persons.length !== this.state.personsLength ||
      nextProps.selectedPersons.length !== this.state.selectedPersonsLength ||
      !deepEqual(nextProps.persons, this.state.personsRaw)
    );
  }

  listItemHeight = this.props.vw(15.4);

  styles = StyleSheet.create({
    personsList: {
      flex: 1,
      paddingBottom: this.props.vw(2.3),
      width: '100%',
    },
  });

  onPressMorePerson(personId, personName, personPhone) {
    if (this.props.openItemMore) this.props.openItemMore(personId, personName, personPhone);
  }

  toggleSelection(id) {
    if (this.props.toggleSelection) this.props.toggleSelection(id);
  }

  renderItem({ item: { counter, fullName, id, phoneNumbers, recordID, separatorItem } }) {
    if (separatorItem) {
      return <ListItemSeparator />;
    }

    const {
      allowDelete,
      allowSelection,
      allowUpdate,
      disableDeleteImportedPersons,
      selectedPersons,
      showCounter,
    } = this.props;

    return (
      <PersonsListItem
        allowPersonDelete={allowDelete && (recordID !== undefined ? !disableDeleteImportedPersons : true)}
        allowPersonUpdate={allowUpdate && recordID === undefined}
        allowSelection={allowSelection}
        counter={counter}
        fullName={fullName}
        id={id}
        isPersonSelected={allowSelection && selectedPersons.includes(id)}
        onPressMore={this.onPressMorePerson}
        phoneNumbers={phoneNumbers}
        recordID={recordID}
        showCounter={showCounter}
        toggleSelection={this.toggleSelection}
      />
    );
  }

  getItemLayout(data, index) {
    return { length: this.listItemHeight, offset: this.listItemHeight * index, index };
  }

  render() {
    const { persons } = this.state;

    return persons ? (
      <FlatList
        data={persons}
        getItemLayout={this.getItemLayout}
        initialNumToRender={10}
        keyExtractor={({ id }) => id}
        removeClippedSubviews={true}
        renderItem={this.renderItem}
        style={this.styles.personsList}
        windowSize={5}
      />
    ) : null;
  }
}

export default withViewportUnits(PersonsList);
