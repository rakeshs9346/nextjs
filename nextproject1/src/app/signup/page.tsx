"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function SignupPage() {
     
    const router=useRouter();
    const [user, setUser] = React.useState({
        email: "",
        name: "",
        password: "",
    })

    const onSignup = async () => {
        
        try {
            const response = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
            console.log(response,'response in signup')
            console.log(response.status,'response status in signup')
             if (response.status === 201) {
                alert("User created successfully")
                router.push("/login")
             }else if (response.status === 400) {
                console.log(response.url,'in else if block of signup')
                alert("User already exists")
            }else {
                console.log('else block of signup')
                alert("Error creating user.....")
    
            }
            
        } catch (error:any) {
            console.error(error,'error in signup')
            console.log('in catch block of signup')
            alert("Error creating user!")
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen flex-col py-2 bg-gray-500 ">
            <h1 className="bg-gradient-to-r from-pink-700 to-yellow-300 bg-clip-text text-transparent text-3xl font-bold">Signup</h1>
            <hr />

            <div className="flex  p-2 gap-3 flex-wrap">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="username" 
                    className="px-2 py-1 border-1 outline-none rounded-md"/>
            </div>
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
              onClick={onSignup}>Signup</button>

              <p>Already have an Account? <Link href="/login" className="text-purple-500 underline">Log in</Link></p>
        </div>
    )
}