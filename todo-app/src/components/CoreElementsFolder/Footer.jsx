import React from 'react'

export default function Footer({todos}) {

  const taskAmount = todos.length
  const priorityTaskAmount = todos.filter(todo => todo.priority).length

  return (
    <div className="flex flex-row justify-between items-center bg-zinc-800 border-t border-zinc-400 p-4 text-white w-full z-10 mt-auto">
      <div className='flex flex-col justify-center items-center'>
        <h1>You are logged in as ...</h1>
        <h2 className='text-amber-500 underline underline-offset-4'><a href="/">LOGOUT</a></h2>
      </div>
      <div>
        <p>You have <span className='text-amber-500'>{taskAmount}</span> tasks to complete.</p>
        <p>You have <span className='text-amber-500'>{priorityTaskAmount}</span> task set as a priority.</p>
        <p>You have <span className='text-amber-500'>0</span> overdue tasks.</p>
      </div>
    </div>
  )
}
