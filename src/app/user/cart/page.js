import Master from '@/components/master/Master';
import CartList from '@/components/user/CartList';
import { getCookies } from '@/utility/CookieHelper';
import React from 'react';

async function getData(){
    let storedCookies=getCookies();
    return (await (await fetch (`${process.env.HOST}/api/cart/list`, {cache:'no-cache', headers: {'Cookie': storedCookies}})).json())['data'];
}


const page = async () => {
    let data=await getData();
    return (
        <Master>
            <CartList data={data}/>
            
        </Master>
    );
};

export default page;