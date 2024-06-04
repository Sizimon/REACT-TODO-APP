import React from 'react'
import { useState } from 'react'

export default function Navigation({ createTodo }) {
    const [todo, setTodo] = useState('')

    function handleTodo() {
        createTodo(todo)
        setTodo('')
    }

    return (
        <nav className="flex flex-col justify-center items-center bg-gradient-to-r from-sky-300 to-gray-300 p-4 w-full sticky z-10 top-0">
            <div>
                <input
                    required
                    type="text"
                    onChange={e => setTodo(e.target.value)}
                    value={todo}
                    placeholder="Name your task!"
                    className="rounded-md px-2 py-1 mx-2" />
                <button
                    className="bg-transparent border border-white hover:bg-white hover:text-blue-300 text-white font-bold px-2 py-1 m-1 rounded-2xl"
                    onClick={handleTodo}
                >Create</button>
            </div>
        </nav>
    )
}

