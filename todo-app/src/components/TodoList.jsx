import TodoItem from "./TodoItem"
import { useState } from "react"

export default function TodoList( {todos, setTodos} ) {
    const [editingItemId, setEditingItemId] = useState(null)

    function editTodo(id) {
        setTodos(todos.map(todo => todo.id === id ? (
            {...todo, isEditing: true}
        ) : todo
        ));
        setEditingItemId(id)
    }

    function editDescription(id, newDescription, newCategories) {
        setTodos(todos.map(todo => todo.id === id ? (
            {...todo, description: newDescription, catagories: newCategories}
        ) : todo
        ));
    }

    return (
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