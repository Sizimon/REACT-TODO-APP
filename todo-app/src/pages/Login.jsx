import React from "react";
import { Link } from "react-router-dom";
import Animations from "../Animations";
import Lottie from "lottie-react";

export default function Registration() {
    return (
        <div className="flex flex-row justify-between items-center h-screen w-screen bg-zinc-800">
            <div className="flex flex-col items-center justify-center bg-zinc-800 text-white h-auto w-2/4 md:w-2/4 px-16 py-4">
                <div className="w-full">
                    <h1 className="text-4xl py-2">Welcome to In<span className="text-amber-500">Time</span>Tasks</h1>
                    <h2 className="text-lg">Stay on Track. Stay In Time.</h2>
                    <p className="text">InTimeTasks is your ultimate companion for managing your personal tasks efficiently. <br /> Designed specifically for us forgetful individuals, our app ensures you stay focused, organized, and productive.<br />
                        Whether small or big, let's make your tasks a priority.
                    </p>
                </div>
                <div className="py-4 m-2 bg-zinc-800 rounded-xl h-auto w-full md:w-full justify-start text-white">
                    <h1 className="text-start text-amber-500 text-4xl my-6">Log In</h1>
                    <form action="" className="justify-center items-start w-full">
                        <div className="my-4">
                            <label htmlFor="email">Email</label><br />
                            <input type="email" id="email" placeholder="Enter Email" className="w-10/12 md:w-3/4 rounded-lg p-2 bg-zinc-700" />
                        </div>
                        <div className="my-4">
                            <label htmlFor="password">Password</label><br />
                            <input type="password" id="password" placeholder="Enter Password" className="w-10/12 md:w-3/4 rounded-lg p-2 bg-zinc-700" />
                        </div>
                        <Link to="/taskmanager" className="bg-amber-500 text-white p-2 rounded-lg">
                            Login
                        </Link>
                        <br />
                        <p className="mt-2">Don't have an account? <Link to="/registration" className="text-amber-500">Create one here.</Link></p>
                        <p>Forgotten password? <Link to="/login" className="text-amber-500">Reset it here.</Link></p>
                    </form>
                </div>
            </div>
            <div className="w-2/4">
                <div className="w-full h-full">
                    <Lottie animationData={Animations.landing} className='w-full h-full' />
                </div>
            </div>
            {/* <div className="p-2 m-2 bg-zinc-800 rounded-xl h-auto w-10/12 md:w-1/3 text-white">
                <h1 className="text-center text-indigo-700 text-4xl my-6">Sign Up</h1>
                <form action="" className="justify-center items-center text-center w-full">
                    <div className="my-4">
                        <label htmlFor="email">Email</label><br />
                        <input type="email" id="email" placeholder="Enter Email" className="w-10/12 md:w-2/4 rounded-lg p-2 bg-zinc-700" />
                    </div>
                    <div className="my-4">
                        <label htmlFor="password">Password</label><br />
                        <input type="password" id="password" placeholder="Enter Password" className="w-10/12 md:w-2/4 rounded-lg p-2 bg-zinc-700" />
                    </div>
                    <button className="bg-indigo-700 text-white p-2 m-2 rounded-lg">Register</button><br />
                    <p className="text-white">Already have an account? <Link to="/login" className="text-blue-500">Login Here.</Link></p>
                </form>
            </div> */}
        </div>
    )
}

{/* <Link to="/taskmanager" className="bg-indigo-700 text-white p-2 m-2 rounded-lg">
                        Login
                    </Link>
                    <br />
                    <p>Don't have an account? <Link to="/registration" className="text-blue-500">Create one here.</Link></p>
                    <p>Forgotten password? <Link to="/login" className="text-blue-500">Reset it here.</Link></p> */}