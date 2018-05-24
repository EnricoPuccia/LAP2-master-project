import React from 'react';
import { createStackNavigator } from 'react-navigation';

import ToDoList from './components/ToDoList'
import AddToDo from './components/AddToDo'

export default createStackNavigator(
  {
    ToDoList: ToDoList,
    AddToDo: AddToDo,
  },
  {
    initialRouteName: 'ToDoList',
  }
)
