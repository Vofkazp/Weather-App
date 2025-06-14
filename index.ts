import { enableScreens } from 'react-native-screens';

enableScreens();

import 'react-native-gesture-handler';
import {registerRootComponent} from 'expo';
import App from './App';

registerRootComponent(App);
