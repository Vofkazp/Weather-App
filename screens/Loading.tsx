import LottieView from 'lottie-react-native';
import {View, StyleSheet} from "react-native";
import {BACKGROUND_COLOR} from "../constants/colors";

const Loading = () => {
  return (
      <View style={styles.container}>
        <LottieView
            autoPlay
            loop
            source={require('../assets/animations/Loading.json')}
            style={{width: 250, height: 250}}
        />
      </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR
  }
});