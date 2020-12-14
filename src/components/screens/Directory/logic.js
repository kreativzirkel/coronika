import { connect } from 'react-redux';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import { removeLocationFromAllDays, removePersonFromAllDays } from '../Dashboard/actions';
import {
  removePerson,
  hidePerson,
  removeLocation,
  showHidePersonsModal,
  hideHidePersonsModal,
  showImportPersonsModal,
  hideImportPersonsModal,
  showMoreModal,
  hideMoreModal,
  updateHiddenPersons,
} from './actions';
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

const removePersonAsync = (personId) => async (dispatch) => {
  dispatch(removePersonFromAllDays(personId));
  dispatch(removePerson(personId));
};

const removeLocationAsync = (locationId) => async (dispatch) => {
  dispatch(removeLocationFromAllDays(locationId));
  dispatch(removeLocation(locationId));
};

const showHidePersonsModalAsync = () => async (dispatch) => {
  dispatch(hideMoreModal());

  setTimeout(() => {
    dispatch(showHidePersonsModal());
  }, 500);
};

const showImportPersonsModalAsync = () => async (dispatch) => {
  dispatch(hideMoreModal());

  setTimeout(() => {
    dispatch(showImportPersonsModal());
  }, 500);
};

const confirmHiddenPersonsSelection = (selectedPersons) => async (dispatch) => {
  dispatch(hideHidePersonsModal());
  dispatch(updateHiddenPersons(selectedPersons));
};

const mapStateToProps = ({
  directory: {
    persons,
    personsImporting,
    isHidePersonsModalVisible,
    isImportPersonsModalVisible,
    isMoreModalVisible,
    locations,
  },
}) => {
  persons.sort((a, b) => personsSortingFunction(a, b));
  locations.sort((a, b) => locationsSortingFunction(a, b));

  return {
    persons,
    personsImporting,
    isHidePersonsModalVisible,
    isImportPersonsModalVisible,
    isMoreModalVisible,
    locations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmHiddenPersonsSelection: (selectedPersons) => dispatch(confirmHiddenPersonsSelection(selectedPersons)),
    deletePerson: (personId) => dispatch(removePersonAsync(personId)),
    hidePerson: (personId) => dispatch(hidePerson(personId)),
    deleteLocation: (locationId) => dispatch(removeLocationAsync(locationId)),
    showHidePersonsModal: () => dispatch(showHidePersonsModalAsync()),
    hideHidePersonsModal: () => dispatch(hideHidePersonsModal()),
    showImportPersonsModal: () => dispatch(showImportPersonsModalAsync()),
    hideImportPersonsModal: () => dispatch(hideImportPersonsModal()),
    showMoreModal: () => dispatch(showMoreModal()),
    hideMoreModal: () => dispatch(hideMoreModal()),
    importPersons: (__) => dispatch(importPersons(__, true)),
  };
};

const Directory = withColorScheme(withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen))));

export default Directory;
