import Master from '@/components/master/Master';
import React from 'react';
import { getCookies } from '@/utility/CookieHelper';
import Link from 'next/link';


async function getData(id){
    let storedCookies =  getCookies()
    return (await(await fetch(`${process.env.HOST}/api/invoice/invoice-product-list?invoice_id=${id}`, {cache:'no-cache', headers: {'Cookie': storedCookies}})).json())['data'];
}
                                                    


const page = async ({searchParams}) => {
    let id = parseInt(searchParams.id)
    let data = await getData(id);
    return (
        <Master>
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card p-3'>
                        <h6> 
                            <Link className='text-success fw-bolder' href="/user/order/list">
                                <i className='bi bi-arrow-left-circle'></i> Order Detail
                            </Link>
                         </h6>
                         <hr/>
                         <div className='table-responsive'>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Sale Price</th>
                                        <th>Qty</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item,i)=>{
                                            return (
                                                <tr key={i}>
                                                    <td>{item['products']['title']}</td>
                                                    <td>{item['sale_price']}</td>
                                                    <td>{item['qty']}</td>
                                                    <td>{item['color']}</td>
                                                    <td>{item['size']}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                         </div>
                           
                        </div>
                    </div>

                </div>

            </div>
            
        </Master>
    );
};

export default page;