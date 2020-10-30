import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import { addPersonToDay, addLocationToDay } from '../Dashboard/actions';
import { setTimestamp } from '../Day/actions';
import { updateLastUsageOfLocation, updateLastUsageOfPerson } from '../Directory/actions';
import { showDateSwitcherModal, hideDateSwitcherModal } from './actions';
import Screen from './ui';
import { Keyboard } from 'react-native';

const addSelection = (selection) => async (dispatch, getState) => {
  const {
    directory: { persons, locations },
    day: { timestamp },
  } = getState();

  selection.persons.forEach((personId) => {
    const person = persons.find(({ id }) => id === personId);

    if (person) {
      dispatch(addPersonToDay(timestamp, person));
      dispatch(updateLastUsageOfPerson(personId));
    }
  });

  selection.locations.forEach(
    ({ description, id: locationId, timestamp: locationTimestamp, timestampEnd: locationTimestampEnd }) => {
      const location = locations.find(({ id }) => id === locationId);
      const newLocation = {
        ...location,
        description,
        timestamp: locationTimestamp,
        timestampEnd: locationTimestampEnd,
      };

      dispatch(addLocationToDay(timestamp, newLocation));
      dispatch(updateLastUsageOfLocation(locationId));
    }
  );
};

const openDateSwitcherModal = () => async (dispatch) => {
  Keyboard.dismiss();
  dispatch(showDateSwitcherModal());
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

const mapStateToProps = ({
  addEntry: { isDateSwitcherModalVisible },
  directory: { persons, locations },
  dashboard: { days },
  day: { timestamp },
}) => {
  persons.sort((a, b) => personsSortingFunction(a, b));
  locations.sort((a, b) => locationsSortingFunction(a, b));

  const dayPersons = days[timestamp]?.persons || [];
  const availablePersons = persons.filter(
    ({ id }) => dayPersons.find(({ id: dayPersonId }) => id === dayPersonId) === undefined
  );

  const daysList = Object.keys(days)
    .map((key) => parseInt(key, 10))
    .sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;

      return 0;
    });

  return {
    daysList,
    isDateSwitcherModalVisible,
    persons: availablePersons,
    locations,
    timestamp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSelection: (selection) => dispatch(addSelection(selection)),
    hideDateSwitcherModal: () => dispatch(hideDateSwitcherModal()),
    showDateSwitcherModal: () => dispatch(openDateSwitcherModal()),
    setTimestamp: (timestamp) => dispatch(setTimestamp(timestamp)),
  };
};

const AddEntry = withColorScheme(withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen))));

export default AddEntry;
