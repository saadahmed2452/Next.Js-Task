// import responseMess from "@/helper/responseMess";
// import { User } from "@/models/user";
// import { NextResponse } from "next/server";
// import { Error } from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { connectDB } from "@/helper/db";

// export async function POST(request) {
//   const { email, password } = await request.json();

//   try {
//     await connectDB();
//     // 1. finding user
//     const user = await User.findOne({
//       email: email,
//     });
//     console.log(user);

//     if (user == null) {
//       throw new Error("user not found");
//     }

//     console.log("Incoming password:", password);
//     console.log("Stored hashed password:", user.password);

//     // 2. Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       throw new Error("Password is not matched");
//     }

//     // 3. generating token

//     const Token = jwt.sign(
//       {
//         _id: user._id,
//         name: user.name,
//       },
//       process.env.JWT_KEY
//     );

//     console.log(user);
//     console.log(Token);

//     // 4. create nextresponse--cookie

//     const response = NextResponse.json({
//       message: "Login success!!",
//       success: true,
//       user: user,
//     });

//     response.cookies.set("authToken", Token, {
//       expiresIn: "1d",
//       httpOnly: true,
//     });

//     return response;
//   } catch (error) {
//     console.log(error);
//     return responseMess(error.message, 404, false);
//   }
// }


// app/api/login/route.js (or login.js if you prefer that naming convention within api routes)
import responseMess from "@/helper/responseMess";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/helper/db";

export async function POST(request) {
  try {
    await connectDB(); // Ensure DB is connected at the start of the handler
    const { email, password } = await request.json();

    // 1. Finding user
    const user = await User.findOne({ email }); // Shorthand for { email: email }
    if (!user) { // Check for user existence first
      return responseMess("Invalid Credentials (User not found)", 404, false);
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return responseMess("Invalid Credentials (Password mismatch)", 401, false); // 401 Unauthorized for password mismatch
    }

    // 3. Generating token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email, // Include email in token payload
      },
      process.env.JWT_KEY,
      { expiresIn: "1d" } // Explicitly define expiresIn here for clarity
    );

    // 4. Create NextResponse with cookie
    const response = NextResponse.json({
      message: "Login success!",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        about: user.about,
      }, // Return only necessary user data
    });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      maxAge: 60 * 60 * 24, // 1 day in seconds, consistent with expiresIn
      path: "/", // Cookie available across all paths
    });

    return response;
  } catch (error) {
    console.error("Login error:", error); // Use console.error
    return responseMess("Internal Server Error during login.", 500, false); // Generic error message for unexpected errors
  }
}