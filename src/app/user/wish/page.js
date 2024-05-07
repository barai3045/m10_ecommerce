import Master from '@/components/master/Master';
import WishList from '@/components/user/WishList';
import { getCookies } from '@/utility/CookieHelper';
import React from 'react';

async function getData(){
    let storedCookies=getCookies();
    return (await (await fetch (`${process.env.HOST}/api/wish/list`, {cache:'no-cache', headers: {'Cookie': storedCookies}})).json())['data'];
}



const page = async () => {
    let data=await getData();

    return (
        <Master>
            <WishList data={data}/>
        </Master>
    );
};

export default page;