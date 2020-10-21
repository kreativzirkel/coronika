import UilSearch from '@iconscout/react-native-unicons/icons/uil-search';
import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.onPressSearchIcon = this.onPressSearchIcon.bind(this);
    this.setSearchValue = this.setSearchValue.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.searchValue !== this.props.searchValue;
  }

  styles = StyleSheet.create({
    searchIcon: {
      alignItems: 'center',
      bottom: 0,
      height: '100%',
      justifyContent: 'center',
      margin: 'auto',
      position: 'absolute',
      right: this.props.vw(3),
      top: 0,
      width: this.props.vw(12),
      zIndex: 2,
    },
    searchInput: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
      color: '#000000',
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(4),
      height: this.props.vw(13),
      marginLeft: this.props.vw(2.5),
      marginRight: this.props.vw(2.5),
      padding: this.props.vw(3.5),
      paddingRight: this.props.vw(12),
      zIndex: 1,
    },
    searchWrapper: {
      width: '100%',
    },
  });

  onPressSearchIcon() {
    if (this.props.onPressSearchIcon) this.props.onPressSearchIcon();
  }

  setSearchValue(value) {
    if (this.props.setSearchValue) this.props.setSearchValue(value);
  }

  render() {
    const { innerRef, searchValue, vw, __ } = this.props;

    return (
      <View style={this.styles.searchWrapper}>
        <TouchableOpacity onPress={this.onPressSearchIcon} style={this.styles.searchIcon}>
          {searchValue.length > 0 ? (
            <UilTimes size={vw(8)} color={COLOR_PRIMARY} />
          ) : (
            <UilSearch size={vw(8)} color={COLOR_PRIMARY} />
          )}
        </TouchableOpacity>

        <TextInput
          autoCompleteType={'off'}
          autoCorrect={false}
          onChangeText={this.setSearchValue}
          /* onSubmitEditing={() => this.onSubmitEditing()} */
          placeholder={__('placeholder.search-input').toLowerCase()}
          placeholderTextColor={'#B0B0B1'}
          ref={innerRef}
          returnKeyType={'search'}
          style={this.styles.searchInput}
          textContentType={'none'}
          value={searchValue}
        />
      </View>
    );
  }
}

/* eslint-disable-next-line react/jsx-props-no-spreading */
export default withI18n(withViewportUnits(React.forwardRef((props, ref) => <SearchBar innerRef={ref} {...props} />)));
