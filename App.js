import React from 'react';
import { createStackNavigator } from 'react-navigation';

import ToDoList from './components/ToDoList'
import AddToDo from './components/AddToDo'
import EditToDo from './components/EditToDo'

export default createStackNavigator(
  {
    ToDoList: ToDoList,
    AddToDo: AddToDo,
    EditToDo: EditToDo
  },
  {
    initialRouteName: 'ToDoList',
  }
)
