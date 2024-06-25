import TodoItem from "../TodoItemFolder/TodoItem"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"

export default function TodoList({ todos, setTodos }) {
    const [editingItemId, setEditingItemId] = useState(null)
    const [expandedItemId, setExpandedItemId] = useState(null)

    // GET THE DATE
    const [startDate, setStartDate] = useState(new Date());

    function getWeekDates(start = new Date()) {
        const dates = [start];
        for (let i = 1; i < 7; i++) {
            const newDate = new Date(start);
            newDate.setDate(start.getDate() + i);
            dates.push(newDate);
        }
        return dates;
    }

    const weekDates = getWeekDates(startDate);

    // EXPAND TODO
    function expandTodo(id) {
        setTodos(todos.map(todo => todo.id === id ? (
            { ...todo, isExpanded: true }
        ) : todo
        ));
        setExpandedItemId(id)

    }

    // EDITING TODO

    function editTodo(id) {
        setTodos(todos.map(todo => todo.id === id ? (
            { ...todo, isEditing: true }
        ) : todo
        ));
        setEditingItemId(id)
    }

    // END

    // EDIT TITLE / DESCRIPTION / CATEGORIES

    function editDescription(id, newDescription, newCategories) {
        setTodos(todos.map(todo => todo.id === id ? (
            { ...todo, description: newDescription, categories: newCategories }
        ) : todo
        ));
    }

    function editTitle(id, newTitle) {
        setTodos(todos.map(todo => todo.id === id ? (
            {...todo, task: newTitle}
        ) : todo
        ));
    }

    // END

    // DELETE / PRIORITY

    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    function changePriority(id) {
        setTodos(todos.map(todo => todo.id === id ? (
            { ...todo, priority: !todo.priority }
        ) : todo
        ));
    }

    // END

    // SET OVERDUE / COMPLETE

    function changeOverdue(id) {
        setTodos(todos.map(todo => todo.id === id ? (
            { ...todo, overdue: !todo.overdue }
        ) : todo
        ));
    }

    function markComplete(id) {
        setTodos(todos.map(todo => todo.id === id ? (
            { ...todo, completed: !todo.completed }
        ) : todo
        ));
    }

    // DRAGGABLE FUNCTIONALITY

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetDate) => {
        e.preventDefault();
        const todoId = e.dataTransfer.getData("todoId");
        moveTodoToDate(todoId, targetDate);
    }

    function moveTodoToDate(todoId, targetDate) {
        setTodos(todos.map(todo => {
            if (todo.id === todoId) {
                return { ...todo, date: targetDate.toISOString() };
            }
            return todo
        }))
    }

    return (
        <>
            <div className="flex flex-row justify-between p-2">
                <button 
                onClick={() => setStartDate(prevDate => {
                    const newDate = new Date(prevDate);
                    newDate.setDate(prevDate.getDate() - 7);
                    return newDate;
                })}
                className="text-white uppercase flex flex-row items-center gap-1 transition ease-in-out duration-300 hover:text-amber-500 font-lato"
                >
                    <FaChevronLeft />
                    Previous Week
                </button>
                <button 
                onClick={() => setStartDate(prevDate => {
                    const newDate = new Date(prevDate);
                    newDate.setDate(prevDate.getDate() + 7);
                    return newDate;
                })}
                className="text-white uppercase flex flex-row items-center gap-1 transition ease-in-out duration-300 hover:text-amber-500 font-lato"
                >
                    Next Week
                    <FaChevronRight />
                </button>
            </div>
            <div className="flex flex-col md:flex-row overflow-x-scroll h-full justify-start flex-grow items-start pb-10">
                {weekDates.map((date, index) => (
                    <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, date)}
                    key={index} 
                    className="flex flex-col justify-start items-center text-white min-w-[100%] md:min-w-[20%] md:min-h-[600px] flex-grow border-r border-white">
                        <h2 className="uppercase py-4 border-b border-zinc-400 font-lato">{date.toDateString()}</h2>
                        {todos.filter(todo => new Date(todo.date).toDateString() === date.toDateString()).map(todos => (
                            <TodoItem 
                                key={todos.id}
                                todo={todos}
                                editTodo={editTodo}
                                editingItemId={editingItemId}
                                editDescription={editDescription}
                                editTitle={editTitle}
                                deleteTodo={deleteTodo}
                                changePriority={changePriority}
                                markComplete={markComplete}
                                changeOverdue={changeOverdue}
                                expandTodo={expandTodo}
                                expandedItemId={expandedItemId}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}
