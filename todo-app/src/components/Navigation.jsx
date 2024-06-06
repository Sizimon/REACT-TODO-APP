import React from 'react'
import { useState } from 'react'
import Lottie from 'lottie-react'
import Animations from '../Animations'

export default function Navigation({ createTodo }) {
    const [todo, setTodo] = useState('')

    function handleTodo() {
        createTodo(todo)
        setTodo('')
    }

    return (
        <nav className="flex flex-col justify-between items-center bg-zinc-800 border-b border-zinc-400 pb-6 px-6 w-full sticky z-10 top-0">
            <div className='flex flex-row items-center w-full justify-between'>
                <p className='text-white'>ABOUT</p>
                <div className='flex flex-row justify-center items-baseline'>
                    <Lottie animationData={Animations.logo} style={{ width: '100px' }}/><br />
                    <h1 className='text-white text-3xl'>In<span className='text-amber-500'>Time</span>Tasks</h1>
                </div>
                <p className='text-white'>LOGOUT</p>
            </div>
            <div>
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
            </div>
        </nav>
    )
}

