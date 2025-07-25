import { connectDB } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// ✅ GET: Return hardcoded users
export async function GET(request) {
  await connectDB();
  try {
    const users = await User.find().select("-password");

    console.log("get data", users);

    return NextResponse.json(users, {
      message: "Done Get",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "error in get",
      status: false,
    });
  }
}

// ✅ POST: Echo back received body
export async function POST(request) {
  const { name, email, password, about } = await request.json();
  console.log({ name, email, password, about });

  const user = new User({
    name,
    email,
    password,
    about,
  });

  try {
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.BCRYPT_SALT)
    );

    console.log(user);

    await connectDB();

    const createdUser = await user.save();

    return NextResponse.json(user, {
      message: "Post done ",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "failed to create User",
      status: false,
    });
  }

  // const body = await request.json(); // important: request.body is not directly accessible in Next.js App Router
  // console.log("body", body);

  // return NextResponse.json({
  //   // message: "Post Implemented",
  //   // data: body,
  // });
}

// ✅ PUT: Just a placeholder response
export async function PUT(request) {
  return NextResponse.json({
    message: "Put method called",
  });
}

// ✅ DELETE: Respond with success message
export function DELETE() {
  console.log("delete api called");
  return NextResponse.json(
    {
      message: "deleted",
      status: true,
    },
    {
      status: 201,
      statusText: "Done",
    }
  );
}
