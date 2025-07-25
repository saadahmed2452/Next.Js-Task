import { connectDB } from "@/helper/db";
import responseMess from "@/helper/responseMess";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { userid } = context.params;

  try {
    await connectDB();

    // console.log(Object.keys(params))

    const tasks = await Task.find({ userId: userid }); // ✅ if your schema uses `userId` field
    return NextResponse.json(tasks, {
      message: "here are the tasks of particular user id",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return responseMess("unasble to get the tasks", 400, false);
  }
}
