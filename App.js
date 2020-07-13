import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header'
import TodoItem from './components/todoItem'
import AddTodo from './components/addTodo'
import AsyncStorage from '@react-native-community/async-storage'

export default function App() {

  const STORAGE_KEY = '@save_todos'

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function initTodos(){
      await getTodos()
    }
    initTodos();
  }, [])

  const saveTodos = async () => {
    try {
      console.log(JSON.stringify(todos))
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      //alert(todos.toString())
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const getTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem(STORAGE_KEY);

      //lert(todos.toString());
  
      if (todos !== null) {
        const todosArray = JSON.parse(todos);
        //console.log(todosArray);
        setTodos(todosArray)
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }

  const addTodoHandler = async (text) => {

    if(text.length > 3){
      setTodos(() => {
        return todos.push({ text: text, key: todos.length + 1 })  
      })
     await clearStorage();
     await saveTodos();
    } else {
      Alert.alert('OOPS!', 'Todos must be over 3 characters long', [{
        text: 'Okay', onPress: () => console.log('alert closed')
      }])
    }


  }

  const deleteTodoHandler = async (key) => {
    setTodos((prevTodos) => {

      return prevTodos.filter(todo => todo.key != key)

    })
    await saveTodos();
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
