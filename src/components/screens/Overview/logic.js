import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import {
  showLocationOverviewModal,
  hideLocationOverviewModal,
  showPersonOverviewModal,
  hidePersonOverviewModal,
  setSelectedLocationId,
  setSelectedPersonId,
} from './actions';
import Screen from './ui';

export const sortByFullName = (a, b) => {
  const fullNameA = a.fullName.toLowerCase();
  const fullNameB = b.fullName.toLowerCase();

  if (fullNameA < fullNameB) return -1;
  if (fullNameA > fullNameB) return 1;

  return 0;
};

export const sortByTitle = (a, b) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();

  if (titleA < titleB) return -1;
  if (titleA > titleB) return 1;

  return 0;
};

const selectLocation = (locationId) => async (dispatch) => {
  dispatch(setSelectedLocationId(locationId));
  dispatch(showLocationOverviewModal());
};

const selectPerson = (personId) => async (dispatch) => {
  dispatch(setSelectedPersonId(personId));
  dispatch(showPersonOverviewModal());
};

const mapStateToProps = ({
  dashboard: { days },
  directory: { locations: directoryLocations, persons: directoryPersons },
  overview: { isLocationOverviewModalVisible, isPersonOverviewModalVisible, selectedLocationId, selectedPersonId },
}) => {
  const total = Object.values(days)
    .map(({ persons, locations }) => ({
      persons: persons.map(({ id }) => id),
      locations: locations.map(({ id }) => id),
    }))
    .reduce(
      (accumulator, currentValue) => ({
        persons: [...accumulator.persons, ...currentValue.persons],
        locations: [...accumulator.locations, ...currentValue.locations],
      }),
      { persons: [], locations: [] }
    );

  total.locations = [...new Set(total.locations)].length;
  total.persons = [...new Set(total.persons)].length;

  const locations = {};
  const persons = {};

  const daysSorted = Object.values(days).sort((a, b) => {
    if (a.timestamp < b.timestamp) return 1;

    if (a.timestamp > b.timestamp) return -1;

    return 0;
  });

  daysSorted.forEach((day) => {
    day.locations.forEach(({ id, title }) => {
      if (Object.values(locations).find((l) => l.id === id)) {
        locations[id].counter += 1;
      } else {
        const defaultLocationTitle = directoryLocations?.find((l) => l.id === id)?.title;

        locations[id] = { counter: 1, id, title: defaultLocationTitle || title };
      }
    });

    day.persons.forEach(({ id }) => {
      if (Object.values(persons).find((p) => p.id === id)) {
        persons[id].counter += 1;
      } else {
        let fullName = '';
        const directoryPerson = directoryPersons?.find((p) => p.id === id);

        if (directoryPerson) {
          fullName =
            directoryPerson.recordID !== undefined &&
            !!directoryPerson.fullNameDisplay &&
            directoryPerson.fullNameDisplay.trim().length > 0
              ? directoryPerson.fullNameDisplay
              : directoryPerson.fullName;
        }

        persons[id] = { counter: 1, fullName, id };
      }
    });
  });

  const locationsSorted = Object.values(locations).sort((a, b) => sortByTitle(a, b));
  const personsSorted = Object.values(persons).sort((a, b) => sortByFullName(a, b));

  return {
    days,
    isLocationOverviewModalVisible,
    isPersonOverviewModalVisible,
    selectedLocationId,
    selectedPersonId,
    locations: locationsSorted,
    persons: personsSorted,
    total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideLocationOverviewModal: () => dispatch(hideLocationOverviewModal()),
    hidePersonOverviewModal: () => dispatch(hidePersonOverviewModal()),
    selectLocation: (locationId) => dispatch(selectLocation(locationId)),
    selectPerson: (personId) => dispatch(selectPerson(personId)),
  };
};

const Overview = withColorScheme(withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen))));

export default Overview;
