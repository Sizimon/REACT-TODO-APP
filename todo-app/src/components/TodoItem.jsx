import { useEffect, useRef, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function TodoItem({ todo, editTodo, editingItemId, editDescription }) {
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
        setCategories(prevCategories => [...prevCategories, { name: categoryName, color: color }]);
        setCategoryName('');
    }

    return (
        <>
            <div className="col-span-4 md:col-span-2 flex flex-col justify-center items-center border border-slate-400 border-spacing-2 m-4 p-4 gap-6 transition ease-in-out delay-50 hover:shadow-xl duration-500">
                <h2 className="uppercase font-teko font-medium text-4xl">{todo.task}</h2>
                {todo.description ? (
                    <>
                        <p className="border border-spacing-2 text-center p-4 rounded-md whitespace-pre-wrap">{todo.description}</p>
                        <ul className="flex flex-row list-none p-12 border border-white rounded-lg gap-2">
                            {categories.map((category, index) => (
                                <li key={index} style={{backgroundColor: category.color}} className="rounded-lg p-1 border border-white">
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => editTodo(todo.id)}
                            className="bg-slate-600 uppercase hover:bg-slate-900 text-white font-bold px-2 py-1 m-1 rounded-2xl">
                            Edit
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => editTodo(todo.id)}
                        className="bg-slate-600 uppercase hover:bg-slate-900 text-white font-bold px-2 py-1 m-1 rounded-2xl">
                        Describe task
                    </button>
                )}
            </div>
            {todo.isEditing && todo.id === editingItemId && (
                <dialog
                    ref={dialogRef}
                    className="grid grid-cols-3 md:grid-cols-3 p-6 rounded-lg border border-white bg-slate-900 text-white">
                    <div className="col-span-3 md:col-span-2 text-center">
                        <h1 className="uppercase pb-6 text-2xl">{todo.task}</h1>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            cols="52"
                            rows="12"
                            className="bg-slate-900 border border-white rounded-lg p-2 text-white text-center"
                        />
                        <div className="flex flex-col justify-center m-auto my-6">
                            <ul className="flex flex-row list-none p-12 border border-white rounded-lg gap-2">
                                {categories.map((category, index) => (
                                    <li key={index} style={{backgroundColor: category.color}} className="rounded-lg p-1 border border-white">
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-row justify-center gap-36 m-auto">
                            <button className="bg-white text-slate-900 rounded-lg p-2">Woopsie</button>
                            <button
                                className="bg-white text-slate-900 rounded-lg p-2"
                                onClick={() => {
                                    closeDialog(todo.id);
                                    editDescription(todo.id, description);
                                }}>Save & Close</button>
                        </div>
                    </div>
                    <div className="col-span-3 md:col-span-1 text-center">
                        <h2 className="uppercase pb-6 text-md">Add Categories</h2>
                        <form 
                        className="flex flex-col m-2 gap-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitCategory(categoryName, color.hex);
                        }}
                        >
                            <label>Category Name:</label>
                            <input 
                            className="bg-slate-900 border border-white rounded-lg text-white text-center" 
                            type="text" 
                            onChange={e => setCategoryName(e.target.value)} 
                            />
                            <h2>Color</h2>
                            <ColorPicker
                                width={456}
                                height={100}
                                color={color}
                                onChange={setColor}
                                hideInput={["rgb", "hsv"]}
                                dark />
                            <button 
                            className="bg-white text-slate-900 rounded-lg p-2"
                            type="submit"
                            >Add as Category</button>
                        </form>
                    </div>
                </dialog>
            )}
        </>
    );
}

