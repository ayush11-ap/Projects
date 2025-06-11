import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        if(!email || !password) {
            return NextResponse.json({error: "Email and password are required"}, {status: 400});
        }
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        // check password
        const validePassword = await bcryptjs.compare(password, user.password);
        if(!validePassword){
            return NextResponse.json({error: "Invalid password"}, {status: 401});
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '24h'});

        const response = NextResponse.json({
            message : "Login successful",
            success: true,
        })
        response.cookies.set("token", token,{
            httpOnly: true,
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}