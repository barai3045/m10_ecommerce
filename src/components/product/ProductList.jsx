"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';

const ProductList = (props) => {
    const [brand, setBrand] = useState(null)
    const [category, setCategory] = useState(null)

        
    useEffect(()=>{
        (async()=>{
            let category = await fetch("/api/product/category-list");
            let categoryJSON = await category.json();
            setCategory(categoryJSON['data']);

            let brand = await fetch("/api/product/brand-list");
            let brandJSON = await brand.json();
            setBrand(brandJSON['data']);
        })()
    }, [])

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-md-3 p-1 pe-2'>
                    <div className='card h-100 mt-2 p-4'>
                        <div className='my-2'>
                            <label>Category</label>
                            <select className='form-select form-control'>
                                <option value="">Choose Category </option>
                                {
                                    category !== null && 
                                    category.map((item, i)=>{
                                        return <option value={item['id']} >{item['categoryName']}</option>
                                    })
                                }
                            </select>
                        </div>
                        

                        <div className='my-2'>
                            <label>Brand</label>
                            <select className='form-select form-control'>
                            <option value="">Choose Brand </option>
                                {
                                    brand !== null && 
                                    brand.map((item, i)=>{
                                        return <option value={item['id']} >{item['brandName']}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className='my-2'>
                            <label className='w-100'> Min Price </label>
                            <input className='w-100' type='range'/>
                        </div>

                        <div className='my-2'>
                            <label className='w-100' >Max Price </label>
                            <input className='w-100' type='range'/>
                        </div>

                        


                    </div>

                </div>
                <div className='col-md-9 p-1'>
                    <div className='row'>
                    {
                        props.data.map((item,i)=>{
                            let price = <p className="bodyMedium text-dark my-1">Price: ${item['price']} </p> 
                            if (item['discount'] === true) { 
                                price = <p className="bodyMedium text-dark my-1">Price: <strike> ${item['price']} </strike>  ${item['discount_price']} </p> 
                            } 
                            
                            return ( 
                                
                                <div key={i} className="col-lg-5-cols col-md-5-cols p-2 col-sm-6 col-12">
                                    <Link href={`/details?id=${item['_id']}`} className="card shadow-sm h-100 rounded-3 bgwhite">
                                        <img className="w-100 rounded-top-2" src={item['image']} />
                                        <div className="card-body">
                                            <p className="bodySmal text-secondary my-1">{item['title']}</p> {price}
                                            <StarRatings rating={parseFloat(item['star'])} starRatedColor="red" starDimension="15px" starSpacing="2px" />
                                        </div>
                                    </Link>
                                </div>
                                )
                        })
                    }

                    </div>
                </div>
            </div>   
        </div>
    );
};

export default ProductList;