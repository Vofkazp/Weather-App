import {View, Text, StyleSheet} from "react-native";

const ErrorPage = () => {
  return (
      <View style={styles.container}>
        <Text style={styles.title}>ErrorPage</Text>
      </View>
  );
}

export default ErrorPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});