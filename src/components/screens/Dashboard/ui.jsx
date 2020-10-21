import UilBars from '@iconscout/react-native-unicons/icons/uil-bars';
import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DayOverview from '../../widgets/DayOverview';
import Layout from '../../widgets/Layout';
import Header from '../../widgets/Header';
import { ALTERNATIVE_FONT_LANGUAGES, COLOR_PRIMARY, COLOR_SECONDARY, DAYS_OVERVIEW_MAX } from '../../../constants';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.closeFirstStartHint = this.closeFirstStartHint.bind(this);
    this.loadMoreDays = this.loadMoreDays.bind(this);
    this.openDay = this.openDay.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.openOverview = this.openOverview.bind(this);
  }

  today = moment().hours(0).minutes(0).seconds(0).milliseconds(0);

  totalTimespan = moment(this.today).subtract(DAYS_OVERVIEW_MAX, 'days');

  listItemHeight = ALTERNATIVE_FONT_LANGUAGES.includes(this.props.currentLanguage)
    ? this.props.vw(18.9)
    : this.props.vw(19.6);

  styles = StyleSheet.create({
    buttonOverview: {
      width: '100%',
    },
    daysList: {
      flex: 1,
      width: '100%',
    },
    headerContent: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    headerHeadline: {
      alignSelf: 'flex-start',
      fontFamily: this.props.getFontFamilyBold(),
      fontSize: this.props.vw(5),
      textTransform: 'lowercase',
    },
    headerButtons: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    headerButtonsItem: {
      alignItems: 'center',
      flexDirection: 'row',
      marginLeft: this.props.vw(3),
      marginTop: -this.props.vw(2),
      marginBottom: -this.props.vw(2),
      paddingTop: this.props.vw(2),
      paddingBottom: this.props.vw(2),
    },
    headerButtonsItemIconMenu: {
      marginTop: this.props.vw(0.4),
    },
    headerButtonsItemText: {
      color: '#555555',
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(3.8),
      marginLeft: this.props.vw(1),
      textTransform: 'lowercase',
    },
    loadMoreText: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(4.8),
      textTransform: 'lowercase',
    },
    loadMoreWrapper: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      height: this.listItemHeight,
      justifyContent: 'center',
      width: '100%',
    },
    view: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
    viewList: {
      backgroundColor: '#ffffff',
    },
    viewHint: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      flexDirection: 'column',
      justifyContent: 'center',
      opacity: 1,
      zIndex: 1,
      padding: this.props.vw(2.5),
      paddingBottom: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    viewHintInner: {
      alignItems: 'center',
      backgroundColor: COLOR_SECONDARY,
      borderRadius: this.props.vw(2.3),
      flex: 1,
      flexDirection: 'column',
      height: this.props.vw(60),
      justifyContent: 'center',
      padding: this.props.vw(5),
      width: '100%',
    },
    viewHintText: {
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(4.5),
      lineHeight: this.props.vw(7),
      textAlign: 'center',
    },
    viewHintButton: {
      marginTop: this.props.vw(5),
    },
    viewHintButtonText: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.getFontFamilyBold(),
      fontSize: this.props.vw(4.5),
      lineHeight: this.props.vw(7),
    },
  });

  closeFirstStartHint() {
    if (this.props.closeFirstStartHint) this.props.closeFirstStartHint();
  }

  loadMoreDays() {
    if (this.props.loadMoreDays) this.props.loadMoreDays();
  }

  openDay(timestamp) {
    if (this.props.openDay) this.props.openDay(timestamp, this.props.navigation);
  }

  openMenu() {
    this.props.navigation.navigate('Menu');
  }

  openOverview() {
    this.props.navigation.navigate('Overview');
  }

  render() {
    const { days, firstStartHintVisible, total, vw, __ } = this.props;

    return (
      <Layout>
        <View style={this.styles.view}>
          <Header>
            <View style={this.styles.headerContent}>
              <Text style={this.styles.headerHeadline}>coronika</Text>

              <View style={this.styles.headerButtons}>
                <TouchableOpacity onPress={this.openMenu} style={this.styles.headerButtonsItem}>
                  <UilBars color={'#000000'} size={vw(4.6)} style={this.styles.headerButtonsItemIconMenu} />

                  <Text style={this.styles.headerButtonsItemText}>{__('menu-screen.header.headline')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Header>

          <View style={{ ...this.styles.view, ...this.styles.viewList }}>
            {firstStartHintVisible && (
              <View style={this.styles.viewHint}>
                <View style={this.styles.viewHintInner}>
                  <Text style={this.styles.viewHintText}>{__('dashboard-screen.first-start.hint')}</Text>
                  <TouchableOpacity onPress={this.closeFirstStartHint} style={this.styles.viewHintButton}>
                    <Text style={this.styles.viewHintButtonText}>{__('Close')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {days.length > 0 && (
              <FlatList
                data={days}
                getItemLayout={(data, index) => ({
                  length: this.listItemHeight,
                  offset: this.listItemHeight * index,
                  index,
                })}
                inverted
                keyExtractor={({ timestamp }) => timestamp.toString()}
                renderItem={({ item: { loadMore, locations, persons, timestamp } }) => {
                  if (loadMore) {
                    return (
                      <View style={this.styles.loadMoreWrapper}>
                        <TouchableOpacity onPress={this.loadMoreDays}>
                          <Text style={this.styles.loadMoreText}>{__('dashboard-screen.list.load-more')}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }

                  return (
                    <TouchableOpacity onPress={() => this.openDay(timestamp)}>
                      <DayOverview
                        isEmphasized={timestamp === this.today.valueOf()}
                        isTranslucent={firstStartHintVisible && timestamp !== this.today.valueOf()}
                        locations={locations.length}
                        persons={persons.length}
                        showIcons={firstStartHintVisible && timestamp === this.today.valueOf()}
                        timestamp={timestamp}
                        today={this.today}
                      />
                    </TouchableOpacity>
                  );
                }}
                style={this.styles.daysList}
              />
            )}

            <TouchableOpacity onPress={this.openOverview} style={this.styles.buttonOverview}>
              <DayOverview
                isDark
                isTotal
                isTranslucent={firstStartHintVisible}
                locations={total.locations}
                persons={total.persons}
                timestamp={this.totalTimespan.valueOf()}
                today={this.today}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    );
  }
}

export default Dashboard;
