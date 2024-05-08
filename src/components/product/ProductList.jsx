"use client"
import Link from 'next/link';
import React from 'react';
import StarRatings from 'react-star-ratings';

const ProductList = (props) => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-2'>

                </div>
                <div className='col-md-10'>
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