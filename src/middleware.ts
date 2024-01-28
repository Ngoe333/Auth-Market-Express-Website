import NextAuth from 'next-auth';
import  authConfig  from '../auth.config';
import { publicRoutes, authRoutes, apiAuthPrefix,  DEFAULT_LOGIN_REDIRECT  } from '../route';
// import { auth } from '../auth'


const { auth} = NextAuth(authConfig);

export default auth((req) => {
    console.log("ROUTE:", req.nextUrl.pathname)
    const {nextUrl} = req;
    const isLogging = !!req.auth;

    const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
    const IsPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
    // const isPrivate = allPrivate.includes(nextUrl.pathname);

    if(isApiAuthRoutes){
        return null;
    }

    if(isAuthRoutes){
        if(isLogging){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
    }

    if(!isLogging && !IsPublicRoutes){

        let callbackUrl = nextUrl.pathname;
        if(nextUrl.search){
            callbackUrl += nextUrl.search;
        }

        const enccdedCallbackUrl  = encodeURIComponent(callbackUrl);

        return Response.redirect(new URL(
            `/login?callbackUrl=${enccdedCallbackUrl}`, nextUrl
        ))
        // return Response.redirect(new URL('/login', nextUrl))

    }


    return null;
    

})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}