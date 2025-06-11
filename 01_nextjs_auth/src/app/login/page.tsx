"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios"
import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async() => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login successful", response.data)
            toast.success("Login successful");
            router.push("/profile")
        } catch (error: any) {
            console.log("Login failed", error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center gap-2 min-h-screen bg-black">
            <h1>{loading ? "Processing": "Login"}</h1>
            <hr />
           
           <div className="flex items-center justify-center gap-2">
             <label className="text-xl" htmlFor="email">email : </label>
            <input className="p-2 bg-white text-black rounded-xl text-md focus:outline-none focus:border-gray-600" type="email" id="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="Enter email" />
           </div>
           <div className="flex items-center justify-center gap-2">
             <label className="text-xl" htmlFor="password">password : </label>
            <input className="p-2 bg-white text-black rounded-xl text-md focus:outline-none focus:border-gray-600" type="password" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="Enter password" />
           </div>
           <button onClick={onLogin} className="p-2 border pointer border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Login" : "Login"}</button>
           <Link href="/signup" className="">Already have an account? <span className="text-blue-500 hover:underline">Signup</span></Link>
        </div>
    )
}