import {connect} from '@/src/dbConfig/dbConfig';
import User from '@/src/models/userModels';
import { request } from 'http';
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/src/app/mailter';
connect();

export async function POST(request: NextRequest){
    try{
        const reqBody =  request.json();
        const {username , email, password} = reqBody;
        console.log(reqBody);
        
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: 'user already exists'},{status:400})
        }

        const salt = await bcrypt.genSalt(10)
        const  hashedpassword = bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedpassword,
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        
        //send verification email

        await sendEmail({email, emailtype: 'Verify', userId: savedUser.user})

        return NextResponse.json({message: 'User created successfully', success: true, savedUser})

    }catch(error:any){
        return NextResponse.json({error:error.message});
    }
}