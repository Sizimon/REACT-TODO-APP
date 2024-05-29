import TodoItem from "./TodoItem"
import { useState } from "react"
import { FaAngleDown } from "react-icons/fa6"

export default function TodoList({ todos, setTodos }) {
    const [editingItemId, setEditingItemId] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

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

    const filteredTodos = todos.filter(todo => todo.task.toLowerCase().startsWith(searchTerm.toLowerCase()))

    return (
        <>
            <div className="flex flex-row justify-evenly md:justify-center md:gap-4  items-center bg-slate-200 p-4 rounded-b-3xl">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="rounded-lg p-1"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input type="checkbox" name="priority" id="priority" value="priority"/><label htmlFor="priority">Priority</label><br/>
                <input type="checkbox" name="overdue" id="overdue" value="overdue"/><label htmlFor="overdue">Overdue</label><br/>
                <input type="checkbox" name="completed" id="completed" value="completed"/><label htmlFor="completed">Completed</label>
                {/* <span className="bg-white p-1 rounded-lg flex flex-row items-center gap-1">Filter <FaAngleDown /></span> */}
            </div>
            {todos.length === 0 ? (
                <div className="flex flex-col flex-grow justify-center items-center p-2 h-full overflow-auto">
                    <h1 className="text-4xl text-center font-teko">No Task Set</h1>
                    <p className="text-center">To create a new task, please name your task and click the create key.<br /> After creating a task you will be able to write more about your task and customise it to your personal needs!</p>
                </div>) : (
                <div className="grid grid-cols-4">
                    {searchTerm.length === 0 ? (
                        todos.map((todo, index) => (
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
                        filteredTodos.length > 0 ? (
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
                                <h1 className="text-4xl text-center font-teko">No Matching Task</h1>
                                <p className="text-center">Please try again.</p>
                            </div>
                        )

                        // filteredTodos.map((todo, index) => (
                        //     <TodoItem
                        //         key={index}
                        //         todo={todo}
                        //         editTodo={editTodo}
                        //         editingItemId={editingItemId}
                        //         editDescription={editDescription}
                        //         deleteTodo={deleteTodo}
                        //         changePriority={changePriority}
                        //         markComplete={markComplete}
                        //     />
                        // ))
                    )}
                </div>
            )}
        </>
    )
}