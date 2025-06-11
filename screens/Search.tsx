import {View, Text, StyleSheet} from "react-native";

const Search = () => {
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Search</Text>
      </View>
  );
}

export default Search;

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