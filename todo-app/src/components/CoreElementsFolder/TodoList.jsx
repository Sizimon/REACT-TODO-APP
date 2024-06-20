import TodoItem from "../TodoItemFolder/TodoItem"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import Lottie from 'lottie-react'
import Animations from '../../Animations'

export default function TodoList({ todos, setTodos, filterMenu }) {
    const [editingItemId, setEditingItemId] = useState(null)

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
            { ...todo, description: newDescription, catagories: newCategories }
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

    console.log(todos)

    return (
        <>
            <div className="flex flex-row justify-between p-2">
                <button 
                onClick={() => setStartDate(prevDate => {
                    const newDate = new Date(prevDate);
                    newDate.setDate(prevDate.getDate() - 7);
                    return newDate;
                })}
                className="text-white uppercase flex flex-row items-center gap-1 transition ease-in-out duration-300 hover:text-amber-500"
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
                className="text-white uppercase flex flex-row items-center gap-1 transition ease-in-out duration-300 hover:text-amber-500"
                >
                    Next Week
                    <FaChevronRight />
                </button>
            </div>
            <div className="flex overflow-x-scroll h-full justify-start flex-grow items-start">
                {weekDates.map((date, index) => (
                    <div key={index} className="flex flex-col justify-start items-center text-white min-w-[20%] min-h-[600px] flex-grow border border-white">
                        <h2 className="uppercase py-4 border-b border-zinc-400">{date.toDateString()}</h2>
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
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

    // END

    // function createWeek(currentDay = new Date()) {
    //     const weekStart = new Date(currentDay);
    //     weekStart.setDate(currentDay.getDate() - currentDay.getDay());
    //     return 
    // }

    // TIMER FUNCTIONS

    // function createTimer(id, newTimer) {
    //     setTodos(todos.map(todo => todo.id === id ? (
    //         { ...todo, timer: newTimer }
    //     ) : todo
    //     ));
    // }

    // function updateTimer(id, timeLeft) {
    //     setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, timer: timeLeft } : todo));
    // }

    // END

    // const filteredTodos = todos.filter(todo => {
    //     // Check if the todo starts with the search term
    //     let matchesSearchTerm = searchTerm === "" || todo.task.toLowerCase().startsWith(searchTerm.toLowerCase());

    //     // Check if the todo matches the checkbox conditions
    //     let matchesPriority = !priorityChecked || todo.priority;
    //     let matchesOverdue = !overdueChecked || todo.overdue;
    //     let matchesCompleted = !completedChecked || todo.completed;

    //     // Return true if all conditions are met
    //     return matchesSearchTerm && matchesPriority && matchesCompleted && matchesOverdue;
    // });

    // console.log(date)

    // return (
    //     <>
    //         {/* THIS IS THE FILTER "MENU" */}
    //         {filterMenu ? (
    //             <div className="flex flex-row justify-evenly md:justify-center md:gap-2 items-center bg-zinc-800 border-b border-zinc-400 p-1 pt-5 rounded-b-3xl">
    //                 <div>
    //                     <input
    //                         type="text"
    //                         placeholder="Search tasks..."
    //                         className="rounded-lg p-1 bg-zinc-700 text-white outline-none md:w-full"
    //                         onChange={(e) => setSearchTerm(e.target.value)}
    //                     />
    //                 </div>
    //                 <div className="flex flex-row gap-2 my-2 items-center">
    //                     <input
    //                         type="checkbox"
    //                         name="priority"
    //                         id="priority"
    //                         value="priority"
    //                         onChange={(e) => setPriorityChecked(e.target.checked)}
    //                         className="peer relative appearance-none 
    //                     w-4 h-4 border 
    //                     rounded-full border-amber-500
    //                     cursor-pointer  
    //                     checked:bg-amber-500"/>
    //                     <label htmlFor="priority" className="text-slate-600">Priority</label><br />
    //                     <input
    //                         type="checkbox"
    //                         name="overdue"
    //                         id="overdue"
    //                         value="overdue"
    //                         onChange={(e) => setOverdueChecked(e.target.checked)}
    //                         className="peer relative appearance-none 
    //                     w-4 h-4 border 
    //                     rounded-full border-amber-500
    //                     cursor-pointer  
    //                     checked:bg-amber-500" />
    //                     <label htmlFor="overdue" className="text-slate-600">Overdue</label><br />
    //                     <input
    //                         type="checkbox"
    //                         name="completed"
    //                         id="completed"
    //                         value="completed"
    //                         onChange={(e) => setCompletedChecked(e.target.checked)}
    //                         className="peer relative appearance-none 
    //                     w-4 h-4 border 
    //                     rounded-full border-amber-500 
    //                     cursor-pointer  
    //                     checked:bg-amber-500" />
    //                     <label htmlFor="completed" className="text-slate-600">Completed</label>
    //                     {/* <span className="bg-white p-1 rounded-lg flex flex-row items-center gap-1">Filter <FaAngleDown /></span> */}
    //                 </div>
    //             </div>
    //         ) : (
    //             null
    //         )}

            {/* END */}

            {/* THIS IS THE TODO LIST WHICH MAPS TODOITEMS */}
//             {todos.length === 0 ? (
//                 <div className="flex flex-col flex-grow justify-center items-center p-2 h-full overflow-auto">
//                     <h1 className="text-4xl text-center font-teko text-white">No Task Set</h1>
//                     <Lottie animationData={Animations.loading} className='w-2/6 h-2/6' />
//                     <p className="text-center text-white">To create a new task, please name your task and click the create key.<br /> After creating a task you will be able to write more about your task and customise it to your personal needs!</p>
//                 </div>) : (
//                 <div className="grid grid-cols-7 h-full">
//                     <div>
//                         <h1 className="text-4xl text-center font-teko text-white">Monday</h1>
//                     </div>
//                     <div>
//                         <h1 className="text-4xl text-center font-teko text-white">Tuesday</h1>
//                     </div>
//                     <div>
//                         <h1 className="text-4xl text-center font-teko text-white">Wednesday</h1>
//                     </div>
//                     <div>
//                         <h1 className="text-4xl text-center font-teko text-white">Thursday</h1>
//                     </div>
//                     <div>
//                         <h1 className="text-4xl text-center font-teko text-white">Friday</h1>
//                     </div>
//                     <div>
//                         <h1 className="text-4xl text-center font-teko text-white">Saturday</h1>
//                     </div>
//                     <div>
//                         <h1 className="text-4xl text-center font-teko text-white">Sunday</h1>
//                     </div>
//                     {/* {filteredTodos.length > 0 ? (
//                         filteredTodos.map((todo, index) => (
//                             <TodoItem
//                                 key={index}
//                                 todo={todo}
//                                 editTodo={editTodo}
//                                 editingItemId={editingItemId}
//                                 editDescription={editDescription}
//                                 editTitle={editTitle}
//                                 deleteTodo={deleteTodo}
//                                 changePriority={changePriority}
//                                 markComplete={markComplete}
//                                 createTimer={createTimer}
//                                 changeOverdue={changeOverdue}
//                                 updateTimer={updateTimer}
//                             />
//                         ))
//                     ) : (
//                         <div className="flex flex-col flex-grow justify-center items-center p-2 h-full overflow-auto col-span-4">
//                             <h1 className="text-4xl text-center font-teko text-white">No Matching Task</h1>
//                             <Lottie animationData={Animations.loading} className='w-1/6 h-1/6' />
//                             <p className="text-center text-white">Please try again.</p>
//                         </div>
//                     )
//                     } */}
//                 </div>
//             )}
//             {/* END */}
//         </>
//     )
// }