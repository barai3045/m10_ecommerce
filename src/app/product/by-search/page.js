import Master from '@/components/master/Master';
import ProductList from '@/components/product/ProductList';
import React from 'react';

async function getData(key){
    const response = await fetch(`${process.env.HOST}/api/product/list-by-keyword?keyword=${key}`);
    const product = (await response.json())['data'];
    return product
}

const page = async ({searchParams}) => {
    let key = searchParams.keyword
    let data = await getData(key)
    return (
        <Master>
            <ProductList data={data}/> 
        </Master>
    );
};

export default page;