import React from 'react';
import Master from '@/components/master/Master';
import { getCookies } from '@/utility/CookieHelper';
import ProfileForm from '@/components/user/ProfileForm';

async function getData(){
    let storedCookies = await getCookies()
    await new Promise(resolve => setTimeout(resolve, 2000));
    return (await(await fetch(`${process.env.HOST}/api/user/profile`, {cache:'no-cache', headers: {'Cookie': storedCookies}})).json())['data'];
}


const page = async() => {
    let ProfileData = await getData();
    return (
        <Master>
            <ProfileForm data={ProfileData}/>
        </Master>
    );
};

export default page;










