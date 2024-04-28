import { useEffect, useRef, useState } from "react";

export default function TodoItem({ todo, editTodo, editingItemId }) {
    const dialogRef = useRef(null);
    // const [description, setDescription] = useState(''); ATTEMPTED FIX NOT WORKING

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

    // function handleDescription() {
    //     editDescription(todo.id, description);
    // } ATTEMPTED FIX NOT WORKING

    return (
        <>
            <div className="col-span-4">
                <h2 className="uppercase">{todo.task}</h2>
                {todo.description ? (
                <>
                <p>{todo.description}</p>
                <button
                    onClick={() => editTodo(todo.id)}
                    className="bg-slate-600 hover:bg-slate-900 text-white font-bold px-2 py-1 m-1 rounded-2xl">
                    Edit
                </button>
                </>
            ) : (
                    <button
                        onClick={() => editTodo(todo.id)}
                        className="bg-slate-600 hover:bg-slate-900 text-white font-bold px-2 py-1 m-1 rounded-2xl">
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
                    // value={description} ATTEMPTED FIX NOT WORKING
                    // onChange={e => setDescription(e.target.value)} ATTEMPTED FIX NOT WORKING
                    cols="60" 
                    rows="14" 
                    className="bg-slate-900 border border-white rounded-lg p-2 text-white"
                    />
                    <div className="flex gap-24 m-auto">
                        <button>Woopsie</button>
                        <button onClick={() => {
                            // handleDescription(); ATTEMPTED FIX NOT WORKING
                            closeDialog(todo.id);
                            }}>Save & Close</button>
                    </div>
                </dialog>
            )}
        </>
    );
}

