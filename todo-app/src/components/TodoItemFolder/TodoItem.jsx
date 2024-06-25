import { useEffect, useRef, useState } from "react";
import { FaThumbtack, FaTrash } from "react-icons/fa";
import { FaChevronRight, FaCircleCheck } from "react-icons/fa6";
import Lottie from "lottie-react";
import Animations from "../../Animations";
import Button from "../AdditionalElementsFolder/Button";

import MenuButton from "../AdditionalElementsFolder/MenuButton"
import Dialog from "./SubComponents/Dialog";
import TodoContent from "./SubComponents/TodoContent";
import TodoItemExpanded from "./TodoItemExpanded";

export default function TodoItem({ todo, editTodo, editingItemId, editDescription, editTitle, deleteTodo, changePriority, changeOverdue, markComplete, expandTodo, expandedItemId }) {

    // SHORTEN DESCRIPTION FUNCTION

    const shortenDescription = (description, maxLength = 100) => {
        if (description.length > maxLength) {
            return `${description.substring(0, maxLength)}...`;
        }
        return description;
    }

    // OPTIONS MENU 

    const [options, setOptions] = useState(false);
    const [active, setActive] = useState(false)

    // LIFTED DIALOG STATES

    const dialogRef = useRef(null);
    const expandedRef = useRef(null);
    const [description, setDescription] = useState(todo.description);
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);

    // LOTTIE REF

    const completedRef = useRef(null);


    // EDITTING DIALOG FUNCTIONS

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

    // EXPAND DIALOG FUNCTIONS

    function displayExpanded() {
        const dialog = expandedRef.current;
        dialog.showModal();
    }

    function closeExpanded(id) {
        if (todo.id === id) {
            const updatedTask = { ...todo, isExpanded: false, };
            expandTodo(updatedTask);

            const dialog = expandedRef.current;
            if (dialog) {
                dialog.close();
            }
        }
    }

    useEffect(() => {
        if (todo.isExpanded && todo.id === expandedItemId) {
            displayExpanded();
        }
    }, [todo.isExpanded, todo.id, expandedItemId]);

    // DRAGGABLE FUNCTIONALITY

    const handleDragStart = (e) => {
        e.dataTransfer.setData("todoId", todo.id);
    }

    return (
        <>
            {/* THIS IS THE TODO ITEM START */}
            <div 
            draggable
            onDragStart={handleDragStart}
            className={`relative bg-zinc-700 border-box w-[90%] rounded-lg flex flex-col justify-center items-center overflow-visible border ${todo.priority ? "border-amber-500" : "border-zinc-400"} border-spacing-2 m-1 p-1 transition ease-in-out delay-50 ${todo.priority ? "shadow-amber-500" : "shadow-indigo-700"} hover:shadow-xl duration-500`}>
                {/* THIS IS THE OVERLAY IF AN ITEM IS MARKED AS COMPLETED */}
                {todo.completed && (
                    <div className="absolute inset-0 z-[5] flex flex-col justify-center items-center bg-amber-500 opacity-95">
                        <p className="text-white text-sm">This task has been completed.</p>
                        <Lottie
                            lottieRef={completedRef}
                            animationData={Animations.completed}
                            loop={false}
                            onComplete={() => completedRef.current.destroy()}
                            style={{ width: '40px' }}
                        />
                        <button 
                        onClick={() => markComplete(todo.id)}
                        className="text-sm hover:text-white text-black cursor-pointer"
                        >Undo</button>
                    </div>
                )}
                {/* END */}
                <div className="flex flex-row justify-between w-full items-center">
                    {/* THESE ARE THE BUTTONS FOR DELETING OR MARKING PRIORITY */}
                    {/* <div className="flex flex-row items-center gap-1">
                        <FaTrash
                            onClick={() => deleteTodo(todo.id)}
                            className="text-red-500 hover:text-red-700 cursor-pointer transform hover:scale-110 transition ease-in-out duration-300"
                        />
                        <p className="text-sm text-slate-500">Delete</p>
                    </div> */}
                    <h1 className="uppercase font-lato text-base text-amber-500">{todo.task}</h1>
                    <div className="flex flex-row items-center gap-1">
                        {todo.description && (
                            <MenuButton 
                            options={options}
                            setOptions={setOptions}
                            active={active}
                            setActive={setActive}
                            /> 
                        )}
                        {/* <FaThumbtack
                            onClick={() => changePriority(todo.id)}
                            className="text-amber-500 hover:text-amber-600 cursor-pointer text-sm transform hover:scale-110 transition ease-in-out duration-100"
                        /> */}
                    </div>
                    {/* END */}
                </div>
                {todo.description ? (
                    <>
                        {/* THIS IS WHERE TODOITEM DATA IS DISPLAYED */}
                        <div className="flex flex-col w-full justify-start items-start mb-2">
                        <TodoContent 
                            todo={todo}
                            shortenDescription={shortenDescription} 
                        />
                        </div>
                        {/* END */}

                        {/* THESE ARE THE BUTTONS FOR EDITING OR MARKING AS COMPLETED */}
                        <div className="flex flex-row w-full justify-start">
                            <button 
                            onClick={() => {
                                expandTodo(todo.id);
                            }}
                            className="flex flex-row items-center text-xs text-amber-500">
                                Expand
                                <FaChevronRight />
                            </button>
                        </div>
                        <div className="flex flex-row w-full justify-center pb-2">
                            <ul className="flex flex-row font-lato">
                                {
                                    todo.categories && todo.categories.map((category, index) => (
                                        <li 
                                        key={index} 
                                        style={{ backgroundColor: category.color }} 
                                        className="rounded-lg p-1 m-1 text-center uppercase text-[10px]">
                                            {category.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        {/* <div className="flex flex-row gap-12">
                            <FaTrash
                                onClick={() => deleteTodo(todo.id)}
                                className="text-red-500 hover:text-red-600 text-lg cursor-pointer transform hover:scale-110 transition ease-in-out duration-100" />
                            <FaCircleCheck 
                                onClick={() => markComplete(todo.id)}
                                className="text-green-500 hover:text-green-600 text-lg cursor-pointer transform hover:scale-110 transition ease-in-out duration-100"
                            />
                        </div> */}
                        {/* END */}
                    </>
                ) : (

                    // THIS IS THE INITAL PLACEHOLDER FOR A TODOITEM BEFORE USER EDITTING
                    <>
                        <div className="flex flex-row w-full justify-start items-start">
                        <button 
                            onClick={() => {
                                editTodo(todo.id);
                            }}
                            className="flex flex-row items-center text-xs text-white hover:text-amber-500">
                                Describe Your Task
                                <FaChevronRight />
                            </button>
                        </div>
                    </>
                )}
                {options && (
                        <ul className="absolute top-[30%] left-[90%] text-center bg-zinc-800 border z-20 border-amber-500 text-amber-500 w-[100px]">
                            <li 
                            onClick={() => changePriority(todo.id)}
                            className="text-xs cursor-pointer hover:bg-amber-500 hover:text-white w-full p-1">
                                Mark Priority
                            </li>
                            <li 
                            onClick={() => {
                                setOptions(!options);
                                setActive(!active);
                                markComplete(todo.id);
                            }}
                            className="text-xs cursor-pointer hover:bg-amber-500 hover:text-white w-full p-1">
                                Mark Complete
                            </li>
                            <li 
                            onClick={() => deleteTodo(todo.id)}
                            className="text-xs cursor-pointer hover:bg-amber-500 hover:text-white w-full p-1">
                                Delete Task
                            </li>
                        </ul>
                        )
            }
            </div>

            {/* THIS IS THE TODO ITEM END */}

            {todo.isEditing && todo.id === editingItemId && (

            // THIS IS THE USER INITIALIZATION OF TASK BOX START

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
            // END
            )}

            {todo.isExpanded && todo.id === expandedItemId && (
                <TodoItemExpanded 
                    expandedRef={expandedRef}
                    dialogRef={dialogRef}
                    todo={todo}
                    closeExpanded={closeExpanded}
                    displayDialog={displayDialog}
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
                    editingItemId={editingItemId}
                    editTodo={editTodo}
                />
            )}
        </>
    );
}