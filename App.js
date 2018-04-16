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
    this.checkInput = this.checkInput.bind(this);
    calcButtons = require('./calcButtons.json');
  }

  render() {
    return (
      <View style={styles.container}>
        <ResultView
          result = {this.state.val}
          operator = {this.state.operator}
          prevVal = {this.state.prevVal}
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
              /*  whenOnPress riceve in input "title" da onPress e lo passa ad checkInput.
                this.checkInput(title) è sbagliato perché non stiamo richiamando la 
                funzione checkInput bensì la stiamo passando a ModularButton  */
              whenOnPress={this.checkInput}
            />
          ))}
        </View>
      ))
    );
  }

  isNull(value) {
    if (value === '')
      return true
    return false
  }

  isOperator(symbol) {
    const operators = ['+', '-', '×', '÷', '=', '±', '%'];
    if (operators.includes(symbol))
      return true
    return false
  }

  checkInput(symbol) {
    if (symbol === 'C') {
      this.setState({
        prevVal: '',
        operator: '',
        val: ''
      })
      return;
    }
    if (symbol == '±') {
      v = parseFloat(this.state.val);
      v = v * (-1);
      this.setState({
        val: v.toString()
      })
      return;
    }
    if (this.isOperator(symbol)) {
      this.applyOperator(symbol)
      return;
    }
    this.setState({
      val: this.state.val + symbol
    })
  }

  getResult(operator, a, b) {
    let c;
    switch (operator) {
      case '+':
        c = a + b;
        break;
      case '-':
        c = a - b;
        break;
      case '×':
        c =  a * b;
        break;
      case '÷':
        c  = a / b;
        break;
    }
    return c;
  }

  applyOperator(symbol) {
    /*  Caso in cui si digita un operatore in assenza di numeri digitati prima (+)  */
    if (this.isNull(this.state.val))
      return;
    /*  Caso in cui abbiamo solo val (123+) */
    if (this.isNull(this.state.prevVal))
      this.setState({
        prevVal: this.state.val,
        operator: symbol,
        val: ''
      })
    /*  Caso in cui abbiamo prevVal, operator e Val (123+456+)  */
    else
      /*  Caso in cui digitiamo due o più operatori consecutivamente  */
      if (this.isNull(this.state.val))
        this.setState({
          operator: symbol
        })
      else {
        a = parseFloat(this.state.prevVal);
        b = parseFloat(this.state.val);
        
        if (symbol == '=') {
          c = this.getResult(this.state.operator, a, b);
          this.setState({
            prevVal: '',
            operator: '',
            val: c
          })
        } else {
          c = this.getResult(symbol, a, b);
          this.setState({
            prevVal: c,
            operator: symbol,
            val: ''
          })
        }
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
