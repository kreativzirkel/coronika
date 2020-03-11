import UilSearch from '@iconscout/react-native-unicons/icons/uil-search';
import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';

const SearchBar = React.forwardRef(({ onPressSearchIcon, searchValue, setSearchValue, vw, __ }, ref) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    searchIcon: {
      alignItems: 'center',
      bottom: 0,
      height: '100%',
      justifyContent: 'center',
      margin: 'auto',
      position: 'absolute',
      right: 20,
      top: 0,
      width: 30,
      zIndex: 2,
    },
    searchInput: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
      color: '#000000',
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4),
      height: vw(13),
      marginLeft: vw(2.5),
      marginRight: vw(2.5),
      padding: vw(3.5),
      zIndex: 1,
    },
    searchWrapper: {
      width: '100%',
    },
  });

  return (
    <View style={styles.searchWrapper}>
      <TouchableOpacity onPress={() => onPressSearchIcon()} style={styles.searchIcon}>
        {searchValue.length > 0 ? (
          <UilTimes size={vw(8)} color={COLOR_PRIMARY} />
        ) : (
          <UilSearch size={vw(8)} color={COLOR_PRIMARY} />
        )}
      </TouchableOpacity>

      <TextInput
        autoCompleteType={'off'}
        autoCorrect={false}
        onChangeText={(value) => setSearchValue(value)}
        /* onSubmitEditing={() => this.onSubmitEditing()} */
        placeholder={__('placeholder.search-input').toLowerCase()}
        placeholderTextColor={'#B0B0B1'}
        ref={ref}
        returnKeyType={'search'}
        style={styles.searchInput}
        textContentType={'none'}
        value={searchValue}
      />
    </View>
  );
});

export default withI18n(withViewportUnits(SearchBar));
