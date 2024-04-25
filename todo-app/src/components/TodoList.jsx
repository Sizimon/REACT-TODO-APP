import TodoItem from "./TodoItem"

export default function TodoList( {todos, setTodos} ) {

    function editTask(id) {
        setTodos(todos.map(todo => todo.id === id ? (
            {...todo, isEditing: !todo.isEditing}
        ) : todo
        )) // UNFINISHED
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {todos.map((todo, index) => (
                <TodoItem 
                key={index} 
                task={todo}
                editTask={editTask}
                />
            ))}
        </div>
    )
}