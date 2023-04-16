import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request){
    
    //EXTRAER EL TOKEN CON JOSE
    const token = request.cookies.get('tokenUser');
    

        //VALIDA QUE HAYA UN TOKEN
        if(token==undefined){
            return NextResponse.redirect(new URL("/login", request.url));
        }
        
        //VALIDA QUE EL TOKEN SEA VALIDO
        try {
            const {payload} = await jwtVerify(token.value, new TextEncoder().encode('secret'));
            console.log(payload);
            return NextResponse.next();
        } catch (error) {
            console.error(error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
}

export const config = {
    matcher: ['/x','/']
}