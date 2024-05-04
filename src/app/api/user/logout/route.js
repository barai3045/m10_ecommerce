import { NextResponse } from "next/server";

export async function GET(req, res){
    let expireDuration=new Date(Date.now() - 24*60*60*1000);
    const response = NextResponse.redirect(new URL('/', req.url), 303);
    response.cookies.set('token','', {expires:expireDuration});
    return response;
    //const cookieSetting = `token=''; expire=${expireDuration.toUTCString()}; path=/`;
    //return NextResponse.json({status:"success"}, {status:200, headers:{'set-cookie':cookieSetting}});

}