import { useEffect, useRef, useState } from "react";

export default function TodoItem({ todo, editTodo, editingItemId, editDescription }) {
    const dialogRef = useRef(null);
    const [description, setDescription] = useState(todo.description);

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
            const updatedTask = {...todo, isEditing: false,};
            editTodo(updatedTask);
        }

        const dialog = dialogRef.current;
        if (dialog) {
            dialog.close();
        }
    }

    return (
        <>
            <div className="col-span-4 md:col-span-2 flex flex-col justify-center items-center border border-slate-400 border-spacing-2 m-4 p-4 gap-6 transition ease-in-out delay-50 hover:shadow-xl duration-500">
                <h2 className="uppercase font-teko font-medium text-4xl">{todo.task}</h2>
                {todo.description ? (
                <>
                <p className="border border-spacing-2 text-center p-4 rounded-md">{todo.description}</p>
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
                        Describe your task
                    </button>
                )}
            </div>
            {todo.isEditing && todo.id === editingItemId && (
                <dialog 
                ref={dialogRef}
                className="flex flex-col p-12 rounded-lg bg-slate-900 text-white">
                    <h2 className="uppercase">{todo.task}</h2>
                    <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)} 
                    cols="60" 
                    rows="14" 
                    className="bg-slate-900 border border-white rounded-lg p-2 text-white"
                    />
                    <div className="flex gap-24 m-auto">
                        <button>Woopsie</button>
                        <button onClick={() => {
                            closeDialog(todo.id);
                            editDescription(todo.id, description);
                            }}>Save & Close</button>
                    </div>
                </dialog>
            )}
        </>
    );
}

