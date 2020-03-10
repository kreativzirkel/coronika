import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import { setTimestamp as setTimestampDay } from '../Day/actions';
import Screen from './ui';

const daysSortingFunction = (a, b) => {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }

  return 0;
};

const openDay = (timestamp, navigation) => async (dispatch, getState) => {
  dispatch(setTimestampDay(timestamp));

  navigation.navigate('Day');
};

const mapStateToProps = ({ app: { days } }) => {
  const daysList = Object.keys(days)
    .sort((a, b) => daysSortingFunction(a, b))
    .map((timestamp) => days[timestamp]);

  const total = Object.values(days)
    .map(({ contacts, locations }) => ({ contacts: contacts.length, locations: locations.length }))
    .reduce(
      (accumulator, currentValue) => ({
        contacts: accumulator.contacts + currentValue.contacts,
        locations: accumulator.locations + currentValue.locations,
      }),
      { contacts: 0, locations: 0 }
    );

  return {
    days: daysList,
    total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openDay: (timestamp, navigation) => dispatch(openDay(timestamp, navigation)),
  };
};

const Container = container(Screen, {
  componentDidMount() {},
});

const Dashboard = withI18n(connect(mapStateToProps, mapDispatchToProps)(Container));

export default Dashboard;
