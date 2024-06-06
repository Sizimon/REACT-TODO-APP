import React from 'react'
import Lottie from 'lottie-react'
import Animations from '../Animations'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-zinc-800">
            <div className="p-2 m-2 bg-zinc-600 rounded-xl h-auto w-1/3">
                <Lottie animationData={Animations.error} style={{ width: '100%'}}/>
                <p className="text-center text-white text-2xl my-6">We could not find the page you are looking for, please try a different page, or go back to the <Link to={'/login'} className='text-indigo-500'>Login Page.</Link> </p>
            </div>
        </div>
  )
}

export default Error