import React from 'react'

export default function TodoContent({ todo, shortenDescription }) {
    return (
        <>
            <p className="text-left font-lato rounded-md whitespace-pre-wrap break-words text-white text-xs">{shortenDescription(todo.description)}</p>
            {/* <ul className="flex flex-row list-none p-2 text-white rounded-lg gap-2">
                {todo.categories ? todo.categories.map((category, index) => (
                    <li key={index} style={{ backgroundColor: category.color }} className="rounded-lg p-1">
                        {category.name}
                    </li>
                )) : null}
            </ul> */}
        </>
    )
}
