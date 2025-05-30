import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
        response.cookies.set("token", "", {
            httpOnly: true,
            maxAge: 0,
        });
        return response;
        
    } catch (error:any) {
        return NextResponse.json({ message: "Error logging out" }, { status: 500 })
    }

}
