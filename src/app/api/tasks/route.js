import { connectDB } from "@/helper/db";
import responseMess from "@/helper/responseMess";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();
    const { tittle, content, status } = await request.json(); // userId will come from token

    const authToken = request.cookies.get("authToken")?.value;
    if (!authToken) {
      return responseMess("Unauthorized: No authentication token provided.", 401, false);
    }

    let data;
    try {
      data = jwt.verify(authToken, process.env.JWT_KEY);
    } catch (jwtError) {
      console.error("JWT verification failed:", jwtError);
      return responseMess("Unauthorized: Invalid authentication token.", 401, false);
    }

    const task = new Task({
      tittle,
      content,
      status,
      userId: data._id, // Assign userId from the decoded token
    });

    const createdTask = await task.save();

    return NextResponse.json(createdTask, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return responseMess("Failed to create task.", 500, false);
  }
}


export async function GET(request) {
  try {
    await connectDB();
    const tasks = await Task.find();

    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return responseMess("Error in getting data", 404, false);
  }
}

// export async function POST(request) {
//   const { tittle, content, userId, status } = await request.json();

//   const authToken = request.cookies.get("authToken")?.value;
//   // console.log(authToken);

//   const data = jwt.verify(authToken, process.env.JWT_KEY);
//   console.log(data._id);

//   try {
//     const task = new Task({
//       tittle,
//       content,
//       status,
//       userId: data._id,
//     });

//     await connectDB();
//     const createdTask = await task.save();

//     return NextResponse.json(createdTask, {
//       message: "created task",
//       status: 201,
//     });
//   } catch (error) {
//     console.log(error);
//     return responseMess("error in creating the task", 400, false);
//   }
// }
