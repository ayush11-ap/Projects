"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Logout successful");
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserData = async () => {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id)
    }
    return(
        <div className="flex flex-col items-center justify-center gap-2 min-h-screen bg-black text-white">
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <h2 className="text-lg font-semibold mt-4">
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link
              href={`/profile/${data}`}
              className="text-blue-400 underline hover:text-blue-600 transition-colors duration-200"
            >
              View Profile: {data}
            </Link>
          )}
        </h2>
        <hr />
        <button onClick={logout} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow transition-colors duration-200">Logout</button>
        <button onClick={getUserData} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded shadow transition-colors duration-200">fetch Data</button>
        </div>
    )
}