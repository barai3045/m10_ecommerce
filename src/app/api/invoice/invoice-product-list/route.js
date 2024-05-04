import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res){
    try {
        let headerList = headers();
        let id = parseInt(headerList.get('id'));
        
        const prisma = new PrismaClient();
        let {searchParams}= new URL(req.url);
        let invoice_id = searchParams.get('invoice_id');

        
        
        const result = await prisma.invoice_products.findMany({
            where:{
                AND:[
                    { user_id:id},
                    {invoice_id:parseInt(invoice_id)}
                ]
            },
            include:{products:true}
        })

        return NextResponse.json({status:"success", data:result})
    } catch(e){
        return NextResponse.json({status:"fail", data:e.toString()})
    }
}