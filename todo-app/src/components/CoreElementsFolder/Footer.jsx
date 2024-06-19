import React from 'react'

export default function Footer({todos}) {

  const taskAmount = todos.length
  const priorityTaskAmount = todos.filter(todo => todo.priority).length

  return (
    <div className="flex flex-col justify-center items-center bg-zinc-800 border-t border-zinc-400 p-4 text-white w-full z-10 mt-auto">
      <p>Welcome back USER!</p>
      <p>You have {taskAmount} tasks to complete. Of which 3 are due today.</p>
      <p>You have {priorityTaskAmount} task set as a priority, click here to see which!</p>
    </div>
  )
}
