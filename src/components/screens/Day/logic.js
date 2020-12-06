import cloneDeep from 'lodash/cloneDeep';
import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import { setData } from '../Encounter/actions';
import { setTimestamp, showDateSwitcherModal, hideDateSwitcherModal } from './actions';
import Screen from './ui';

const openEncounter = (id, navigation) => async (dispatch, getState) => {
  const {
    dashboard: { days },
    day: { timestamp },
  } = getState();

  const encounter = days[timestamp].encounters.find((item) => item.id === id);

  if (encounter) {
    dispatch(setData(encounter));

    navigation.navigate('Encounter');
  }
};

const getEncountersForList = (encounters, locations, persons) => {
  const result = cloneDeep(encounters || []);

  result.forEach((encounter) => {
    let title = '';

    if (encounter.location) {
      encounter.location = locations.find(({ id }) => id === encounter.location)?.title || '';
      title = encounter.location;
    }

    if (encounter.persons?.length > 0) {
      const encounterPersons = encounter.persons
        .map((id) => persons.find((p) => p.id === id))
        .sort((a, b) => {
          const fullNameA = a?.fullNameDisplay?.toLowerCase() || a.fullName.toLowerCase();
          const fullNameB = b?.fullNameDisplay?.toLowerCase() || b.fullName.toLowerCase();
          if (fullNameA < fullNameB) {
            return -1;
          }
          if (fullNameA > fullNameB) {
            return 1;
          }

          return 0;
        });

      title = encounterPersons[0].fullNameDisplay || encounterPersons[0].fullName;

      if (encounterPersons.length > 1) {
        title += `, +${encounterPersons.length - 1}`;
      }
    }

    encounter.title = title;
  });

  result.sort(encountersSortingFunction);

  return result;
};

const encountersSortingFunction = (a, b) => {
  const timestampA = a.timestampStart || 0;
  const timestampB = b.timestampStart || 0;

  if (timestampA < timestampB) return -1;

  if (timestampA > timestampB) return 1;

  return 0;
};

const mapStateToProps = ({
  dashboard: { days },
  day: { isDateSwitcherModalVisible, timestamp },
  directory: { locations, persons },
}) => {
  const dayEncounters = getEncountersForList(days[timestamp]?.encounters, locations, persons);

  const daysList = Object.keys(days)
    .map((key) => parseInt(key, 10))
    .sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;

      return 0;
    });

  return {
    daysList,
    encounters: dayEncounters,
    isDateSwitcherModalVisible,
    timestamp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openEncounter: (id, navigation) => dispatch(openEncounter(id, navigation)),
    setTimestamp: (timestamp) => dispatch(setTimestamp(timestamp)),
    showDateSwitcherModal: () => dispatch(showDateSwitcherModal()),
    hideDateSwitcherModal: () => dispatch(hideDateSwitcherModal()),
  };
};

const Day = withColorScheme(withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen))));

export default Day;
