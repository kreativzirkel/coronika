import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
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

const mapStateToProps = ({
  dashboard: { days },
  directory: { locations: directoryLocations, persons: directoryPersons },
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

    day.persons.forEach(({ fullName, id }) => {
      if (Object.values(persons).find((p) => p.id === id)) {
        persons[id].counter += 1;
      } else {
        const defaultPersonFullName = directoryPersons?.find((p) => p.id === id)?.fullName;

        persons[id] = { counter: 1, fullName: defaultPersonFullName || fullName, id };
      }
    });
  });

  const locationsSorted = Object.values(locations).sort((a, b) => sortByTitle(a, b));
  const personsSorted = Object.values(persons).sort((a, b) => sortByFullName(a, b));

  return { locations: locationsSorted, persons: personsSorted, total };
};

const mapDispatchToProps = (/* dispatch */) => {
  return {};
};

const Overview = withColorScheme(withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen))));

export default Overview;
