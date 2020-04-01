import UilEllipsisV from '@iconscout/react-native-unicons/icons/uil-ellipsis-v';
import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import UilMobileAndroid from '@iconscout/react-native-unicons/icons/uil-mobile-android';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withViewportUnits from '../../utils/withViewportUnits';
import ListItem from './ListItem';
import ListItemSeparator from './ListItemSeparator';
import withI18n from '../../i18n';

class PersonListItemClass extends React.Component {
  constructor(props) {
    super(props);

    this.swipeable = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.isPersonSelected !== nextProps.isPersonSelected) return true;

    if (this.props.fullName !== nextProps.fullName) return true;

    return false;
  }

  openMore() {
    const { isRTL } = this.props;

    if (isRTL && this.swipeable.current.openLeft) {
      this.swipeable.current.openLeft();
    } else if (!isRTL && this.swipeable.current.openRight) {
      this.swipeable.current.openRight();
    }
  }

  render() {
    const {
      allowPersonDelete,
      allowPersonUpdate,
      allowSelection,
      counter,
      deleteItem,
      fullName,
      id,
      isPersonSelected,
      recordID,
      showCounter,
      toggleSelection,
      updateItem,
      getFontFamilyBold,
      getFontFamilyRegular,
      vw,
    } = this.props;

    const styles = StyleSheet.create({
      moreButton: {
        alignItems: 'center',
        bottom: 0,
        flexDirection: 'row',
        padding: vw(2),
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
      },
      person: {
        backgroundColor: COLOR_SECONDARY,
        borderRadius: vw(2.3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: vw(2.5),
        marginRight: vw(2.5),
        marginTop: vw(2.3),
        padding: vw(3),
        paddingBottom: vw(3.8),
        paddingTop: vw(3.8),
      },
      personText: {
        fontFamily: getFontFamilyRegular(),
        fontSize: vw(4.2),
      },
      personTextIconImported: {
        marginLeft: vw(1.5),
      },
      personTextWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      selectButton: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: -vw(1.25),
        marginTop: -vw(1.25),
      },
      selectButtonInner: {
        borderRadius: 50,
      },
      selectButtonInnerSelected: {
        backgroundColor: COLOR_PRIMARY,
      },
      viewCounter: {
        marginBottom: -vw(1.2),
        marginTop: -vw(1.2),
      },
      viewCounterText: {
        color: COLOR_PRIMARY,
        fontFamily: getFontFamilyBold(),
        fontSize: vw(6),
      },
    });

    const handleOnPressToggleSelection = (personId) => {
      requestAnimationFrame(() => {
        toggleSelection(personId);
      });
    };

    const PersonItem = () => (
      <View style={styles.person}>
        <View style={styles.personTextWrapper}>
          <Text style={styles.personText}>{fullName}</Text>

          {recordID !== undefined && (
            <View style={styles.personTextIconImported}>
              <UilMobileAndroid color={'#b0b0b0'} size={vw(5)} />
            </View>
          )}
        </View>

        {allowSelection && (
          <View style={styles.selectButton}>
            <View
              style={{
                ...styles.selectButtonInner,
                ...(isPersonSelected && styles.selectButtonInnerSelected),
              }}>
              {isPersonSelected ? (
                <UilMinus size={vw(7)} color={'#ffffff'} />
              ) : (
                <UilPlus size={vw(7)} color={COLOR_PRIMARY} />
              )}
            </View>
          </View>
        )}

        {allowPersonDelete && (
          <TouchableOpacity onPress={() => this.openMore()} style={styles.moreButton}>
            <UilEllipsisV size={vw(7)} color={COLOR_PRIMARY} />
          </TouchableOpacity>
        )}

        {showCounter && (
          <View style={styles.viewCounter}>
            <Text style={styles.viewCounterText}>{counter}</Text>
          </View>
        )}
      </View>
    );

    return (
      <ListItem allowDelete={allowPersonDelete} deleteItem={() => deleteItem(id)} ref={this.swipeable}>
        {allowPersonUpdate ? (
          <TouchableOpacity onPress={() => updateItem(id)}>
            <PersonItem />
          </TouchableOpacity>
        ) : allowSelection ? (
          <TouchableOpacity onPress={() => handleOnPressToggleSelection(id)}>
            <PersonItem />
          </TouchableOpacity>
        ) : (
          <PersonItem />
        )}
      </ListItem>
    );
  }
}

const PersonsListItem = withI18n(withViewportUnits(PersonListItemClass));

const PersonsList = ({
  allowDelete,
  allowSelection,
  allowUpdate,
  persons,
  deleteItem,
  disableDeleteImportedPersons,
  orderByLastUsage,
  selectedPersons,
  showCounter,
  toggleSelection,
  updateItem,
  vw,
}) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    personsList: {
      flex: 1,
      paddingBottom: vw(2.3),
      width: '100%',
    },
  });

  const listItemHeight = vw(15.4);

  if (orderByLastUsage && persons) {
    persons.sort((a, b) => {
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

    if (!persons.find(({ separatorItem }) => separatorItem === true)) {
      persons = cloneDeep(persons);
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
    }
  }

  return persons ? (
    <FlatList
      data={persons}
      getItemLayout={(data, index) => ({ length: listItemHeight, offset: listItemHeight * index, index })}
      initialNumToRender={50}
      keyExtractor={({ id }) => id}
      renderItem={({ item: { counter, fullName, id, recordID, separatorItem } }) => {
        if (separatorItem) {
          return <ListItemSeparator />;
        }

        return (
          <PersonsListItem
            allowPersonDelete={allowDelete && (recordID !== undefined ? !disableDeleteImportedPersons : true)}
            allowPersonUpdate={allowUpdate && recordID === undefined}
            allowSelection={allowSelection}
            counter={counter}
            deleteItem={() => deleteItem(id)}
            fullName={fullName}
            id={id}
            isPersonSelected={allowSelection && selectedPersons.includes(id)}
            recordID={recordID}
            showCounter={showCounter}
            toggleSelection={() => toggleSelection(id)}
            updateItem={() => updateItem(id)}
          />
        );
      }}
      style={styles.personsList}
    />
  ) : null;
};

export default withViewportUnits(PersonsList);
