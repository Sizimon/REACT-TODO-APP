import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Registration from './pages/Registration'
import TodoWrapper from './pages/TodoWrapper'
import Login from './pages/Login'


const router = createBrowserRouter([
  { path: '/', element: <Registration />},
  { path: '/login', element: <Login />},
  { path: '/taskmanager', element: <TodoWrapper />},
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
