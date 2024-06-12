import React from 'react'

function Button({ onClick, text }) {
    return (
        <button
            className="bg-transparent border border-white hover:border-indigo-700 hover:bg-indigo-700 text-white font-bold px-2 py-1 m-1 rounded-lg uppercase"
            onClick={onClick}
        >{text}</button>
    )
}

export default Button