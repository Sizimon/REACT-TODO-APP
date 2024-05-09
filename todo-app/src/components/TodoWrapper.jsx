import {useState} from "react"
import Navigation from "./Navigation"
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid' // Used as a unique identifier for each todo item
uuidv4();


export default function TodoWrapper() {
    const [todos, setTodos] = useState([])

    function createTodo(todo) {
        if (!todo) return alert('Please enter a task')
        else {
            setTodos([...todos, 
                {id: uuidv4(),
                task: todo, // This will be used to display the users input task
                description: '', // This will be used to describe the task
                catagories: null, // This will be used to filter todos by catagory
                completed: false, // This will be used to mark a task as completed or in progress
                isEditing: false // This will be state to determine if a task is being edited
                }])
            }
    }

    return (
        <>
            <Navigation createTodo={createTodo}/>
            <TodoList todos={todos} setTodos={setTodos}/>
        </>
    )
}