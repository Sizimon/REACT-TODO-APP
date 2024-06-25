import React from 'react'

function Button({ onClick, text }) {
    return (
        <button
            className={`bg-black hover:bg-amber-500 text-white font-lato px-2 py-1 m-1 rounded-lg uppercase transition ease-in-out duration-300`}
            onClick={onClick}
        >{text}</button>
    )
}

export default Button