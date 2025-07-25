// import UserContext from "@/context/userContext";
// import { useContext } from "react";
// import { RxCross2 } from "react-icons/rx";

// const Task = ({ task, DeletingTasks }) => {
//   const { user } = useContext(UserContext);

//   function deleteTask(taskId) {
//     DeletingTasks(taskId);
//   }

//   return (
//     <>
//       <div
//         className={` shadow-lg text-white mt-1 rounded-md ${
//           task.status == "completed" ? "bg-green-800" : "bg-gray-800"
//         }`}
//       >
//         <div className="p-5">
//           <div className="flex justify-between">
//             <h1 className="text-2xl font-semibold">{task.tittle}</h1>
//             <span
//               onClick={() => deleteTask(task._id)}
//               className="flex justify-center items-center shadow-lg rounded-full bg-gray-900 size-5 cursor-pointer hover:bg-gray-800  "
//             >
//               <RxCross2 />
//             </span>
//           </div>
//           <p className="font-normal">{task.content}</p>
//           <div className="flex justify-between">
//             <p className="text-left">
//               Status: <span className="font-bold"> {task.status} </span>{" "}
//             </p>
//             <p className="text-right">
//               Author: <span className="font-bold"> {user?.name} </span>{" "}
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Task;



// app/show-tasks/Task.jsx
"use client";

import UserContext from "@/context/userContext";
import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { format } from "date-fns"; // For better date formatting

const Task = ({ task, DeletingTasks }) => {
  const { user } = useContext(UserContext);

  function handleDeleteClick() { // Renamed to clarify intent
    if (window.confirm("Are you sure you want to delete this task?")) {
      DeletingTasks(task._id);
    }
  }

  return (
    <div
      className={`shadow-lg text-white mt-4 p-5 rounded-lg ${
        task.status === "completed" ? "bg-green-700" : "bg-gray-800" // Slightly darker gray
      } hover:shadow-xl transition-shadow duration-200`}
    >
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">{task.tittle}</h1>
        <span
          onClick={handleDeleteClick}
          className="flex justify-center items-center size-8 rounded-full bg-gray-900 cursor-pointer hover:bg-red-600 transition-colors duration-200 text-xl"
          title="Delete Task" // Add tooltip
        >
          <RxCross2 />
        </span>
      </div>
      <p className="font-normal text-gray-200 mb-3">{task.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-300">
        <p className="text-left">
          Status:{" "}
          <span
            className={`font-semibold ${
              task.status === "completed" ? "text-green-200" : "text-yellow-300"
            }`}
          >
            {task.status.toUpperCase()}{" "}
          </span>
        </p>
        <p className="text-right">
          Added:{" "}
          <span className="font-semibold">
            {format(new Date(task.addedDate), "MMM dd, yyyy")}
          </span>
        </p>
      </div>
      <p className="text-right text-xs mt-1 text-gray-400">
        Author: <span className="font-semibold">{user?.name || "Unknown"}</span>
      </p>
    </div>
  );
};

export default Task;