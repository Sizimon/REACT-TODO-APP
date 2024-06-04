import React from 'react'
import { useState } from 'react'

export default function Navigation({ createTodo }) {
    const [todo, setTodo] = useState('')

    function handleTodo() {
        createTodo(todo)
        setTodo('')
    }

    return (
        <nav className="flex flex-row justify-between items-center bg-zinc-800 border-b border-zinc-400 p-6 w-full sticky z-10 top-0">
            <div>
                <p>LOGO</p>
            </div>
            <div>
                <input
                    required
                    type="text"
                    onChange={e => setTodo(e.target.value)}
                    value={todo}
                    placeholder="Name your task!"
                    className="rounded-md px-2 py-1 mx-2 bg-zinc-700 text-white outline-none" />
                <button
                    className="bg-transparent border border-white hover:border-indigo-700 hover:bg-indigo-700 text-white font-bold px-2 py-1 m-1 rounded-2xl"
                    onClick={handleTodo}
                >Create</button>
            </div>
            <div>
                <p>LOGOUT</p>
            </div>
        </nav>
    )
}

