import { CreateToken } from "@/utility/JWTTokenHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res){
    try{
        let reqBody = await req.json();
        const prisma = new PrismaClient();
        const result=await prisma.users.findMany({where:reqBody})

        if (result.length===0){
            return NextResponse.json({status:"fail", data:"Invalid verification code"})
            
        } else {
            await prisma.users.update({
                where:{email:reqBody["email"]},
                data:{otp:"0"}
            });

        
            let token = await CreateToken(result[0]['email'], result[0]['id']);
            
            let expireDuration=new Date(Date.now()+ 24*60*60*1000);
            const cookieSetting = `token=${token}; expire=${expireDuration.toUTCString()}; path=/`;
            return NextResponse.json({status:"success", data:token}, {status:200, headers:{'set-cookie':cookieSetting}});
        }
    } catch(e){
        return NextResponse.json({status:"fail", data:e})
    }
}