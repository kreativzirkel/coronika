import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import { removePerson, removeLocation, showImportPersonsModal, hideImportPersonsModal } from './actions';
import importPersons from './importPersons';
import Screen from './ui';

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

const mapStateToProps = ({ directory: { persons, personsImporting, isImportPersonsModalVisible, locations } }) => {
  persons.sort((a, b) => personsSortingFunction(a, b));
  locations.sort((a, b) => locationsSortingFunction(a, b));

  return {
    persons,
    personsImporting,
    isImportPersonsModalVisible,
    locations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePerson: (personId) => dispatch(removePerson(personId)),
    deleteLocation: (locationId) => dispatch(removeLocation(locationId)),
    showImportPersonsModal: () => dispatch(showImportPersonsModal()),
    hideImportPersonsModal: () => dispatch(hideImportPersonsModal()),
    importPersons: (__) => dispatch(importPersons(__, true)),
  };
};

const Directory = withColorScheme(withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen))));

export default Directory;
