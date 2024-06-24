import React from 'react'

function Button({ onClick, text, hoverColor, bgColor, textColor }) {
    return (
        <button
            className={`bg-${bgColor} hover:${hoverColor} text-${textColor} font-lato px-2 py-1 m-1 rounded-lg uppercase`}
            onClick={onClick}
        >{text}</button>
    )
}

export default Button