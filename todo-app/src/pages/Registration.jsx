export default function Registration() {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-tr from-cyan-200 to-slate-600">
            <div className="p-2 m-2 bg-slate-100 rounded-xl h-auto w-1/3">
                <h1 className="text-center text-indigo-700 text-4xl my-6">Sign Up</h1>
                <form action="" className="justify-center items-center text-center w-full">
                    <div className="my-4">
                        <label htmlFor="email">Email</label><br />
                        <input type="email" id="email" placeholder="Enter Email" className="w-2/4 rounded-lg p-2" />
                    </div>
                    <div className="my-4">
                        <label htmlFor="password">Password</label><br />
                        <input type="password" id="password" placeholder="Enter Password" className="w-2/4 rounded-lg p-2" />
                    </div>
                    <button className="bg-indigo-700 text-white p-2 m-2 rounded-lg">Register</button><br />
                    <p>Already have an account? <a href="/login" className="text-blue-500">Login Here.</a></p>
                </form>
            </div>
        </div>
    )
}