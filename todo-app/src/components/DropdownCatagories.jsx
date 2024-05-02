import React from 'react';
import { useState } from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

export default function DropdownCatagories() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='relative flex flex-col items-center'>
            <button 
                onClick={() => setIsOpen((prev) => !prev)} 
                className="flex items-center bg-slate-600 hover:bg-slate-900 text-white font-bold px-2 py-1 m-1 rounded-lg gap-2 border-2 border-transparent focus:border-white"
            >
                Add Catagories
                {!isOpen ? (
                    <AiOutlineCaretDown className='h-8'/>
                ): (
                    <AiOutlineCaretUp className='h-8'/>
                )}
            </button>
            {isOpen && <div className='flex flex-col bg-slate-400 border-black text-white absolute top-12 rounded-lg overflow-hidden w-full'>
                <span 
                className='p-2 hover:bg-slate-600'
                >
                    HTML
                </span>
                <span className='p-2 hover:bg-slate-600'>CSS</span>
                <span className='p-2 hover:bg-slate-600'>Javascript</span>
                <span className='p-2 hover:bg-slate-600'>React</span>
            </div>}
        </div>
    )
}