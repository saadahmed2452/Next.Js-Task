// "use client";
// import UserContext from "@/context/userContext";
// import { LogOut } from "@/Services/userService";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useContext } from "react";

// const Navbar = () => {
//   const context = useContext(UserContext);
//   const router = useRouter();
//   console.log(context);

//   // Show nothing while loading
//   if (context.loading) {
//     return null; // Or return a spinner if you like
//   }

//   async function doLogoOut() {
//     const result = await LogOut();
//     console.log(result);
//     context.setUser(undefined);
//     router.push("/");
//   }

//   return (
//     <>
//       <div className="flex justify-between h-10 bg-amber-500 items-center">
//         <div>
//           <h1 className="text-2xl font-bold">NavBar</h1>
//         </div>
//         <div>
//           <ul className="flex space-x-5">
//             {context.user && (
//               <>
//                 <li>
//                   <Link href="/">Home</Link>
//                 </li>
//                 <li>
//                   <Link href="/add-task">Add Task</Link>
//                 </li>
//                 <li>
//                   <Link href="/show-tasks">Show Tasks</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//         <div>
//           <ul className="flex space-x-4">
//             {context.user ? (
//               <>
//                 <li>
//                   <Link href={"#!"}>{context.user.name}</Link>
//                 </li>
//                 <li>
//                   <button onClick={doLogoOut}>LogOut</button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link href={"/login"}>LogIn</Link>
//                 </li>
//                 <li>
//                   <Link href={"/signup"}>SignUp</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;



"use client";
import UserContext from "@/context/userContext";
import { LogOut } from "@/Services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Navbar = () => {
  const context = useContext(UserContext);
  const router = useRouter();

  // Show nothing while loading (or a loading spinner)
  if (context.loading) {
    return (
      <div className="flex justify-between h-14 bg-amber-500 items-center px-5 text-white">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <div>Loading user...</div>
      </div>
    );
  }

  async function doLogOut() { // Renamed for consistency
    try {
      await LogOut(); // No need to store result if you're just redirecting
      context.setUser(undefined);
      router.push("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
      // Optionally show a toast error here
      alert("Failed to log out. Please try again.");
    }
  }

  return (
    <div className="flex justify-between h-14 bg-amber-500 items-center px-5 text-white shadow-md">
      <div>
        <Link href="/" className="text-2xl font-bold hover:text-gray-200 transition-colors duration-200">
          Task Manager
        </Link>
      </div>
      <div>
        <ul className="flex space-x-7 text-lg font-medium">
          {context.user && (
            <>
              <li>
                <Link href="/" className="hover:text-gray-200 transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link href="/add-task" className="hover:text-gray-200 transition-colors duration-200">Add Task</Link>
              </li>
              <li>
                <Link href="/show-tasks" className="hover:text-gray-200 transition-colors duration-200">Show Tasks</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <ul className="flex space-x-4 text-lg font-medium">
          {context.user ? (
            <>
              <li>
                <Link href="/profile/user" className="hover:text-gray-200 transition-colors duration-200">
                  {context.user.name || "User"} {/* Display user name, fallback to "User" */}
                </Link>
              </li>
              <li>
                <button
                  onClick={doLogOut}
                  className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700 transition-colors duration-200"
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="hover:text-gray-200 transition-colors duration-200">Log In</Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-gray-200 transition-colors duration-200">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;