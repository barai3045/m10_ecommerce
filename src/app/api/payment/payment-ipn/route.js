import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res){
    try {
        let {searchParams} = new URL(req.url);
        let tran_id = searchParams.get('tran_id');
        
        let reqBody = await req.json();

        const prisma = new PrismaClient()
        
       
        const result = await prisma.invoices.updateMany({
            where:{
                AND: [
                    {trans_id:tran_id}
                ]
            },
            data:{payment_status:reqBody['status']}
        })

        return NextResponse.redirect(new URL('/user/order/list', req.url), 303)
    } catch(e){
        return NextResponse.json({status:"fail", data:e.toString()})
    }
}