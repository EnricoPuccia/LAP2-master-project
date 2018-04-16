import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';

import ResultView from "./components/ResultView";
import ModularButton from "./components/ModularButton";
//import { parseFloat } from 'querystring';

// import calcButtonsJSON from 'calcButtons.json';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {val: '', prevVal: '', operator: ''};
    // Necessario per evitare errore "this.state is undefined"
    this.applyOperation = this.applyOperation.bind(this);
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
      calcButtons.map((list, index) =>(
        <View 
          key={index} 
          style={{flexDirection: 'row', alignItems: 'stretch', flex: 1}}
        >
          {list.map(obj => (
            <ModularButton
              key={obj.title}
              title={obj.title}
              background={obj.background}
              flexGrow={obj.flexGrow}
              /*  whenOnPress riceve in input "title" da onPress e lo passa ad applyOperation.
                this.applyOperation(title) è sbagliato perché non stiamo richiamando la 
                funzione applyOperation bensì la stiamo passando a ModularButton  */
              whenOnPress={this.applyOperation}
            />
          ))}
        </View>
      ))
    );
  }

  checkVal() {
    if (this.state.val === '')
      return false
    return true
  }

  applyOperation(symbol) {
    switch(symbol) {
      case '+':
        /*  Caso in cui si digita un operatore in assenza di numeri digitati prima (+)  */
        if (!this.checkVal())
          return;
        /*  Caso in cui abbiamo solo val (123+) */
        if (this.state.prevVal === '')
          this.setState({
            prevVal: this.state.val,
            operator: symbol,
            val: ''
          })
        /*  Caso in cui abbiamo prevVal, operator e Val (123+456+)  */
        else 
          /*  Caso in cui digitiamo due o più operatori consecutivamente  */
          if (!this.checkVal())
            this.setState({
              operator: symbol
            })
          else {
            a = parseFloat(this.state.prevVal);
            b = parseFloat(this.state.val);
            c = a + b;
            this.setState({
              prevVal: c,
              operator: symbol,
              val: ''
            })
            console.log(this.state);
            
          }
            
          break;
      default:
        this.setState({
          val: this.state.val + symbol
        })
    }
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
