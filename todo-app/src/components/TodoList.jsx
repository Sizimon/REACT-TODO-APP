import TodoItem from "./TodoItem"
import { useState } from "react"

export default function TodoList({ todos, setTodos }) {
    const [editingItemId, setEditingItemId] = useState(null)

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

    return (
        <>
            {todos.length === 0 ? (
                <div className="flex flex-col flex-grow justify-center items-center p-2 h-full">
                    <h1 className="text-4xl text-center font-teko">No Task Set</h1>
                    <p className="text-center">To create a new task, please name your task and click the create key.<br/> After creating a task you will be able to write more about your task and customise it to your personal needs!</p>
                </div>) : (
                <div className="grid grid-cols-4 gap-4">
                    {todos.map((todo, index) => (
                        <TodoItem
                            key={index}
                            todo={todo}
                            editTodo={editTodo}
                            editingItemId={editingItemId}
                            editDescription={editDescription}
                        />
                    ))}
                </div>
            )
            }
            {/* <div className="grid grid-cols-4 gap-4">
                {todos.map((todo, index) => (
                    <TodoItem
                        key={index}
                        todo={todo}
                        editTodo={editTodo}
                        editingItemId={editingItemId}
                        editDescription={editDescription}
                    />
                ))}
            </div> */}
        </>
    )
}