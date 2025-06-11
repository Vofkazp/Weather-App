import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import * as Location from "expo-location";
import {API_KEY} from "../constants/key";
import {TemperatureContextType} from "../interfaces/allInterfaces";

const TemperatureContext = createContext<TemperatureContextType | null>(null);

export const useTemp = () => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error("useTemp must be used within a TemperatureContextProvider");
  }
  return context;
};

const TemperatureContextProvider = ({children}: { children: ReactNode }) => {
  const [tempMode, setTempMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [stateWeatherData, setStateWeatherData] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert("Дозвіл обов'язковий");
      } else {
        let location = await Location.getCurrentPositionAsync({});
        let Data = 'Зачекайте...';
        let Longitude_Latitude = null;
        Data = JSON.stringify(location.coords);
        Longitude_Latitude = JSON.parse(Data);
        const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${Longitude_Latitude["latitude"]}&lon=${Longitude_Latitude["longitude"]}&units=metric&appid=${API_KEY}`;
        try {
          const response = await fetch(URL);
          const data = await response.json();
          setWeatherData(data);
        } catch (e) {
          setFetchError(true);
        }
      }
    })();
  }, []);

  const getStateWeatherData = async (cityVal: string) => {
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${API_KEY}`;
      const response = await fetch(URL);
      const data = await response.json();
      setStateWeatherData(data);
    } catch (e) {
      setFetchError(true);
    }
  }

  const value = {tempMode, weatherData, getStateWeatherData, stateWeatherData, fetchError};

  return (
      <TemperatureContext.Provider value={value}>
        {children}
      </TemperatureContext.Provider>
  );
}

export default TemperatureContextProvider;