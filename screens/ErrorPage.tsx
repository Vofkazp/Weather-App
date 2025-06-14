import LottieView from 'lottie-react-native';
import {View, StyleSheet} from "react-native";
import {BACKGROUND_COLOR} from "../constants/colors";

const ErrorPage = () => {
  return (
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop
          source={require('../assets/animations/ErrorAnimation.json')}
          style={{width: 250, height: 250}}
        />
      </View>
  );
}

export default ErrorPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR
  }
});