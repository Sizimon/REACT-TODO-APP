import {useState} from "react"
import Navigation from "../components/CoreElementsFolder/Navigation"
import TodoList from "../components/CoreElementsFolder/TodoList";
import { v4 as uuidv4 } from 'uuid' // Used as a unique identifier for each todo item
import Footer from "../components/CoreElementsFolder/Footer";
uuidv4();


export default function TodoWrapper() {
    const [todos, setTodos] = useState([])
    const [filterMenu, setFilterMenu] = useState(false)

    function createTodo(todo) {
        if (!todo) return alert('Please enter a task')
        else {
            setTodos([...todos, 
                {id: uuidv4(),
                task: todo, // This will be used to display the users input task
                description: '', // This will be used to describe the task
                catagories: [], // This will be used to filter todos by catagory
                completed: false, // This will be used to mark a task as completed or in progress
                isEditing: false,
                priority: false, // This will be state to determine if a task is being edited
                timer: false,
                overdue: false,
                }])
            }
    }

    return (
        <div className="flex flex-col h-screen">
            <Navigation 
            createTodo={createTodo}
            filterMenu={filterMenu}
            setFilterMenu={setFilterMenu}
            />
            <TodoList 
            todos={todos}
            setTodos={setTodos}
            filterMenu={filterMenu}/>
            <Footer todos={todos}/>
        </div>
    )
}