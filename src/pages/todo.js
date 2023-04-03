import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import TodoList from '../component/todo-list';
import AddTodo from "../component/add-todo.js"
import EditTodo from "../component/edit-todo.js"
import { Modal, Portal, } from 'react-native-paper';
import { getTodos, postTodo } from "../services/todo-service.js"
export default function App() {
    const [todoList, setTodoList] = useState([])
    const [editableTodo, setEdit] = useState(null)
    const [submitLoader, setSubmitLoader] = useState(false);

    const handlePress = (todo) => {
        //setTodoList([...todoList, { id: todoList.length + 1, title: todo, completed: false }])
        setSubmitLoader(true);
        postTodo({ title: todo, completed: false }).then(res => {
            setTodoList([...todoList, { ...res, id: todoList.length + 1 }])
            setSubmitLoader(false);
        })
    }
    const handleStatus = (id, completed) => {
        const tempList = todoList.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: completed }
            }
            return todo
        })
        setTodoList(tempList)
    }
    const openEditModal = (todo) => {
        setEdit(todo)
    }
    const handleUpdate = (upadtedTodo) => {
        const tempList = todoList.map(todo => {
            if (todo.id === upadtedTodo.id) {
                return upadtedTodo;
            }
            return todo;
        })
        setTodoList(tempList)
        setEdit(null)
    }
    const deleteTodo = (todoDeletable) => {
        const tempList = todoList.filter(todo => (todo.id !== todoDeletable.id))
        setTodoList(tempList)
    }

    const handleDelete = (todo) => {
        Alert.alert('Delete todo', 'Are you sure you want to delete this todo?', [
            {
                text: 'Yes',
                onPress: () => deleteTodo(todo),
            },
            {
                text: 'Cancel',
            },
        ]);
    }
    useEffect(() => {
        console.log("enter")
        getTodos().then(res => {
            setTodoList([...res])
        })
    }, [])
    return (
        <>
            <Portal >
                <Modal contentContainerStyle={styles.modal} visible={!!editableTodo} onDismiss={() => setEdit(null)} >
                    <EditTodo onUpdate={handleUpdate} todo={editableTodo} />
                </Modal>
            </Portal>
            <View style={styles.container}>
                <AddTodo onSubmit={handlePress} loading={submitLoader} />
                <TodoList todoList={todoList} handleStatus={handleStatus} openEditModal={openEditModal} handleDelete={handleDelete}></TodoList>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingBottom: 100,
        paddingTop: 70,
        alignItems: "stretch",
        justifyContent: "flex-start"
    },
    modal: {
        backgroundColor: "white", padding: 20, height: 400, margin: 50
    }


});
