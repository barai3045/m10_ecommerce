import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res){
    try {
        let headerList = headers();
        let id = parseInt(headerList.get('id'));
        
        let reqBody = await req.json();
        reqBody.user_id = id;
        console.log(reqBody)
        const prisma = new PrismaClient();
        const result = await prisma.product_carts.create({
            data:reqBody
        })
        console.log(result)

        return NextResponse.json({status:"success", data:result})
    } catch(e){
        return NextResponse.json({status:"fail", data:e.toString()})
    }
}


export async function PUT(req, res){
    try {
        let headerList = headers();
        let user_id = parseInt(headerList.get('id'));
        let reqBody = await req.json();
        
        const prisma = new PrismaClient();
        const result = await prisma.product_carts.updateMany({
            where:{
                AND:[
                    {id:reqBody['id']},
                    {user_id:user_id}
                ]
            },
            data:{color:reqBody['color'],size:reqBody['size'],qty:reqBody['qty']}
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
        const result = await prisma.product_carts.findMany({
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

        const prisma = new PrismaClient();
        const result = await prisma.product_carts.deleteMany({
            where: {
                AND: [
                    {id:reqBody['id']}, 
                    {user_id:user_id}
                ]
            }
        })
       

        return NextResponse.json({status:"success", data:result})
    } catch(e){
        return NextResponse.json({status:"fail", data:e.toString()})
    }
}