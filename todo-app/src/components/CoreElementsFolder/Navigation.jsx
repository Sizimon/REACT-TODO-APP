import React from 'react'
import { useState } from 'react'
import Button from '../AdditionalElementsFolder/Button'

export default function Navigation({ createTodo }) {
    const [todo, setTodo] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

    function handleTodo() {
        createTodo(todo, selectedDate)
        setTodo('')
    }

    return (
        <nav className="flex flex-col justify-between items-center bg-zinc-800 border-b border-zinc-400 px-6 w-full sticky z-10 top-0">
            <div className='flex flex-row items-center w-full justify-between mt-4'>
                <p className='text-white font-lato'>ABOUT</p>
                <p className='text-white font-lato'>LOGOUT</p>
            </div>
            <div className='flex flex-row items-center w-full justify-center'>
                <div className='flex flex-row justify-center items-baseline'>
                    <h1 className='text-white text-3xl font-lato'>In<span className='text-amber-500 font-lato'>Time</span>Tasks</h1>
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
                        className="rounded-md px-2 py-1 mx-2 bg-zinc-700 text-white outline-none font-lato"
                    />
                    <input
                        required
                        type="date"
                        onChange={(e) => setSelectedDate(e.target.value)}
                        value={selectedDate}
                        className='bg-zinc-700 text-white rounded-lg p-1 focus:outline-none dark:[color-scheme:dark] font-lato' />
                    <Button
                        onClick={handleTodo}
                        text={'Create'}
                        bgColor={'black'}
                        textColor={'white'}
                        hoverColor={'bg-amber-500'}
                    />
                </div>
            </div>
        </nav>
    )
}

