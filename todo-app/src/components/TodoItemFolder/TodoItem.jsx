import { useEffect, useRef, useState } from "react";
import { FaThumbtack, FaTrash } from "react-icons/fa";
import Lottie from "lottie-react";
import Animations from "../../Animations";
import Button from "../AdditionalElementsFolder/Button";
import Dialog from "./SubComponents/Dialog";
import TodoContent from "./SubComponents/TodoContent";

export default function TodoItem({ todo, editTodo, editingItemId, editDescription, editTitle, deleteTodo, changePriority, changeOverdue, markComplete, createTimer, updateTimer }) {

    // LIFTED DIALOG STATES

    const dialogRef = useRef(null);
    const [description, setDescription] = useState(todo.description);
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);

    // LOTTIE REF

    const completedRef = useRef(null);

    // TIMER ACTIVE STATE

    // const [timerActive, setTimerActive] = useState(false)

    // END

    // DIALOG FUNCTIONS

    function displayDialog() {
        const dialog = dialogRef.current;
        dialog.showModal();
    }

    function closeDialog(id) {
        if (todo.id === id && description.length > 0) {
            const updatedTask = { ...todo, isEditing: false, };
            editTodo(updatedTask);

            const dialog = dialogRef.current;
            if (dialog) {
                dialog.close();
            }
        } else {
            alert('Please enter a description for your task.')
        }
    }

    useEffect(() => {
        if (todo.isEditing && todo.id === editingItemId) {
            displayDialog();
        }
    }, [todo.isEditing, todo.id, editingItemId]);

    const submitCategory = (categoryName, color) => {
        if (categories.length < 5 && categoryName.length > 0) {
            setCategories(prevCategories => [...prevCategories, { name: categoryName, color: color }]);
            setCategoryName('');
        } else if (categoryName === '') {
            alert('Your category must have a name.')
        } else {
            alert('You can have a maximum of 5 categories per task.')
        }
    }

    const removeCategory = (index) => {
        setCategories(prevCategories => prevCategories.filter((_, i) => i !== index));
    }

    // END

    return (
        <>
            {/* THIS IS THE TODO ITEM START */}
            <div className={`relative bg-zinc-700 border-box rounded-lg col-span-4 md:col-span-4 lg:col-span-2 flex flex-col justify-between items-center overflow-auto border ${todo.priority ? "border-amber-500" : "border-zinc-400"} border-spacing-2 m-2 p-4 min-h-[300px] md:min-h-[500px] lg:min-h-[500px] transition ease-in-out delay-50 ${todo.priority ? "shadow-amber-500" : "shadow-indigo-700"} hover:shadow-xl duration-500`}>
                {/* THIS IS THE OVERLAY IF AN ITEM IS MARKED AS COMPLETED */}
                {todo.completed && (
                    <div className="absolute inset-0 z-[5] flex flex-col justify-center items-center bg-amber-500 opacity-95">
                        <p className="text-white text-xl">This task has been completed.</p>
                        <Lottie
                            lottieRef={completedRef}
                            animationData={Animations.completed}
                            loop={false}
                            onComplete={() => completedRef.current.destroy()}
                            style={{ width: '100px' }}
                        />
                        <button onClick={() => markComplete(todo.id)}>Undo</button>
                    </div>
                )}
                {/* END */}
                <div className="flex flex-row justify-between w-full">
                    {/* THESE ARE THE BUTTONS FOR DELETING OR MARKING PRIORITY */}
                    <div className="flex flex-row items-center gap-1">
                        <FaTrash
                            onClick={() => deleteTodo(todo.id)}
                            className="text-red-500 hover:text-red-700 cursor-pointer transform hover:scale-110 transition ease-in-out duration-300"
                        />
                        <p className="text-sm text-slate-500">Delete</p>
                    </div>
                    <h2 className="uppercase font-teko font-medium text-4xl text-white">{todo.task}</h2>
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-sm text-slate-500">Prioritise</p>
                        <FaThumbtack
                            onClick={() => changePriority(todo.id)}
                            className="text-amber-300 hover:text-amber-500 cursor-pointer transform hover:scale-110 transition ease-in-out duration-300"
                        />
                    </div>
                    {/* END */}
                </div>
                {todo.description ? (
                    <>
                        {/* THIS IS WHERE TODOITEM DATA IS DISPLAYED */}
                        <TodoContent 
                            todo={todo} 
                        />
                        {/* END */}

                        {/* TIMER */}
                        {/* {todo.overdue ? (
                            <div>
                                <p>This task is overdue, make sure you catch up!</p>
                            </div>
                        ) : (
                            <Timer
                            todo={todo}
                            timerActive={timerActive}
                            setTimerActive={setTimerActive}
                            createTimer={createTimer}
                            changeOverdue={changeOverdue}
                            updateTimer={updateTimer}
                        />
                        )} */}
                        {/* END */}

                        {/* THESE ARE THE BUTTONS FOR EDITING OR MARKING AS COMPLETED */}
                        <div className="flex flex-row">
                            <Button onClick={() => editTodo(todo.id)} text="Edit Task" />
                            <button
                                onClick={() => markComplete(todo.id)}
                                className="bg-transparent uppercase text-green-400 border border-green-400 hover:bg-green-400 hover:text-white hover:border-white  font-bold px-2 py-1 m-1 rounded-lg">
                                Mark Completed
                            </button>
                        </div>
                        {/* END */}
                    </>
                ) : (

                    // THIS IS THE INITAL PLACEHOLDER FOR A TODOITEM BEFORE USER EDITTING

                    <>
                        <p className="text-center p-4 whitespace-pre-wrap text-white">Write a description about your task.</p>
                        <div className="flex flex-row">
                            <Button onClick={() => editTodo(todo.id)} text="Describe Task" />
                        </div>
                    </>
                )}
            </div>

            {/* THIS IS THE TODO ITEM END */}

            {todo.isEditing && todo.id === editingItemId && (

            // THIS IS THE DIALOG BOX START

                <Dialog
                    todo={todo}
                    description={description}
                    setDescription={setDescription}
                    categories={categories}
                    categoryName={categoryName}
                    setCategoryName={setCategoryName}
                    removeCategory={removeCategory}
                    submitCategory={submitCategory}
                    closeDialog={closeDialog}
                    editDescription={editDescription}
                    editTitle={editTitle}
                    dialogRef={dialogRef}
                />
            // THIS IS THE DIALOG BOX END
            )}
        </>
    );
}