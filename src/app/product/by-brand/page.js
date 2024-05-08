import Master from '@/components/master/Master';
import ProductList from '@/components/product/ProductList';
import React from 'react';

async function getData(id){
    const response = await fetch(`${process.env.HOST}/api/product/list-by-brand?id=${id}`);
    const product = (await response.json())['data'];
    return product
}

const page = async ({searchParams}) => {
    let id = parseInt(searchParams.id)
    
    let data = await getData(id)
    
    return (
        <Master>
            <ProductList data={data}/>
        </Master>
    );
};

export default page;