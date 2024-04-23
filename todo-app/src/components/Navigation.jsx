import React from 'react'
import TagButton from './TagButton'
import DropdownCatagories from './DropdownCatagories'

export default function Navigation() {
    return (
        <nav className="flex flex-col justify-center items-center bg-gray-800 p-4 w-auto">
            <div>
                <input type="text" placeholder="Create a todo..." className="rounded-md px-2 py-1 mx-2" />
                <button className="bg-slate-600 hover:bg-slate-900 text-white font-bold px-2 py-1 m-1 rounded-2xl">Create</button>
            </div>
            <div className='mt-4'>
                <h3 className='text-white'>Add catagories to your todo.</h3>
            </div>
            <div className="flex justify-center">
                <DropdownCatagories />
            </div>
        </nav>
    )
}