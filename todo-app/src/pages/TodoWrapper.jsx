import {useState} from "react"
import Navigation from "../components/CoreElementsFolder/Navigation"
import TodoList from "../components/CoreElementsFolder/TodoList";
import { v4 as uuidv4 } from 'uuid' // Used as a unique identifier for each todo item
import Footer from "../components/CoreElementsFolder/Footer";
uuidv4();


export default function TodoWrapper() {
    const [todos, setTodos] = useState([])
    const [filterMenu, setFilterMenu] = useState(false)

    function createTodo(todo, date) {
        if (!todo && !date) return alert('Please enter a task / due date.')
        else {
            setTodos([...todos, 
                {id: uuidv4(),
                task: todo, // This will be used to display the users input task
                description: '', // This will be used to describe the task
                date: date, // This will be used to set a due date for the task
                catagories: [], // This will be used to filter todos by catagory
                completed: false, // This will be used to mark a task as completed or in progress
                isEditing: false, // This will be state to determine if a task is being edited
                priority: false, // This will be state to determine if a task is being edited
                overdue: false, // This will check whether a timer has run out and a task is overdue
                }])
            }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation 
            createTodo={createTodo}
            filterMenu={filterMenu}
            setFilterMenu={setFilterMenu}
            />
            <div className="flex flex-col flex-grow w-full">
                <TodoList 
                todos={todos}
                setTodos={setTodos}
                filterMenu={filterMenu}/>
            </div>
            <Footer todos={todos}/>
        </div>
    )
}