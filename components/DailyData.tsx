import {LineChart} from 'react-native-chart-kit';
import {Dimensions, View, StyleSheet} from "react-native";
import {NAV_BACKGROUND_COLOR} from "../constants/colors";

const {width} = Dimensions.get('window');

const DailyData = ({dayData, tempData}: { dayData: string[], tempData: number[] }) => {
  return (
      <View style={styles.maine}>
        <LineChart
          data={{labels: dayData, datasets: [{data: tempData}]}}
          width={width - 40}
          height={115}
          withInnerLines={false}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: NAV_BACKGROUND_COLOR,
            backgroundGradientFrom: NAV_BACKGROUND_COLOR,
            backgroundGradientTo: NAV_BACKGROUND_COLOR,
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(230, 230, 230, ${opacity})`,
            style: {borderRadius: 25},
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: NAV_BACKGROUND_COLOR
            }
          }}
          bezier
          style={{borderRadius: 25, alignSelf: 'center', paddingBottom: 50}}
          />
      </View>
  );
}

export default DailyData;

const styles = StyleSheet.create({
  maine: {
    flex: 1,
    marginHorizontal: "auto"
  }
});