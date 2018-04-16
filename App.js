import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';

import ResultView from "./components/ResultView";
import ModularButton from "./components/ModularButton";

// import calcButtonsJSON from 'calcButtons.json';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {val: null};
    calcButtons = require('./calcButtons.json');
  }

  render() {
    return (
      <View style={styles.container}>
        <ResultView
          result = {this.state.val}
        />
        <View style={styles.calculator}>
          {this.renderButtons()}      
        </View>
      </View>
    );
  }

  renderButtons() {
    return (
      calcButtons.map(list =>(
        <View style={{flexDirection: 'row', alignItems: 'stretch', flex: 1}}>
          {list.map(obj => (
            <ModularButton
              title = {obj.title}
              background={obj.background}
              flexGrow = {obj.flexGrow}
              whenOnPress = {title=>console.log(title)}
            />
          ))}
        </View>
      ))
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    //flexBasis: 200,
    flex: 1,
  },
  calculator: {
    alignItems: 'stretch',
    flex: 1,
  }
});
