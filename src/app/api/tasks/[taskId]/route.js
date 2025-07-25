//api/tasks/id

import { connectDB } from "@/helper/db";
import responseMess from "@/helper/responseMess";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { taskId } = params;

  try {
    await connectDB();
    const task = await Task.findById(taskId);

    return NextResponse.json(task, {
      message: "here is the task as per ID",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return responseMess("error in getting single task", 400, false);
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { taskId } = params;
    const { tittle, content, status } = await request.json();
    let task = await Task.findById(taskId);
    (task.tittle = tittle), (task.content = content), (task.status = status);

    const updatedTask = await task.save();

    return NextResponse.json(updatedTask, {
      message: "success in update",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return responseMess("cant update the particular task", 400, false);
  }
}

export async function DELETE(request, { params }) {
  const { taskId } = params;

  try {
    await connectDB();
    const deleteTask = await Task.findByIdAndDelete(taskId);
    return NextResponse.json(deleteTask, {
      message: "delete done of particular task",
      status: 201,
    });
  } catch (error) {
    return responseMess("error in deleting", 400, false);
  }
}
