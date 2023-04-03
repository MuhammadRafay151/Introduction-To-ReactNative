import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default ({ onUpdate, todo }) => {
    const [inputTodo, setTodo] = useState("");
    const handlePress = () => {
        onUpdate({ ...todo, title: inputTodo });
        setTodo("");
    }
    useEffect(() => {
        setTodo(todo.title)
    }, [])
    return (
        <>
            <View style={{ marginBottom: 10 }}>
                <TextInput label="Todo" mode='outlined' placeholder='Write your todo' value={inputTodo} onChangeText={setTodo}></TextInput>
            </View>
            <Button mode="contained" onPress={handlePress}>
                Update
            </Button>
        </>
    )
}