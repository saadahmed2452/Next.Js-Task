// "use client";

// import responseMess from "@/helper/responseMess";
// import { useState } from "react";
// import { AddTask } from "@/Services/taskService";
// import toast, { Toaster } from "react-hot-toast";

// const AddTasks = () => {
//   const [task, setTask] = useState({
//     tittle: "",
//     content: "",
//     status: "none",
//     userId: "68342005ad063f800f7d779f",
//   });

//   const handleAddTask = async (e) => {
//     e.preventDefault();
//     console.log(task);
//     try {
//       console.log("Submitting task:", task);

//       const result = await AddTask(task);
//       console.log(result);
//       toast.success("Task added succesfully");
//     } catch (error) {
//       console.log(error);
//       toast.error(error);
//       return responseMess("error in getting the data", 400, false);
//     }
//     handleClear();
//   };

//   const handleClear = () => {
//     setTask({
//       tittle: "",
//       content: "",
//       status: "none",
//     });
//   };

//   return (
//     <>
//       <Toaster position="top-right" reverseOrder={false} />
//       <div className="grid grid-cols-12 justify-center">
//         <div className="col-span-6 col-start-4 mt-4">
//           <h1 className="text-3xl">Add Your Task Here</h1>
//           <form className="" onSubmit={handleAddTask}>
//             <div className="mt-4 text-white">
//               <label
//                 htmlFor="task_tittle"
//                 className="block text-sm font-semibold mb-2 "
//               >
//                 Tittle
//               </label>
//               <input
//                 type="text"
//                 className="w-full bg-gray-600 rounded-full focus:ring-gray-800 p-3"
//                 id="task_tittle"
//                 name="task_tittle"
//                 value={task.tittle}
//                 onChange={(e) => {
//                   setTask({
//                     ...task,
//                     tittle: e.target.value,
//                   });
//                 }}
//               />
//             </div>
//             <div className="mt-4 text-white">
//               <label
//                 htmlFor="task_content"
//                 className="block text-sm font-semibold mb-2"
//               >
//                 Content
//               </label>
//               <textarea
//                 id="task_content"
//                 className="w-full bg-gray-600 rounded-lg focus:ring-gray-800 p-3"
//                 rows={5}
//                 name="task_content"
//                 value={task.content}
//                 onChange={(e) => {
//                   setTask({
//                     ...task,
//                     content: e.target.value,
//                   });
//                 }}
//               />
//             </div>
//             <div className="mt-4 text-white">
//               <label
//                 htmlFor="task_status"
//                 className="block text-sm font-semibold mb-2"
//               >
//                 Status
//               </label>
//               <select
//                 id="task_status"
//                 className="w-full bg-gray-600 rounded-lg focus:ring-gray-800 p-3 "
//                 name="task_status"
//                 value={task.status}
//                 onChange={(e) => {
//                   setTask({
//                     ...task,
//                     status: e.target.value,
//                   });
//                 }}
//               >
//                 <option value="none">---Select Status---</option>
//                 <option value="pending">pending</option>
//                 <option value="completed">completed</option>
//               </select>
//             </div>

//             <div className=" flex justify-around mt-4">
//               <button
//                 type="button"
//                 className="bg-amber-800 p-2 rounded-xl text-white hover:bg-amber-700 cursor-pointer"
//                 onClick={handleClear}
//               >
//                 Clear
//               </button>
//               <button
//                 type="submit"
//                 className=" bg-black p-2 rounded-xl text-white hover:bg-blue-950 cursor-pointer"
//               >
//                 Add Task
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddTasks;



"use client";

import { useState, useContext } from "react"; // Import useContext
import { AddTask } from "@/Services/taskService";
import toast, { Toaster } from "react-hot-toast";
import UserContext from "@/context/userContext"; // Import UserContext

const AddTasks = () => {
  const { user } = useContext(UserContext); // Get user from context
  const [task, setTask] = useState({
    tittle: "",
    content: "",
    status: "pending", // Default status to 'pending' instead of 'none'
    // userId: "68342005ad063f800f7d779f", // Remove hardcoded userId
  });

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add a task.");
      return;
    }

    try {
      // You don't need to explicitly pass userId in the client-side state
      // if your API automatically extracts it from the authentication token.
      // This is generally a more secure and robust approach.
      console.log("Submitting task:", task);
      const result = await AddTask(task); // API will get userId from token
      console.log(result);
      toast.success("Task added successfully!");
      handleClear();
    } catch (error) {
      console.error("Error adding task:", error); // Use console.error
      // Display a more user-friendly error message
      toast.error(error.response?.data?.message || "Failed to add task. Please try again.");
    }
  };

  const handleClear = () => {
    setTask({
      tittle: "",
      content: "",
      status: "pending", // Reset to default pending
    });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="grid grid-cols-12 justify-center min-h-[calc(100vh-80px)] items-center"> {/* Added min-h and items-center for vertical centering */}
        <div className="col-span-10 md:col-span-6 lg:col-span-4 col-start-2 md:col-start-4 lg:col-start-5 mt-4 p-8 bg-gray-700 rounded-lg shadow-xl"> {/* Improved styling and responsiveness */}
          <h1 className="text-3xl text-white text-center mb-6 font-bold">Add Your Task Here</h1>
          <form className="" onSubmit={handleAddTask}>
            <div className="mb-4">
              <label
                htmlFor="task_tittle"
                className="block text-sm font-semibold mb-2 text-gray-200"
              >
                Title
              </label>
              <input
                type="text"
                className="w-full bg-gray-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-colors duration-200"
                id="task_tittle"
                name="task_tittle"
                value={task.tittle}
                onChange={(e) => {
                  setTask({
                    ...task,
                    tittle: e.target.value,
                  });
                }}
                required // Added required attribute
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="task_content"
                className="block text-sm font-semibold mb-2 text-gray-200"
              >
                Content
              </label>
              <textarea
                id="task_content"
                className="w-full bg-gray-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-colors duration-200"
                rows={5}
                name="task_content"
                value={task.content}
                onChange={(e) => {
                  setTask({
                    ...task,
                    content: e.target.value,
                  });
                }}
                required // Added required attribute
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="task_status"
                className="block text-sm font-semibold mb-2 text-gray-200"
              >
                Status
              </label>
              <select
                id="task_status"
                className="w-full bg-gray-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-colors duration-200"
                name="task_status"
                value={task.status}
                onChange={(e) => {
                  setTask({
                    ...task,
                    status: e.target.value,
                  });
                }}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex justify-around mt-6">
              <button
                type="button"
                className="bg-amber-600 p-3 rounded-lg text-white hover:bg-amber-700 cursor-pointer transition-colors duration-200 font-medium w-1/3"
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                type="submit"
                className="bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 cursor-pointer transition-colors duration-200 font-medium w-1/3"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTasks;