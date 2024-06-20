import React, {useState, useRef} from 'react'
import Dialog from './SubComponents/Dialog'

export default function TodoItemExpanded({ expandedRef }) {
    return (
        <dialog
        ref={expandedRef}
        className="grid grid-cols-5 w-full md:w-10/12 lg:w-6/12 p-4 gap-4 rounded-lg border border-zinc-400 bg-zinc-800 text-white">
        </dialog>
    )
}
 