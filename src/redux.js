import app from './components/App/state';
import contacts from './components/screens/Contacts/state';
import dashboard from './components/screens/Dashboard/state';
import day from './components/screens/Day/state';
import { reducer as i18n } from './i18n';
import welcome from './components/screens/Welcome/state';

export const reducers = {
  app,
  contacts,
  dashboard,
  day,
  i18n,
  welcome,
};
