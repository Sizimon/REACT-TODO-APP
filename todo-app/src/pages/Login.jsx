import { Link } from "react-router-dom"

export default function Login() {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-tr from-cyan-200 to-slate-600">
            <div className="p-2 m-2 bg-slate-100 rounded-xl h-auto w-1/3">
                <h1 className="text-center text-indigo-700 text-4xl my-6">Login</h1>
                <form action="" className="justify-center items-center text-center w-full">
                    <div className="my-4">
                        <label htmlFor="email">Email</label><br />
                        <input type="email" id="email" placeholder="Enter Email" className="w-2/4 rounded-lg p-2" />
                    </div>
                    <div className="my-4">
                        <label htmlFor="password">Password</label><br />
                        <input type="password" id="password" placeholder="Enter Password" className="w-2/4 rounded-lg p-2" />
                    </div>
                    <Link to="/taskmanager" className="bg-indigo-700 text-white p-2 m-2 rounded-lg">
                        Login
                    </Link>
                    <br />
                    <p>Don't have an account? <Link to="/registration" className="text-blue-500">Create one here.</Link></p>
                    <p>Forgotten password? <Link to="/login" className="text-blue-500">Reset it here.</Link></p>
                </form>
            </div>
        </div>
    )
}