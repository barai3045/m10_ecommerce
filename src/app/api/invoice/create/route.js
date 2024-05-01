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

        for (const element of cartProducts){
            await prisma.invoice_products.create({
                data:{
                    invoice_id:invoice_id,
                    product_id:element['product_id'],
                    user_id:id,
                    qty:element['qty'],
                    sale_price:element['products']['discount']?element['products']['discount_price']:element['products']['price'],
                    color:element['color'],
                    size:element['size']
                }
            })
        }

        // step 06: Remove Cart
        await prisma.product_carts.deleteMany({
            where:{user_id:id}
        })

        // step07: Prepate SSL Payment

        let PaymentSettings = await prisma.sslcommerz_accounts.findFirst();
        
        const form = new FormData();
            form.append("store_id", PaymentSettings['store_id']) 
            form.append("store_passwd", PaymentSettings['store_passwd'])
            form.append("total_amount", payable.toString())
            form.append("currency", PaymentSettings['currency']) 
            form.append("tran_id", tran_id) 

           

            form.append("success_url", `${PaymentSettings['success_url']}?tran_id=${tran_id}`) 
            form.append("fail_url", `${PaymentSettings['fail_url']}?tran_id=${tran_id}`) 
            form.append("cancel_url", `${PaymentSettings['cancel_url']}?tran_id=${tran_id}`) 
            form.append("ipn_url", `${PaymentSettings['ipn_url']}?tran_id=${tran_id}`) 
            
            form.append("cus_name", profile['cus_name']) 
            form.append("cus_email", cus_email) 
            form.append("cus_add1", profile['cus_add']) 
            form.append("cus_add2", profile['cus_add']) 
            form.append("cus_city", profile['cus_city']) 
            form.append("cus_state", profile['cus_state']) 
            form.append("cus_postcode", profile['cus_postcode']) 
            form.append("cus_country", profile['cus_country']) 
            form.append("cus_phone", profile['cus_phone']) 
            form.append("cus_fax",profile['cus_fax']) 

            form.append("shipping_method","YES") 
            form.append("ship_name", profile['ship_name']) 
            form.append("ship_add1", profile['ship_add']) 
            form.append("ship_add2", profile['ship_add']) 
            form.append("ship_city", profile['ship_city']) 
            form.append("ship_state", profile['ship_state']) 
            form.append("ship_country", profile['ship_country']) 
            form.append("ship_postcode", profile['ship_postcode']) 

            form.append("product_name", "According to Invoice") 
            form.append("product_category", "According to Invoice") 
            form.append("product_profile", "According to Invoice") 
            form.append("product_amount", "According to Invoice") 

            let SSLRes=await fetch(PaymentSettings['init_url'],{
                method:'POST',
                body:form
            })

            
            let SSLResJSON = await SSLRes.json()

        
        return NextResponse.json({status:"success", data:SSLResJSON})

    } catch(e){
        return NextResponse.json({status:"fail", data:e.toString()})
    }
}