import React, { useState } from "react";
import Button from "../../AdditionalElementsFolder/Button";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

import { FaPencil } from "react-icons/fa6";


export default function Dialog({ todo, description, setDescription, categories, categoryName, setCategoryName, removeCategory, submitCategory, closeDialog, editDescription, editTitle, dialogRef }) {
    const [color, setColor] = useColor("#ffffff");
    const [editingTitle, setEditingTitle] = useState(false);
    const [title, setTitle] = useState(todo.task);

    return (
        <dialog
            ref={dialogRef}
            className="grid grid-cols-5 w-full md:w-10/12 lg:w-6/12 p-4 gap-4 rounded-lg border border-amber-500 bg-zinc-800 text-white">
            <div className="col-span-5 text-center">
                {editingTitle ? (
                    <div className="flex flex-row justify-center items-center gap-2">
                        <input
                            type="text"
                            className="bg-zinc-700 rounded-lg text-white uppercase focus:outline-none text-center text-2xl border-none w-full"
                            value={title} 
                            onChange={(e) => {setTitle(e.target.value)}}
                            />
                        <Button
                            onClick={() => {
                                editTitle(todo.id, title)
                                setEditingTitle(false)
                                }
                            }
                            text="Done"
                            bgColor={'black'}
                            textColor={'white'}
                            hoverColor={'bg-amber-500'}/>
                    </div>
                ) : (
                    <div className="flex flex-row justify-center items-center gap-2">
                        <h1 className="uppercase text-2xl">{todo.task}</h1>
                        <FaPencil
                            className="text-zinc-400 cursor-pointer hover:text-amber-500 transition ease-in-out delay-50 duration-300"
                            onClick={() => setEditingTitle(true)} />
                    </div>
                )}
            </div>
            <div className="col-span-5 md:col-span-2 text-center content-start">
                <form
                    className="flex flex-col gap-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitCategory(categoryName, color.hex);
                    }}
                >
                    <input
                        className="bg-zinc-700 rounded-lg text-white p-1  focus:outline-none"
                        placeholder="Create a category."
                        type="text"
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                    />
                    <ColorPicker
                        width={456}
                        height={160}
                        color={color}
                        onChange={setColor}
                        hideInput={["rgb", "hsv"]}
                    />
                    <Button
                    text="Add Category"
                    type="submit"
                    bgColor={'black'}
                    textColor={'white'}
                    hoverColor={'bg-amber-500'}  />
                </form>
            </div>
            <div className="col-span-5 md:col-span-3 text-center content-start">
                <textarea
                    required
                    value={description}
                    placeholder="Describe your task."
                    onChange={e => setDescription(e.target.value)}
                    rows="12"
                    className="bg-zinc-700 border rounded-lg p-2 text-white resize-none border-none focus:outline-none w-full"
                />
                <div className="flex flex-col justify-center my-2">
                    <ul className="flex flex-row list-none p-auto justify-center">
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                style={{ backgroundColor: category.color }}
                                onClick={() => removeCategory(index)}
                                className="rounded-lg p-1 mx-1 cursor-pointer"
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-row justify-center gap-36 m-auto">
                    <Button onClick={() => {
                        closeDialog(todo.id);
                        editDescription(todo.id, description, categories);
                    }} text="Save & Close"
                    bgColor={'black'}
                    textColor={'white'}
                    hoverColor={'bg-amber-500'}  />
                </div>
            </div>
        </dialog>
    )
}


// CODE FROM TODOITEM COMPONENT INCASE MY SUB COMPONENT HAS ERRORS

// <dialog
//     ref={dialogRef}
//     className="grid grid-cols-5 w-full md:w-10/12 lg:w-6/12 p-4 gap-4 rounded-lg border border-zinc-400 bg-zinc-800 text-white">
//     <div className="col-span-5 text-center">
//         <h1 className="uppercase pb-6 text-2xl">{todo.task}</h1>
//     </div>
//     <div className="col-span-5 md:col-span-2 text-center content-start">
//         <form
//             className="flex flex-col gap-2"
//             onSubmit={(e) => {
//                 e.preventDefault();
//                 submitCategory(categoryName, color.hex);
//             }}
//         >
//             <input
//                 className="bg-zinc-700 rounded-lg text-white p-1  focus:outline-none"
//                 placeholder="Create a category."
//                 type="text"
//                 value={categoryName}
//                 onChange={e => setCategoryName(e.target.value)}
//             />
//             <ColorPicker
//                 width={456}
//                 height={160}
//                 color={color}
//                 onChange={setColor}
//                 hideInput={["rgb", "hsv"]}
//             />
//             <Button text="Add Category" type="submit" />
//         </form>
//     </div>
//     <div className="col-span-5 md:col-span-3 text-center content-start">
//         <textarea
//             required
//             value={description}
//             placeholder="Describe your task."
//             onChange={e => setDescription(e.target.value)}
//             rows="12"
//             className="bg-zinc-700 border rounded-lg p-2 text-white resize-none border-none w-full"
//         />
//         <div className="flex flex-col justify-center my-2">
//             <ul className="flex flex-row list-none p-auto justify-center">
//                 {categories.map((category, index) => (
//                     <li
//                         key={index}
//                         style={{ backgroundColor: category.color }}
//                         onClick={() => removeCategory(index)}
//                         className="rounded-lg p-1 mx-1 border border-white cursor-pointer"
//                     >
//                         {category.name}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//         <div className="flex flex-row justify-center gap-36 m-auto">
//             <Button onClick={() => {
//                 closeDialog(todo.id);
//                 editDescription(todo.id, description, categories);
//             }} text="Save & Close" />
//         </div>
//     </div>
// </dialog>
