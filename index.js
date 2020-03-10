/**
 * @format
 */

import 'react-native-get-random-values';
import { AppRegistry } from 'react-native';
import App from './src/index';
import { name as appName } from './app.json';

// noinspection JSUnresolvedFunction
AppRegistry.registerComponent(appName, () => App);
