import {
  SafeAreaView
} from 'react-native-safe-area-context';
import TemperatureContextProvider from "./context/TemperatureContext";
import RootNavigator from "./components/RootNavigator";

export default function App() {
  return (
      <SafeAreaView style={{flex: 1}} edges={["top", "bottom", "left", "right"]} >
        <TemperatureContextProvider>
          <RootNavigator/>
        </TemperatureContextProvider>
      </SafeAreaView >
  );
}
