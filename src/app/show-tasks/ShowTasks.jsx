// "use client";

// import UserContext from "@/context/userContext";
// import { DeleteTask, getTasksOfUser } from "@/Services/taskService";
// import React, { useContext, useEffect, useState } from "react";

// import Task from "./Task";
// import toast, { Toaster } from "react-hot-toast";
// const ShowTasks = () => {
//     const [tasks, setTasks] = useState([]);
//   const context = useContext(UserContext);

//   async function loadTasks(userId) {
//     try {
//       const tasks = await getTasksOfUser(userId);
//       setTasks([...tasks]);
//       console.log(tasks);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     if (context.user) {
//       loadTasks(context.user._id);
//     }
//   }, [context.user]);


//   async function DeletingTasks(tasksId){
//     try {




//       const res = await DeleteTask(tasksId);
//       console.log(res);
//       const newTasks= tasks.filter(item=> item._id!=tasksId);
//       setTasks(newTasks);
//       toast.success("Task deleted Succesfully");
      
//     } catch (error) {
//       console.log(error)
//       toast.error("error in deleting");
//     }


//   }


//   return (
//        <>
//     <Toaster position="bottom-center"/>
//       <div className="grid grid-cols-12 mt-3 ">
//         <div className="col-span-6 col-start-4">
//           <h1 className="text-3xl text-center mb-3">
//             Your Tasks ({tasks.length})
//           </h1>

//           {tasks.map((task) => (
//             <Task task={task} key={task._id} DeletingTasks={DeletingTasks} />
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default ShowTasks


// app/show-tasks/ShowTasks.jsx
"use client";

import UserContext from "@/context/userContext";
import { DeleteTask, getTasksOfUser } from "@/Services/taskService";
import React, { useContext, useEffect, useState } from "react";
import Task from "./Task";
import toast, { Toaster } from "react-hot-toast";

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const { user, loading } = useContext(UserContext); // Get loading state

  async function loadTasks(userId) {
    try {
      const fetchedTasks = await getTasksOfUser(userId);
      // Sort tasks: pending first, then completed; within each, sort by latest addedDate
      fetchedTasks.sort((a, b) => {
        if (a.status === "pending" && b.status === "completed") return -1;
        if (a.status === "completed" && b.status === "pending") return 1;
        return new Date(b.addedDate) - new Date(a.addedDate); // Sort by latest date
      });
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
      toast.error("Failed to load tasks.");
    }
  }

  useEffect(() => {
    if (!loading && user) { // Load tasks only after user context is loaded and user exists
      loadTasks(user._id);
    } else if (!loading && !user) {
      setTasks([]); // Clear tasks if user logs out
    }
  }, [user, loading]); // Depend on user and loading context state

  async function DeletingTasks(taskId) { // Renamed for clarity
    try {
      await DeleteTask(taskId);
      const newTasks = tasks.filter((item) => item._id !== taskId);
      setTasks(newTasks);
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error in deleting task:", error);
      toast.error("Error deleting task.");
    }
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="grid grid-cols-12 mt-8">
        <div className="col-span-10 md:col-span-8 lg:col-span-6 col-start-2 md:col-start-3 lg:col-start-4">
          <h1 className="text-4xl text-white text-center mb-6 font-extrabold">
            Your Tasks ({tasks.length})
          </h1>

          {loading ? (
            <p className="text-center text-gray-400 text-xl">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-gray-400 text-xl">No tasks to display. Add some tasks!</p>
          ) : (
            tasks.map((task) => (
              <Task task={task} key={task._id} DeletingTasks={DeletingTasks} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ShowTasks;