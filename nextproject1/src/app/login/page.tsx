"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function LoginPage(){
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const router=useRouter();

    const onLogin = async () => {
        try {
            
            const response = await fetch('/api/users/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
            const data = await response.json();
            console.log(data)
            if (response.status === 200) {
                alert("Login successful...")
                router.push("/profile")
            } else if(response.status === 404) {
                console.log('else block')
                alert("User not found")
            }else if(response.status === 401) {
                console.log('else if block')
                alert("Invalid credentials")
            }else{
                console.log('else block')
                alert("Error logging in")
            }
        } catch (error) {
            console.error(error)
            alert("Error logging in")
        }

    }

    return (
        <div className="flex justify-center items-center min-h-screen flex-col py-2 bg-gray-500 ">
            <h1 className="bg-gradient-to-r from-pink-700 to-yellow-300 bg-clip-text text-transparent text-3xl font-bold">Login</h1>
            
            <hr />

            <div className="flex  p-2 gap-3 flex-wrap">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email" 
                    className="px-2 py-1 border-1 outline-none rounded-md"/>
            </div>

            <hr />

            <div className="flex  p-2 gap-3 flex-wrap">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password" 
                    className="px-2 py-1 border-1 outline-none rounded-md"/>
            </div>
              <button className="px-2 py-1  rounded-md bg-pink-500 focus:outline-none focus:border-pink-700 hover:bg-pink-600"
              onClick={onLogin}>Login</button>

              <p>Don't have an Account? <Link href="/signup" className="text-purple-500 underline">Sign up </Link></p>
        </div>
    )
}