import React from 'react';
import { createStackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import EditToDo from './components/EditToDo';
import Login from './screens/Login';

// createStackNavigator restituisce un componente
const RootStack = createStackNavigator(
  {
    ToDoList: ToDoList,
    AddToDo: AddToDo,
    EditToDo: EditToDo,
    Login: Login
  },
  {
    initialRouteName: 'Login',
    //headerMode: 'none',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)

export default class App extends React.Component {
  componentWillMount() {
    // Initialize Firebase
    let config = {
      apiKey: "AIzaSyAd1B0ruMTdZAS-a9XVlPkifJkVF1g5YiE",
      authDomain: "todo-list-eccc4.firebaseapp.com",
      databaseURL: "https://todo-list-eccc4.firebaseio.com",
      projectId: "todo-list-eccc4",
      storageBucket: "todo-list-eccc4.appspot.com",
      messagingSenderId: "611803479428"
    };
    // deve essere eseguito solo la prima volta (per evitare problemi hot reloading)
    if(firebase.apps.length == 0)
      firebase.initializeApp(config);   
  }
  render () {
    return <RootStack/>
  }
}