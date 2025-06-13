import {SafeAreaView} from 'react-native-safe-area-context';
import TemperatureContextProvider from "./context/TemperatureContext";
import RootNavigator from "./components/RootNavigator";
import {BACKGROUND_COLOR} from "./constants/colors";
import {StatusBar} from "expo-status-bar";
import {enableScreens} from 'react-native-screens';
enableScreens();

export default function App() {
  return (
      <SafeAreaView style={{flex: 1, backgroundColor: BACKGROUND_COLOR,}}>
        <StatusBar style='inverted'/>
        <TemperatureContextProvider>
          <RootNavigator/>
        </TemperatureContextProvider>
      </SafeAreaView>
  );
}
