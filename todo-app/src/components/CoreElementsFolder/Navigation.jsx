import React from 'react'
import { useState } from 'react'
import Button from '../AdditionalElementsFolder/Button'

export default function Navigation({ createTodo }) {
    const [todo, setTodo] = useState('')
    const [selectedDate, setSelectedDate] = useState('')

    function handleTodo() {
        createTodo(todo, selectedDate)
        setTodo('')
    }

    console.log(selectedDate)

    return (
        <nav className="flex flex-col justify-between items-center bg-zinc-800 border-b border-zinc-400 px-6 w-full sticky z-10 top-0">
            <div className='flex flex-row items-center w-full justify-between mt-4'>
                <p className='text-white'>ABOUT</p>
                <p className='text-white'>LOGOUT</p>
            </div>
            <div className='flex flex-row items-center w-full justify-center'>
                <div className='flex flex-row justify-center items-baseline'>
                    <h1 className='text-white text-3xl'>In<span className='text-amber-500'>Time</span>Tasks</h1>
                </div>
            </div>
            <div>
                <div>
                    <input
                        required
                        type="text"
                        onChange={e => setTodo(e.target.value)}
                        value={todo}
                        placeholder="Name your task!"
                        className="rounded-md px-2 py-1 mx-2 bg-zinc-700 text-white outline-none"
                    />
                    <input
                        type="date"
                        onChange={(e) => setSelectedDate(e.target.value)}
                        value={selectedDate}
                        className='bg-zinc-700 text-white rounded-lg p-1' />
                    <Button
                        onClick={handleTodo}
                        text={'Create'}
                    />
                </div>
            </div>
        </nav>
    )
}

