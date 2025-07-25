import { connectDB } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  let { userid } = params;
  console.log("Received ID:", userid);

  try {
    await connectDB();
    const user = await User.findById(userid);
    console.log(user);

    if (!user) {
      return NextResponse.json({
        message: "user not found with id",
        status: 404,
      });
    }

    return NextResponse.json(user, {
      message: "found by Id",
      status: 201,
    });
  } catch (error) {
    console.log("error", error.message);

    return NextResponse.json({
      message: "error in found",
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  let { userid } = params;

  try {
    await connectDB();
    const user = await User.findByIdAndDelete(userid);
    return NextResponse.json(user, {
      message: "delete succes",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "unable to delete",
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  let { userid } = params;

  try {
    await connectDB();
    const { name, password, about } = await request.json();

    const user = await User.findById(userid);

    user.name = name;
    user.password = password;
    user.about = about;

    const updatedUser = await user.save();

    return NextResponse.json(updatedUser, {
      message: "update done",
      status: 200,
    });
  } catch (errro) {
    return NextResponse.json({
      message: "unable to update",
      ststus: 400,
    });
  }
}

//ssd

// import { NextResponse } from "next/server";

// export function DELETE (request,{ params }){
// //   console.log("User ID:", params.userid); // ✅ Access specific value

// console.log(Object.keys(params));

// // const userid = params.userid;
// // or/
// const {userid} = params;
// console.log("userid",userid);
// // console.log(Object.keys(???));
// // console.log(Object.fromEntries(Object.entries(???)))

//     return NextResponse.json({
//         message : "Testing delete via dynamic route",
//     });

// }
