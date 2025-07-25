// import { httpAxios } from "@/helper/Axios";

// export async function AddTask(task) {
//   const result = await httpAxios
//     .post("/api/tasks", task)
//     .then((response) => response.data);
//   return result;
// }

// export async function getTasksOfUser(userId) {
//   const result = await httpAxios
//     .get(`/api/users/${userId}/task`)
//     .then((response) => response.data);
//   return result;
// }

// export async function DeleteTask(taskId) {
//   const result = await httpAxios
//     .delete(`/api/tasks/${taskId}`)
//     .then((response) => response.data);
// }



// app/services/taskService.js
import { httpAxios } from "@/helper/Axios";

export async function AddTask(task) {
  const result = await httpAxios.post("/api/tasks", task); // No need for .then(response => response.data) if you just want the data
  return result.data; // Axios automatically wraps the response in a 'data' property
}

export async function getTasksOfUser(userId) {
  const result = await httpAxios.get(`/api/users/${userId}/task`);
  return result.data;
}

export async function DeleteTask(taskId) {
  const result = await httpAxios.delete(`/api/tasks/${taskId}`);
  return result.data; // Return result.data for consistency
}

