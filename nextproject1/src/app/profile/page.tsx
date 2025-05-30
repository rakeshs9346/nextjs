"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";


export default function ProfilePage(){
   const router=useRouter();
    const logout=async () =>{
        try {
            const response = await fetch('/api/users/logout', {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                console.log("Logout successful");
                router.push("/login");
            } else {
                console.log("Logout failed");
            }
        } catch (error:any) {
            return NextResponse.json({ message: "Internal server error" }, { status: 500 })
        }
    }
    return(
        <div className="flex justify-center items-center min-h-screen flex-col py-2 bg-gray-500 ">
        <div className="text-center text-4xl">profile page</div>
        <button 
        onClick={logout}
        className="px-2 py-1 rounded-md bg-pink-500 text-slate-100 mt-4">logout</button>
        </div>
    )
}