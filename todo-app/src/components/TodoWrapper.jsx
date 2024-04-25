import {useState} from "react"
import Navigation from "./Navigation"
import { v4 as uuidv4 } from 'uuid'
uuidv4();


export default function TodoWrapper() {
    const [todos, setTodos] = useState([])

    function createTodo(todo) {
        setTodos([...todos, 
            {id: uuidv4(),
            task: todo,
            completed: false,
            isEditing: false
            }])
    }

    return (
        <>
            <Navigation createTodo={createTodo}/>
        </>
    )
}