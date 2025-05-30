import {connect} from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



connect()

export async function POST(request: NextRequest) {
    const { email, password } = await request.json()
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }
        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
        }
        

        const tokendata={
            id: user._id,
            email: user.email,
        }

        const token = jwt.sign(tokendata, process.env.TOKEN_SECRET!, {
            expiresIn: "1h",
        })
        const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 60 * 60,
        });
        console.log(token, 'token');
        return response;
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}