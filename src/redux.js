import app from './components/App/state';
import dashboard from './components/screens/Dashboard/state';
import day from './components/screens/Day/state';
import directory from './components/screens/Directory/state';
import encounter from './components/screens/Encounter/state';
import { reducer as entriesTabsView } from './components/partials/EntriesTabsView';
import exportState from './components/screens/Export/state';
import { reducer as i18n } from './i18n';
import overview from './components/screens/Overview/state';
import ventilationMode from './components/screens/VentilationMode/state';
import settings from './components/screens/Settings/state';

export const reducers = {
  app,
  dashboard,
  day,
  directory,
  encounter,
  entriesTabsView,
  export: exportState,
  i18n,
  overview,
  ventilationMode,
  settings,
};
