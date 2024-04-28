import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res){
    try {
        let headerList = headers();
        let id = parseInt(headerList.get('id'));
        
        let reqBody = await req.json();

        const prisma = new PrismaClient();
        const result = await prisma.product_wishes.create({
            data:{product_id:reqBody['product_id'], user_id:id}
        })

        return NextResponse.json({status:"success", data:result})
    } catch(e){
        return NextResponse.json({status:"fail", data:e.toString()})
    }
}

export async function GET(req, res){
    try {
        let headerList = headers();
        let id = parseInt(headerList.get('id'));
       
        const prisma = new PrismaClient();
        const result = await prisma.product_wishes.findMany({
           where:{user_id:id},
           include:{products:true}
        })

        return NextResponse.json({status:"success", data:result})
    } catch(e){
        return NextResponse.json({status:"fail", data:e.toString()})
    }
}


export async function DELETE(req, res){
    try {
        let headerList = headers();
        let user_id = parseInt(headerList.get('id'));
        
        let reqBody = await req.json();

        console.log(reqBody)
        console.log(user_id)

        const prisma = new PrismaClient();
        const result = await prisma.product_wishes.deleteMany({
            where: {
                AND: [
                    {product_id:reqBody['product_id']}, 
                    {user_id:user_id}
                ]
            }
        })
        console.log(result)

        return NextResponse.json({status:"success", data:result})
    } catch(e){
        return NextResponse.json({status:"fail", data:e.toString()})
    }
}