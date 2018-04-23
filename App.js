import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/*  In LocalityForWeather.js non c'è una classe di default.
  Quindi dobbiamo importare le funzioni individualmente */
import { fetchLocationId, fetchWeather } from './APIs/LocalityForWeather.js';
import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //this.weatherOfCity = {}
    this.state = {
      location: '',
      weather: '',
      temperature: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.location}
          {this.state.weather}
          {this.state.temperature}
        </Text>
        <SearchInput
          onSubmit={this.searchCity}
        />
      </View>
    );
  }

  searchCity(city) {
    console.log(city);
    let cityId = fetchLocationId(city);
    let weatherOfCity = fetchWeather(cityId);
    this.setState({
      location: weatherOfCity.location,
      wheather: weatherOfCity.wheater,
      temperature: weatherOfCity.temperature
    });    
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
