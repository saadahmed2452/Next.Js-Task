// import { NextResponse } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   console.log("middleware executed");

//   const authToken = request.cookies.get("authToken")?.value;

//   if (
//     request.nextUrl.pathname === "/api/login" ||
//     request.nextUrl.pathname === "/api/users"
//   ) {
//     return;
//   }

//   const loggedInUserNotAccess =
//     request.nextUrl.pathname === "/login" ||
//     request.nextUrl.pathname === "/signup";
//   if (loggedInUserNotAccess) {
//     if (authToken) {
//       return NextResponse.redirect(new URL("/profile/user", request.url));
//     }
//   } else {
//     if (!authToken) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   //   return NextResponse.redirect(new URL('/home', request.url))
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     // "/",
//     "/login",
//     "/signup",
//     "/add-task",
//     "/show-tasks",
//     "/profile/:path*",
//     "/api/:path*",
//   ],
// };

import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("middleware executed");

  const authToken = request.cookies.get("authToken")?.value;

  // Allow API routes for login and user creation to proceed without authentication check
  if (
    request.nextUrl.pathname === "/api/login" ||
    request.nextUrl.pathname === "/api/users"
  ) {
    return NextResponse.next(); // Explicitly allow to proceed
  }

  const loggedInUserNotAccess =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  if (loggedInUserNotAccess) {
    if (authToken) {
      // If user is logged in, redirect from login/signup pages to profile
      return NextResponse.redirect(new URL("/profile/user", request.url));
    }
  } else {
    // For all other protected routes, if no authToken, redirect to login
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next(); // Allow other requests to proceed
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/add-task",
    "/show-tasks",
    "/profile/:path*",
    "/api/:path*", // This is quite broad; consider narrowing it down if possible.
  ],
};
