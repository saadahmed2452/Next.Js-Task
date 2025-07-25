import { NextResponse } from "next/server";

export function GET (request, {params}){

    const {userid,postid} = params;

    console.log("up",userid, postid);


    // console.log(Object.keys(params));


    return NextResponse.json(params);
}