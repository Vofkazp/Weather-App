import {View, StyleSheet, Image} from "react-native";

const WeatherIcon = ({main, hour}: { main: string; hour: number }) => {
  let source = null;
  switch (main) {
    case "Haze":
      source = require("../assets/weatherIcons/Haze.png");
      break;
    case "Rain":
      source = require("../assets/weatherIcons/Rain.png");
      break;
    case "Snow":
      source = require("../assets/weatherIcons/SnowFall.png");
      break;
    case "Thunderstorm":
      source = require("../assets/weatherIcons/ThunderStorm.png");
      break;
    case "Drizzle":
      if (hour < 19) {
        source = require("../assets/weatherIcons/Drizzle.png");
      } else if (hour >= 19) {
        source = require("../assets/weatherIcons/Night_Drizzle.png");
      }
      break;
    case "Mist":
      if (hour < 19) {
        source = require("../assets/weatherIcons/Mist.png");
      } else if (hour >= 19) {
        source = require("../assets/weatherIcons/Night_Mist.png");
      }
      break;
    case "Clouds":
      if (hour < 19) {
        source = require("../assets/weatherIcons/Cloudy.png");
      } else if (hour >= 19) {
        source = require("../assets/weatherIcons/Night_Cloudy.png");
      }
      break;
    case "Clear":
      if (hour < 19) {
        source = require("../assets/weatherIcons/Sunny.png");
      } else if (hour >= 19) {
        source = require("../assets/weatherIcons/Night_Clear.png");
      }
      break;
    default:
      source = null;
  }

  return (
      <View style={styles.weatherIconView}>
        {source ? (
            <Image
                style={styles.image}
                source={source}
                resizeMode="contain"
            />
        ) : null}
      </View>
  );
}

export default WeatherIcon;

const styles = StyleSheet.create({
  weatherIconView: {
    display: "flex",
    alignItems: "center",
    marginVertical: 30,
  },
  image: {
    height: 120,
    width: 160
  }
})