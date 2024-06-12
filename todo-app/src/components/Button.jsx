import React from 'react'

function Button({ onClick, text }) {
    return (
        <button
            className="bg-transparent border border-white hover:border-amber-500 hover:bg-amber-500 text-white font-bold px-2 py-1 m-1 rounded-lg uppercase"
            onClick={onClick}
        >{text}</button>
    )
}

export default Button