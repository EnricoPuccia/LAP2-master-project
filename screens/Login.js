import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import * as firebase from 'firebase';

const TINT_COLOR = 'deepskyblue';

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
    backgroundColor: 'deepskyblue',
  }
  
  state = {
    isLoginLoading: false,
    isRegisterLoading: false,
    error: '',
    email: '',
    password: ''
  }

  render() {
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput 
          label = 'Email'
          onChangeText = {text => this.setState({email: text })}
          placeholder = 'prova@example.it'
        />
        <FormLabel>Password</FormLabel>
        <FormInput 
          label = 'Password'
          onChangeText = {text => this.setState({password: text })}
          secureTextEntry
        />
        <View style={styles.buttonRow}>
          <Button
            backgroundColor = {TINT_COLOR}
            loading = {this.state.isLoginLoading}
            title = 'Login'
            onPress = {this._login}
            raised
          />
          <Button
            backgroundColor = {TINT_COLOR}
            loading = {this.state.isRegisterLoading}
            title = 'Register'
            onPress = {this._register}
            raised
          />
        </View>
        <Text>{this.state.error}</Text>
      </View>
    );
  }
  _login = () => {
    this.setState({ isLoginLoading: true });
    if (! this._validInput()){
      this.setState({ isLoginLoading: false, error: 'Devi inserire correttamente i campi'});
      return;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({isLoginLoading: false});
        console.log(user);
        this.props.navigation.navigate('ToDoList');
      })
      .catch(error => {
        this.setState({ isLoginLoading: false, error: error.message });
      })
    
  }
  _register = () => {
    this.setState({ isRegisterLoading: true });
    if (! this._validInput()){
      this.setState({ isLoginLoading: false, error: 'Devi inserire correttamente i campi'});
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({isRegisterLoading: false});
        console.log(user);
        this.props.navigation.navigate('ToDoList');
      })
      .catch(error => {
        this.setState({ isRegisterLoading: false, error: error.message });
      })
  }
  
  _validInput = () => {
    return this.state.email != '' && this.state.password != '';
  }
}

export default Login;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})