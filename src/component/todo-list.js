import { View, StyleSheet, ScrollView } from "react-native"
import { Button, Card, Text, IconButton } from "react-native-paper"

export default ({ todoList, openEditModal, handleStatus, handleDelete }) => {
    return (
        <View style={style.container}>
            <Card elevation={5} mode='elevated'>
                <Card.Content >
                    <Text style={style.todoHeader}>My Todos</Text>
                </Card.Content>
            </Card>

            <ScrollView contentContainerStyle={style.list}>
                {
                    !todoList.length && (
                        <Card elevation={5} mode='elevated' style={style.todo} >
                            <Card.Content >
                                <Text style={style.todoHeader}>Todos Not Found</Text>
                            </Card.Content>
                        </Card>
                    )
                }
                {
                    todoList.map((todo, index) => (
                        <Card elevation={5} mode='elevated' style={style.todo} key={index}>
                            <Card.Content >
                                <Text style={style.todoHeader}>{todo.title}</Text>
                            </Card.Content>
                            <Card.Actions>
                                <Button mode="elevated" icon={todo.completed ? "undo" : "check"} onPress={() => { handleStatus(todo.id, !todo.completed) }}>
                                    {todo.completed ? "Undo" : "Mark as done"}</Button>
                                <IconButton mode="contained" icon="pen" onPress={() => openEditModal(todo)}></IconButton>
                                <IconButton mode="contained" icon="delete" on onPress={() => handleDelete(todo)}></IconButton>
                            </Card.Actions>
                        </Card>
                    ))
                }
            </ScrollView>

        </View>
    )
}
const style = StyleSheet.create({
    container: {
        marginTop: 40,
    },
    todoHeader: {
        textAlign: "center"
    },
    todo: {
        backgroundColor: "white",
        margin: 10
    },
    list: {
        backgroundColor: "transparent",
        paddingVertical: 50
    }

})