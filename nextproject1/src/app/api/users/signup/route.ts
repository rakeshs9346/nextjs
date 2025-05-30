import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";



export async function POST(request:NextRequest){
    await connect()
    const {email,name,password}=await request.json()
    console.log(name,email,password);
    try {
        // Check if the user already exists
        const existingUser=await User.findOne({ email })
        console.log(existingUser,'existing user');

        if(existingUser){
            return NextResponse.json({message:"User already exists"},{status:400})
        }

        //create encrypted hash password
        const hashedPassword=await bcryptjs.hash(password,10)
        console.log(hashedPassword,'hashed password');
        
        // Create a new user instance
        const newUser = new User({ username:name, email:email, password: hashedPassword });
        console.log(newUser, 'new user');
         const newDocument= new User(newUser);
        // Save the new user to the database
        await newDocument.save();
        console.log('user created successfully');
        // Return a success response
        return NextResponse.json({ message: "User created successfully" }, { status: 201 })
    } catch (error:any) {
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
    
}