import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import withViewportUnits from '../../../utils/withViewportUnits';
import { addPersonToDay, addLocationToDay } from '../../screens/Dashboard/actions';
import Screen from './ui';

const addSelection = (selection, navigation) => async (dispatch, getState) => {
  const {
    directory: { persons, locations },
    day: { timestamp },
  } = getState();

  selection.persons.forEach((personId) => {
    const person = persons.find(({ id }) => id === personId);

    if (person) {
      dispatch(addPersonToDay(timestamp, person));
    }
  });

  selection.locations.forEach(({ description, id: locationId, timestamp: locationTimestamp }) => {
    const location = locations.find(({ id }) => id === locationId);
    const newLocation = { ...location, description, timestamp: locationTimestamp };

    dispatch(addLocationToDay(timestamp, newLocation));
  });

  navigation.navigate('Day');
};

const personsSortingFunction = (a, b) => {
  const fullNameA = a.fullName.toLowerCase();
  const fullNameB = b.fullName.toLowerCase();
  if (fullNameA < fullNameB) {
    return -1;
  }
  if (fullNameA > fullNameB) {
    return 1;
  }

  return 0;
};

const locationsSortingFunction = (a, b) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }

  return 0;
};

const mapStateToProps = ({ directory: { persons, locations }, dashboard: { days }, day: { timestamp } }) => {
  persons.sort((a, b) => personsSortingFunction(a, b));
  locations.sort((a, b) => locationsSortingFunction(a, b));

  const dayPersons = days[timestamp]?.persons || [];
  const availablePersons = persons.filter(
    ({ id }) => dayPersons.find(({ id: dayPersonId }) => id === dayPersonId) === undefined
  );

  return {
    persons: availablePersons,
    locations,
    timestamp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSelection: (selection, navigation) => dispatch(addSelection(selection, navigation)),
  };
};

const Container = container(Screen, {
  componentDidMount() {},
});

const AddEntry = withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Container)));

export default AddEntry;
