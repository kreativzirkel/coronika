import app from './components/App/state';
import dashboard from './components/screens/Dashboard/state';
import day from './components/screens/Day/state';
import directory from './components/screens/Directory/state';
import { reducer as i18n } from './i18n';
import welcome from './components/screens/Welcome/state';

export const reducers = {
  app,
  dashboard,
  day,
  directory,
  i18n,
  welcome,
};
