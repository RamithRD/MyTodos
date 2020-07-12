import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button} from 'react-native';

export default function AddTodo({ addTodoHandler }){

    const [text, setText] = useState('');

    const changeHandler = (value) => {
        setText(value)
    }

    return(
        <View>
            <TextInput 
                placeholder='New ToDo ...'
                onChangeText={ changeHandler }
                style={styles.inputTxt}/>
            <Button onPress={() => { addTodoHandler(text) }} title="Add Todo" color='#673AB7'/>
        </View>
    )

}

const styles = StyleSheet.create({

    inputTxt:{
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    }

});