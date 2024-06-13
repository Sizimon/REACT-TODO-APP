import { useEffect, useRef, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { FaThumbtack, FaTrash } from "react-icons/fa";
import Lottie from "lottie-react";
import Animations from "../Animations";
import Button from "./Button";

export default function TodoItem({ todo, editTodo, editingItemId, editDescription, deleteTodo, changePriority, markComplete, createTimer }) {
    const dialogRef = useRef(null);
    const [description, setDescription] = useState(todo.description);
    const [color, setColor] = useColor("#ffffff");
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);

    // Lottie Ref

    const completedRef = useRef(null);

    // Timer Parameters

    const timerHour = 3600;
    const timerDay = 86400;
    const timerWeek = 604800;

    // Timer 
    const [timerActive, setTimerActive] = useState(false)
    const [timerInput, setTimerInput] = useState(0)
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerType, setTimerType] = useState(timerHour);

    const selectedTimeType = timerType === timerHour ? "Hours" : timerType === timerDay ? "Days" : "Weeks";


    useEffect(() => {
        let timer = null; 

        if (timerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        
        return () => clearInterval(timer);
    }, [timerActive, timeLeft]);
    
    // END

    useEffect(() => {
        if (todo.isEditing && todo.id === editingItemId) {
            displayDialog();
        }
    }, [todo.isEditing, todo.id, editingItemId]);

    function displayDialog() {
        const dialog = dialogRef.current;
        dialog.showModal();
    }

    function closeDialog(id) {
        if (todo.id === id) {
            const updatedTask = { ...todo, isEditing: false, };
            editTodo(updatedTask);
        }

        const dialog = dialogRef.current;
        if (dialog) {
            dialog.close();
        }
    }

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

    console.log(timeLeft)

    return (
        <>
        {/* THIS IS THE TODO ITEM START */}
            <div className={`relative bg-zinc-700 border-box rounded-lg col-span-4 md:col-span-4 lg:col-span-2 flex flex-col justify-between items-center overflow-hidden border ${todo.priority ? "border-amber-500" : "border-zinc-400"} border-spacing-2 m-2 p-4 transition ease-in-out delay-50 ${todo.priority ? "shadow-amber-500" : "shadow-indigo-700"} hover:shadow-xl duration-500`}>
                {/* THIS IS THE OVERLAY IF AN ITEM IS MARKED AS COMPLETED */}
                {todo.completed && (
                    <div className="absolute inset-0 z-5 flex flex-col justify-center items-center bg-amber-500 opacity-95">
                        <p className="text-white text-xl">This task has been completed.</p>
                        <Lottie 
                            lottieRef={completedRef}
                            animationData={Animations.completed} 
                            loop={false} 
                            onComplete={() => completedRef.current.destroy()}
                            style={{ width: '100px'}}
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
                        <p className="text-center p-4 rounded-md whitespace-pre-wrap break-words text-white">{todo.description}</p>
                        <ul className="flex flex-row list-none p-2 text-white rounded-lg gap-2">
                            {todo.catagories ? todo.catagories.map((category, index) => (
                                <li key={index} style={{ backgroundColor: category.color }} className="rounded-lg p-1 border border-white">
                                    {category.name}
                                </li>
                            )) : null}
                        </ul>
                        {/* END */}

                        {/* TIMER */}
                        <div className="flex flex-col justify-center items-center">
                            <label className="text-white">Time to Complete in <span className="text-amber-500">{selectedTimeType}</span></label>
                            <input 
                            type="number" 
                            className="w-10 bg-zinc-800 text-white rounded-lg text-center focus:outline-none border border-amber-500"
                            onChange={(e) => setTimerInput(e.target.value)}
                            value={timerInput} />
                            <Button onClick={() => {
                                setTimeLeft(timerType * timerInput)
                                createTimer(todo.id, timeLeft)
                                setTimerActive(true)
                                setTimerInput(0)
                                }} text="Set Timer" />
                        </div>
                        {/* END */}

                        <div className="flex flex-row">
                            {/* THESE ARE THE BUTTONS FOR EDITING OR MARKING AS COMPLETED */}
                            <Button onClick={() => editTodo(todo.id)} text="Edit Task" />
                            <button
                                onClick={() => markComplete(todo.id)}
                                className="bg-transparent uppercase text-green-400 border border-green-400 hover:bg-green-400 hover:text-white hover:border-white  font-bold px-2 py-1 m-1 rounded-lg">
                                Mark Completed
                            </button>
                            {/* END */}
                        </div>
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

                <dialog
                    ref={dialogRef}
                    className="grid grid-cols-5 w-full md:w-10/12 lg:w-6/12 p-4 gap-4 rounded-lg border border-zinc-400 bg-zinc-800 text-white">
                    <div className="col-span-5 text-center">
                        <h1 className="uppercase pb-6 text-2xl">{todo.task}</h1>
                    </div>
                    <div className="col-span-5 md:col-span-2 text-center content-start">
                        <form
                            className="flex flex-col gap-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                submitCategory(categoryName, color.hex);
                            }}
                        >
                            <input
                                className="bg-zinc-700 rounded-lg text-white p-1  focus:outline-none"
                                placeholder="Create a category."
                                type="text"
                                value={categoryName}
                                onChange={e => setCategoryName(e.target.value)}
                            />
                            <ColorPicker
                                width={456}
                                height={160}
                                color={color}
                                onChange={setColor}
                                hideInput={["rgb", "hsv"]}
                            />
                            <Button text="Add Category" type="submit"/>
                        </form>
                    </div>
                    <div className="col-span-5 md:col-span-3 text-center content-start">
                        <textarea
                            required
                            value={description}
                            placeholder="Describe your task."
                            onChange={e => setDescription(e.target.value)}
                            rows="12"
                            className="bg-zinc-700 border rounded-lg p-2 text-white resize-none border-none w-full"
                        />
                        <div className="flex flex-col justify-center my-2">
                            <ul className="flex flex-row list-none p-auto justify-center">
                                {categories.map((category, index) => (
                                    <li
                                        key={index}
                                        style={{ backgroundColor: category.color }}
                                        onClick={() => removeCategory(index)}
                                        className="rounded-lg p-1 mx-1 border border-white cursor-pointer"
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-row justify-center gap-36 m-auto">
                            <Button onClick={() => {
                                closeDialog(todo.id);
                                editDescription(todo.id, description, categories);
                                }} text="Save & Close" />
                        </div>
                    </div>
                </dialog>

                // THIS IS THE DIALOG BOX END

            )}
        </>
    );
}

