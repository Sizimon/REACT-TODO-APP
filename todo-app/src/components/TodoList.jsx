import TodoItem from "./TodoItem"
import { useState } from "react"

export default function TodoList( {todos, setTodos} ) {
    const [editingItemId, setEditingItemId] = useState(null)

    function editTask(id) {
        setTodos(todos.map(todo => todo.id === id ? (
            {...todo, isEditing: true}
        ) : todo
        ));
        setEditingItemId(id)
    }

    // function updateDescription(id, description) {
    //     setTodos(todos.map(todo => todo.id === id ? (
    //         {...todo, description: description}
    //     ) : todo
    //     ));
    // } WORK ON THIS

    return (
        <div className="grid grid-cols-4 gap-4">
            {todos.map((todo, index) => (
                <TodoItem 
                key={index} 
                task={todo}
                editTask={editTask}
                editingItemId={editingItemId}
                // updateDescription={updateDescription} WORK ON THIS
                />
            ))}
        </div>
    )
}