import { useEffect, useRef, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { FaThumbtack, FaTrash } from "react-icons/fa";

export default function TodoItem({ todo, editTodo, editingItemId, editDescription, deleteTodo, changePriority }) {
    const dialogRef = useRef(null);
    const [description, setDescription] = useState(todo.description);
    const [color, setColor] = useColor("#ffffff");
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);

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

    console.log(todo)

    return (
        <>
            <div className="border-box col-span-4 md:col-span-4 lg:col-span-2 flex flex-col justify-center items-center border border-slate-400 border-spacing-2 m-2 p-4 transition ease-in-out delay-50 hover:shadow-xl duration-500">
                <div className="flex flex-row justify-between w-full">
                    <FaTrash
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer transform hover:scale-110 transition ease-in-out duration-300"
                    />
                    <h2 className="uppercase font-teko font-medium text-4xl">{todo.task}</h2>
                    <FaThumbtack
                    onClick={() => changePriority(todo.id)}
                    className="text-amber-300 hover:text-amber-500 cursor-pointer transform hover:scale-110 transition ease-in-out duration-300"
                    />
                </div>
                {todo.description ? (
                    <>
                        <p className="border border-spacing-2 text-center p-4 rounded-md whitespace-pre-wrap">{todo.description}</p>
                        <ul className="flex flex-row list-none p-2 border border-white rounded-lg gap-2">
                            {categories.map((category, index) => (
                                <li key={index} style={{backgroundColor: category.color}} className="rounded-lg p-1 border border-white">
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-row">
                            <button
                                onClick={() => editTodo(todo.id)}
                                className="bg-slate-600 uppercase hover:bg-slate-900 text-white font-bold px-2 py-1 m-1 rounded-2xl">
                                Edit Task
                            </button>
                            <button
                                className="bg-white uppercase text-green-400 border border-green-400 hover:bg-green-400 hover:text-white hover:border-white  font-bold px-2 py-1 m-1 rounded-2xl">
                                Mark Completed
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-center p-4 whitespace-pre-wrap">Write a description about your task.</p>
                        <div className="flex flex-row">
                            <button
                                onClick={() => editTodo(todo.id)}
                                className="bg-slate-600 uppercase hover:bg-slate-900 text-white font-bold px-2 py-1 m-1 rounded-2xl">
                                Describe task
                            </button>
                        </div>
                    </>
                )}
            </div>
            {todo.isEditing && todo.id === editingItemId && (
                <dialog
                    ref={dialogRef}
                    className="grid grid-cols-5 w-full md:w-10/12 lg:w-6/12 p-4 gap-4 rounded-lg border border-slate-900 bg-slate-200 text-black">
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
                            className="bg-white rounded-lg text-black p-1" 
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
                            <button 
                            className="bg-white text-slate-900 rounded-lg p-2"
                            type="submit"
                            >Add as Category</button>
                        </form>
                    </div>
                    <div className="col-span-5 md:col-span-3 text-center content-start">
                        <textarea
                            required
                            value={description}
                            placeholder="Describe your task."
                            onChange={e => setDescription(e.target.value)}
                            rows="12"
                            className="bg-white border rounded-lg p-2 text-black resize-none border-none w-full"
                        />
                        <div className="flex flex-col justify-center my-2">
                            <ul className="flex flex-row list-none p-auto justify-center">
                                {categories.map((category, index) => (
                                    <li key={index} style={{backgroundColor: category.color}} className="rounded-lg p-1 mx-1 border border-white">
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-row justify-center gap-36 m-auto">
                            <button
                                className="bg-white text-slate-900 rounded-lg p-2"
                                onClick={() => {
                                    closeDialog(todo.id);
                                    editDescription(todo.id, description, categories);
                                }}>Save & Close</button>
                        </div>
                    </div>
                    
                </dialog>
            )}
        </>
    );
}

