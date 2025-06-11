"use client"
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios"

export default function LoginPage(){
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async() => {
    }

    return (
        <div className="flex flex-col items-center justify-center gap-2 min-h-screen bg-black">
            <h1>Login</h1>
            <hr />
           
           <div className="flex items-center justify-center gap-2">
             <label className="text-xl" htmlFor="email">email : </label>
            <input className="p-2 bg-white text-black rounded-xl text-md focus:outline-none focus:border-gray-600" type="email" id="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="Enter email" />
           </div>
           <div className="flex items-center justify-center gap-2">
             <label className="text-xl" htmlFor="password">password : </label>
            <input className="p-2 bg-white text-black rounded-xl text-md focus:outline-none focus:border-gray-600" type="password" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="Enter password" />
           </div>
           <button onChange={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Signup Here</button>
           <Link href="/signup" className="">Already have an account? <span className="text-blue-500 hover:underline">Signup</span></Link>
        </div>
    )
}