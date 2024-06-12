import TodoItem from "./TodoItem"
import { useState } from "react"
import Lottie from 'lottie-react'
import Animations from '../Animations'

export default function TodoList({ todos, setTodos, filterMenu }) {
    const [editingItemId, setEditingItemId] = useState(null)

    // FILTER STATES
    const [searchTerm, setSearchTerm] = useState("")
    const [priorityChecked, setPriorityChecked] = useState(false)
    const [overdueChecked, setOverdueChecked] = useState(false);
    const [completedChecked, setCompletedChecked] = useState(false);

    // FILTER MENU STATE


    function editTodo(id) {
        setTodos(todos.map(todo => todo.id === id ? (
            { ...todo, isEditing: true }
        ) : todo
        ));
        setEditingItemId(id)
    }

    function editDescription(id, newDescription, newCategories) {
        setTodos(todos.map(todo => todo.id === id ? (
            { ...todo, description: newDescription, catagories: newCategories }
        ) : todo
        ));
    }

    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    function changePriority(id) {
        setTodos(todos.map(todo => todo.id === id ? (
            { ...todo, priority: !todo.priority }
        ) : todo
        ));
    }

    function markComplete(id) {
        setTodos(todos.map(todo => todo.id === id ? (
            { ...todo, completed: !todo.completed }
        ) : todo
        ));
    }

    const filteredTodos = todos.filter(todo => {
        // Check if the todo starts with the search term
        let matchesSearchTerm = searchTerm === "" || todo.task.toLowerCase().startsWith(searchTerm.toLowerCase());

        // Check if the todo matches the checkbox conditions
        let matchesPriority = !priorityChecked || todo.priority;
        // let matchesOverdue = !overdueChecked || todo.overdue;
        let matchesCompleted = !completedChecked || todo.completed;

        // Return true if all conditions are met
        return matchesSearchTerm && matchesPriority && matchesCompleted;
    });

    return (
        <>
            {/* THIS IS THE FILTER "MENU" */}
            {filterMenu ? (
                <div className="flex flex-col justify-evenly md:justify-center md:gap-2 items-center bg-zinc-800 border-b border-zinc-400 p-1 pt-5 rounded-b-3xl">
                    <div>
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="rounded-lg p-1 bg-zinc-700 text-white outline-none md:w-full"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row gap-2 my-2">
                        <input
                            type="checkbox"
                            name="priority"
                            id="priority"
                            value="priority"
                            onChange={(e) => setPriorityChecked(e.target.checked)}
                            className="peer relative appearance-none 
                        w-4 h-4 border 
                        rounded-full border-indigo-700
                        cursor-pointer  
                        checked:bg-indigo-700"/>
                        <label htmlFor="priority" className="text-slate-600">Priority</label><br />
                        <input
                            type="checkbox"
                            name="overdue"
                            id="overdue"
                            value="overdue"
                            onChange={(e) => setOverdueChecked(e.target.checked)}
                            className="peer relative appearance-none 
                        w-4 h-4 border 
                        rounded-full border-indigo-700
                        cursor-pointer  
                        checked:bg-indigo-700" />
                        <label htmlFor="overdue" className="text-slate-600">Overdue</label><br />
                        <input
                            type="checkbox"
                            name="completed"
                            id="completed"
                            value="completed"
                            onChange={(e) => setCompletedChecked(e.target.checked)}
                            className="peer relative appearance-none 
                        w-4 h-4 border 
                        rounded-full border-indigo-700 
                        cursor-pointer  
                        checked:bg-indigo-700" />
                        <label htmlFor="completed" className="text-slate-600">Completed</label>
                        {/* <span className="bg-white p-1 rounded-lg flex flex-row items-center gap-1">Filter <FaAngleDown /></span> */}
                    </div>
                </div>
            ) : (
                null
            )}

            {/* END */}

            {/* THIS IS THE TODO LIST WHICH MAPS TODOITEMS */}
            {todos.length === 0 ? (
                <div className="flex flex-col flex-grow justify-center items-center p-2 h-full overflow-auto">
                    <h1 className="text-4xl text-center font-teko text-white">No Task Set</h1>
                    <Lottie animationData={Animations.loading} className='w-2/6 h-2/6' />
                    <p className="text-center text-white">To create a new task, please name your task and click the create key.<br /> After creating a task you will be able to write more about your task and customise it to your personal needs!</p>
                </div>) : (
                <div className="grid grid-cols-4 h-full">
                    {filteredTodos.length > 0 ? (
                        filteredTodos.map((todo, index) => (
                            <TodoItem
                                key={index}
                                todo={todo}
                                editTodo={editTodo}
                                editingItemId={editingItemId}
                                editDescription={editDescription}
                                deleteTodo={deleteTodo}
                                changePriority={changePriority}
                                markComplete={markComplete}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col flex-grow justify-center items-center p-2 h-full overflow-auto col-span-4">
                            <h1 className="text-4xl text-center font-teko text-white">No Matching Task</h1>
                            <Lottie animationData={Animations.loading} className='w-1/6 h-1/6' />
                            <p className="text-center text-white">Please try again.</p>
                        </div>
                    )
                    }
                </div>
            )}
            {/* END */}
        </>
    )
}