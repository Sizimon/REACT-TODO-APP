import React, { useState, useRef } from 'react'
import Dialog from './SubComponents/Dialog'
import Button from '../AdditionalElementsFolder/Button';

export default function TodoItemExpanded({ expandedRef, todo, closeExpanded, description, setDescription, categories, categoryName, setCategoryName, removeCategory, submitCategory, closeDialog, editDescription, editTitle, dialogRef, editingItemId, editTodo}) {

    return (
        <>
        <dialog
            ref={expandedRef}
            className="grid grid-cols-6 w-full md:w-10/12 lg:w-6/12 p-4 gap-4 rounded-lg border border-zinc-400 bg-zinc-800 text-white">
                <div className='justify-self-center col-span-6'>
                    <h1 className='uppercase text-2xl pb-4 items-center'>{todo.task}</h1>
                </div>
                <div className='border border-white p-2 m-2 rounded-lg col-span-6 w-full justify-self-center'>
                    <p className='text-left rounded-md whitespace-pre-wrap break-words text-white text-md'>{todo.description}</p>
                </div>
                <div className='flex flex-row p-2 rounded-lg m-2 col-start-2 col-span-4 justify-self-center items-center'>
                    <p>Categories:</p>
                    <ul className='flex flex-row'>
                        {todo.categories && todo.categories.map((category, index) => (
                            <li 
                            key={index} 
                            style={{ backgroundColor: category.color }} 
                            className='rounded-lg p-1 mx-1 text-center uppercase'>
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='col-start-3 col-span-4'>
                    <Button
                    text="Close"
                    onClick={() => {
                        closeExpanded(todo.id);
                    }}
                    />
                    <Button 
                    text="Edit Task"
                    onClick={() => {
                        editTodo(todo.id);
                    }}
                    />
                </div>
        </dialog>
        {todo.isEditing && todo.id === editingItemId && (

            // THIS IS THE EDITING BOX START

                <Dialog
                    todo={todo}
                    description={description}
                    setDescription={setDescription}
                    categories={categories}
                    categoryName={categoryName}
                    setCategoryName={setCategoryName}
                    removeCategory={removeCategory}
                    submitCategory={submitCategory}
                    closeDialog={closeDialog}
                    editDescription={editDescription}
                    editTitle={editTitle}
                    dialogRef={dialogRef}
                />
            // THIS IS THE DIALOG BOX END
            )}
        </>
    );
}
