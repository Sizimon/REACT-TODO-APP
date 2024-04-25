export default function TodoItem ({ task, editTask }) {
    return (
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
    )
}