import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header'
import TodoItem from './components/todoItem'
import AddTodo from './components/addTodo'

export default function App() {

  const [todos, setTodos] = useState([
    {text: 'buy coffee',  key: '1'},
    {text: 'buy bread', key: '2'},
    {text: 'buy butter', key: '3'}
  ]);

  const addTodoHandler = (text) => {

    if(text.length > 3){
      setTodos((prevTodos) => {
        return [
          { text: text, key: Math.random().toString() },
          ...prevTodos
        ]
      })
    } else {
      Alert.alert('OOPS!', 'Todos must be over 3 characters long', [{
        text: 'Okay', onPress: () => console.log('alert closed')
      }])
    }


  }

  const deleteTodoHandler = (key) => {
    setTodos((prevTodos) => {

      return prevTodos.filter(todo => todo.key != key)

    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      //dismmises the keybaord when touched outside the screen - **if the keyboard is active
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo addTodoHandler={addTodoHandler}/>
          <View style={styles.list}>
            <FlatList 
              data={todos}
              keyExtractor={item => item.key.toString()}
              renderItem={({ item }) => (
                <TodoItem item={item} deleteHandler={deleteTodoHandler}/>
              )}
              />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    flex: 1
  },
  list: {
    flex: 1,
    marginTop: 20,
  }
});
