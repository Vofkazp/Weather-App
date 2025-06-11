import {View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput} from "react-native";
import {BACKGROUND_COLOR, NAV_BACKGROUND_COLOR} from "../constants/colors";
import Loading from "./Loading";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import WeatherIcon from "../components/WeatherIcon";
import {useEffect, useState} from "react";
import {useTemp} from "../context/TemperatureContext";
import {MaterialIcons} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';

const {width} = Dimensions.get("window");

const Search = () => {
  const [cityVal, setCityVal] = useState('Львів');

  const mainObj = {
    Haze: "Туман",
    Rain: "Дощ",
    Snow: "Сніг",
    Thunderstorm: "Гроза",
    Drizzle: "Мряка",
    Mist: "Туман",
    Clouds: "Хмари",
    Clear: "Ясно",
  }

  const {tempMode, stateWeatherData, getStateWeatherData} = useTemp();

  useEffect(() => {
    getStateWeatherData(cityVal);
  }, [])

  const submit = () => {
    getStateWeatherData(cityVal);
    setCityVal('');
  }
  const changeFun = (val: string) => {
    setCityVal(val);
  }

  if (stateWeatherData) {
    const {temp, pressure, humidity} = stateWeatherData.main;
    const {speed} = stateWeatherData.wind;
    const {main} = stateWeatherData.weather[0];
    const date = new Date();
    const hour = date.getHours();

    return (
        <View style={styles.main}>
          <View style={styles.searchCity}>
            <TextInput style={styles.search}
                       placeholder="Search Cities"
                       placeholderTextColor={"rgba(256,256,256,0.4)"}
                       keyboardType='web-search'
                       value={cityVal}
                       onChangeText={changeFun}
            />
            <TouchableOpacity onPress={submit} style={styles.searchBtn}>
              <MaterialIcons name="search" size={24} color="#fff"/>
            </TouchableOpacity>
          </View>
          <WeatherIcon main={stateWeatherData.weather[0].main} hour={hour}/>
          <View>
            <Text style={styles.tempText}>
              {parseInt(temp.toString())}
              <Text style={styles.tempmodeText}>{tempMode ? "°F" : "°C"}</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.weatherState}>{mainObj[main as keyof typeof mainObj]}</Text>
          </View>
          <View style={styles.location}>
            <Ionicons
                name="location-outline"
                size={35}
                color='#3ddc84'
            />
            <Text style={styles.locationText}>
              {stateWeatherData.name}
            </Text>
          </View>
          <View style={styles.otherData}>
            <View style={styles.Humidity}>
              <MaterialCommunityIcons
                  name='water-outline'
                  size={36}
                  color='rgba(256,256,256,0.9)'
              />
              <Text style={styles.otherDataValueText}>
                {humidity} <Text style={styles.unitText}>%</Text>
              </Text>
              <Text style={styles.otherDataText}>Вологість</Text>
            </View>
            <View style={styles.Pressure}>
              <MaterialCommunityIcons
                  name='weather-windy'
                  size={36}
                  color='rgba(256,256,256,0.9)'
              />
              <Text style={styles.otherDataValueText}>
                {speed} <Text style={styles.unitText}>км/год</Text>
              </Text>
              <Text style={styles.otherDataText}>Вітер</Text>
            </View>
            <View style={styles.WindSpeed}>
              <MaterialCommunityIcons
                  name='weather-pouring'
                  size={36}
                  color='rgba(256,256,256,0.9)'
              />
              <Text style={styles.otherDataValueText}>
                {pressure} <Text style={styles.unitText}>гПа</Text>
              </Text>
              <Text style={styles.otherDataText}>Тиск</Text>
            </View>
          </View>

        </View>
    );
  } else {
    return <Loading/>;
  }
}

export default Search;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  searchCity: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: "10%",
    marginHorizontal: "4%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    backgroundColor: NAV_BACKGROUND_COLOR,
    padding: 10,
    flex: 1,
    borderRadius: 30,
    color: "rgba(256,256,256,0.9)",
    paddingLeft: 25
  },
  searchBtn: {
    height: 50,
    width: 50,
    backgroundColor: NAV_BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginLeft: 10
  },
  date: {
    marginLeft: "7%",
  },
  dateText: {
    color: "rgba(256,256,256,0.63)",
    fontSize: 12,
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50
  },
  locationText: {
    color: "rgba(256,256,256,0.9)",
    fontSize: 30,
    fontWeight: "normal",
    marginLeft: 4,
    textTransform: 'capitalize'
  },
  weatherIconView: {
    display: "flex",
    alignItems: "center",
    marginVertical: 30,
  },
  tempText: {
    color: "rgba(256,256,256,0.9)",
    fontSize: 60,
    alignSelf: "center",
  },
  tempmodeText: {
    color: "rgba(256,256,256,0.4)",
  },
  weatherState: {
    color: "rgba(256,256,256,0.55)",
    fontSize: 16,
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 2,
  },
  otherData: {
    flex: 1,
    flexDirection: "row",
    width: width - 30,
    alignSelf: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    borderRadius: 30,
    marginBottom: 40
  },
  Humidity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: NAV_BACKGROUND_COLOR,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  Pressure: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: NAV_BACKGROUND_COLOR,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  WindSpeed: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: NAV_BACKGROUND_COLOR,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  otherDataValueText: {
    fontSize: 14,
    color: "rgba(256,256,256,0.9)",
  },
  otherDataText: {
    fontSize: 14,
    color: "rgba(256,256,256,0.55)",
    marginTop: 10,
    textTransform: "capitalize",
  },
  unitText: {
    fontSize: 11,
    color: "rgba(256,256,256,0.55)",
  },
  DailyData: {
    flex: 1,
    width: width - 30,
    alignSelf: "center",
    borderRadius: 30,
  },
});