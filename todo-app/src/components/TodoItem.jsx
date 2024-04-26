import { useEffect, useRef } from "react";

export default function TodoItem({ task, editTask, editingItemId }) {
    const dialogRef = useRef(null);
    useEffect(() => {
        if (task.isEditing && task.id === editingItemId) {
            displayDialog();
        }
    }, [task.isEditing, task.id, editingItemId]);

    function displayDialog() {
        const dialog = dialogRef.current;
        dialog.showModal();
    }

    function closeDialog(id) {
        if (task.id === id) {
            const updatedTask = {...task, isEditing: false};
            editTask(updatedTask);
        } 

        const dialog = dialogRef.current;
        if (dialog) {
            dialog.close();
        }
    }

    return (
        <>
            <div className="col-span-4">
                <h2>{task.task}</h2>
                {task.description ? <p>{task.description}</p> : (
                    <button
                        onClick={() => editTask(task.id)}
                        className="bg-slate-600 hover:bg-slate-900 text-white font-bold px-2 py-1 m-1 rounded-2xl">
                        Describe your task
                    </button>
                )}
            </div>
            {task.isEditing && task.id === editingItemId && (
                <dialog 
                ref={dialogRef}
                className="flex flex-col p-12 rounded-lg bg-slate-900 text-white">
                    <h2 className="uppercase">{task.task}</h2>
                    <textarea cols="60" rows="14" className="bg-slate-900 border border-white" />
                    <form method="dialog">
                        <button onClick={() => closeDialog(task.id)}>Close</button>
                    </form>
                </dialog>
            )}
        </>
    );
}

