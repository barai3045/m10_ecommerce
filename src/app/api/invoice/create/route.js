import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res){
    try {


        let headerList = headers();
        let id = parseInt(headerList.get('id'));
        let cus_email=headerList.get('email');
        const prisma = new PrismaClient();

        const cartProducts = await prisma.product_carts.findMany({
           where:{user_id:id},
           include:{products:true}
        })

        let totalAmount = 0;
        cartProducts.forEach((element)=>{
            let price;
            if(element['products']['discount']){
                price = element['products']['discount_price']
            } else {
                price = element['products']['price']
            }

            totalAmount += element['qty']*price;
        })

        let vat = totalAmount*0.05 //5% vat
        let payable = totalAmount+vat;

        //step2: prepare customer details & shipping details 
        let profile = await prisma.customer_profiles.findUnique({where:{user_id:id}})
        let cus_details = `Name:${profile['cus_name']}, Email:${cus_email}, Address:${profile['cus_add']}, Phone:${profile['cus_phone']}`
        let ship_details = `Name:${profile['ship_name']}, City:${profile['ship_city']}, Address:${profile['ship_add']}, Phone:${profile['ship_phone']}`

        
        // step 03: Transaction & Others ID
        let tran_id = (Math.floor(10000000+Math.random()*90000000)).toString();
        let val_id ="0";
        let delivery_status = "Pending"
        let payment_status = "pending"

        // step 04: Create Invoice
        const createInvoice= await prisma.invoices.create({
            data:{
                total:totalAmount,
                vat:vat,
                payable:payable,
                cus_details: cus_details,
                ship_details:ship_details,
                trans_id:tran_id,
                val_id:val_id,
                delivary_status:delivery_status,
                payment_status:payment_status,
                user_id:id
            }
        })

        //create invoice product
        let invoice_id = createInvoice['id'];
        
        return NextResponse.json({status:"success", data:invoice_id})
    } catch(e){
        return NextResponse.json({status:"fail", data:e.toString()})
    }
}