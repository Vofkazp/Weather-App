import {View, Text, StyleSheet, Dimensions} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useTemp} from "../context/TemperatureContext";
import {BACKGROUND_COLOR, NAV_BACKGROUND_COLOR} from "../constants/colors";
import DailyData from "../components/DailyData";
import {ForecastItem} from "../interfaces/allInterfaces";
import WeatherIcon from "../components/WeatherIcon";
import Loading from "./Loading";

const {width} = Dimensions.get("window");

const Home = () => {
  const date = new Date();
  const Full_Date = date.toLocaleDateString("uk-UA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

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

  const {tempMode, weatherData} = useTemp();

  if (weatherData) {
    const {temp, humidity, pressure} = weatherData.list[0].main;
    const {weather} = weatherData.list[0];
    const wind_speed = weatherData.list[0].wind.speed;
    const {list} = weatherData;
    const date = new Date();
    const hour = date.getHours();
    const {main} = weather[0];
    const days = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const daysData: string[] = [];
    const tempData: number[] = [];

    {
      let currentDay = 1;
      list.map((e: ForecastItem, index: number) => {
        if (index >= 1) {
          const currentDate = new Date(e.dt_txt);
          const current_day = currentDate.getDate();
          const current_hour = currentDate.getHours();
          if (current_day !== currentDay && current_hour === 12) {
            currentDay = new Date(e.dt_txt).getDate();
            const dd = new Date(e.dt * 1000).getUTCDay();
            daysData.push(days[dd]);
            tempData.push(e.main.temp);
          }
        }
      });
    }

    return (
        <View style={styles.main}>
          <View style={styles.date}>
            <Text style={styles.dateText}>{Full_Date}</Text>
          </View>
          <View style={styles.location}>
            <Text style={styles.locationText}>Сьогодні</Text>
          </View>
          <WeatherIcon main={main} hour={hour}/>
          <View>
            <Text style={styles.tempText}>
              {parseInt(temp.toString())}
              <Text style={styles.tempmodeText}>{tempMode ? "℉" : "℃"}</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.weatherState}>{mainObj[main as keyof typeof mainObj]}</Text>
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
                {wind_speed} <Text style={styles.unitText}>км/год</Text>
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

          {/* 7-Day Weather Graph */}
          <View style={styles.DailyData}>
            <DailyData dayData={daysData} tempData={tempData}/>
          </View>
        </View>
    );
  }  else {
    return <Loading />;
  }
}

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  date: {
    marginTop: "10%",
    marginLeft: "7%",
  },
  dateText: {
    color: "rgba(256,256,256,0.63)",
    fontSize: 12,
  },
  location: {
    marginTop: 3,
    marginLeft: "6%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "rgba(256,256,256,0.9)",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 4,
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
    flex: 0.8,
    flexDirection: "row",
    width: width - 30,
    alignSelf: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    borderRadius: 30,
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