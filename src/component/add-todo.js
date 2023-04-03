import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default ({ onSubmit, loading }) => {
    const [inputTodo, setTodo] = useState("");
    const handlePress = () => {
        onSubmit(inputTodo);
        setTodo("");
    }
    return (
        <>
            <View style={{ marginBottom: 10 }}>
                <TextInput label="Todo" mode='outlined' placeholder='Write your todo' value={inputTodo} onChangeText={setTodo}></TextInput>
            </View>
            <Button mode="contained" onPress={handlePress} loading={loading} >
                Submit
            </Button>
        </>
    )
}