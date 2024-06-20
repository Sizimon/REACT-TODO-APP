import React from 'react'

export default function TodoContent({ todo }) {
    return (
        <>
            <p className="text-left rounded-md whitespace-pre-wrap break-words text-white text-xs">{todo.description}</p>
            <ul className="flex flex-row list-none p-2 text-white rounded-lg gap-2">
                {todo.catagories ? todo.catagories.map((category, index) => (
                    <li key={index} style={{ backgroundColor: category.color }} className="rounded-lg p-1 border border-white">
                        {category.name}
                    </li>
                )) : null}
            </ul>
        </>
    )
}
