import { useState } from "react"
import TodoItem from "./TodoItem"

export default function TodoList() {

    return (
        <div className="grid grid-cols-4 gap-4">
            <TodoItem  />
        </div>
    )
}