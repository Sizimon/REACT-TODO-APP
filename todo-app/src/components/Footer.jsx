import React from 'react'

export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-sky-300 to-gray-300 p-4 text-white sticky w-full z-10 bottom-0 mt-auto">
      <p>Welcome back USER!</p>
      <p>You have 27 tasks to complete. Of which 3 are due today.</p>
      <p>You have 1 task set as a priority, click here to see which!</p>
    </div>
  )
}
