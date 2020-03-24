import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import withViewportUnits from '../../../utils/withViewportUnits';
import Screen from './ui';

const sortByCounter = (a, b) => {
  if (a.counter < b.counter) {
    return 1;
  }
  if (a.counter > b.counter) {
    return -1;
  }

  return 0;
};

const mapStateToProps = ({ dashboard: { days } }) => {
  const total = Object.values(days)
    .map(({ persons, locations }) => ({ persons: persons.length, locations: locations.length }))
    .reduce(
      (accumulator, currentValue) => ({
        persons: accumulator.persons + currentValue.persons,
        locations: accumulator.locations + currentValue.locations,
      }),
      { persons: 0, locations: 0 }
    );

  const locations = {};
  const persons = {};

  const daysSorted = Object.values(days).sort((a, b) => {
    if (a.timestamp < b.timestamp) {
      return 1;
    }
    if (a.timestamp > b.timestamp) {
      return -1;
    }

    return 0;
  });

  daysSorted.forEach((day) => {
    day.locations.forEach(({ id, title }) => {
      if (Object.values(locations).find((l) => l.id === id)) {
        locations[id].counter += 1;
      } else {
        locations[id] = { counter: 1, id, title };
      }
    });

    day.persons.forEach(({ fullName, id }) => {
      if (Object.values(persons).find((p) => p.id === id)) {
        persons[id].counter += 1;
      } else {
        persons[id] = { counter: 1, fullName, id };
      }
    });
  });

  const locationsSorted = Object.values(locations).sort((a, b) => sortByCounter(a, b));
  const personsSorted = Object.values(persons).sort((a, b) => sortByCounter(a, b));

  return { locations: locationsSorted, persons: personsSorted, total };
};

const mapDispatchToProps = (/* dispatch */) => {
  return {};
};

const Container = container(Screen, {
  componentDidMount() {},
});

const Overview = withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Container)));

export default Overview;
