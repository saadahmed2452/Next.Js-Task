// "use client";

// import UserContext from "@/context/userContext";
// import { Loginto } from "@/Services/userService";
// import { useRouter } from "next/navigation";
// import { useContext, useState } from "react";

// const Login = () => {
//   const context= useContext(UserContext);
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

  

//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     console.log(loginData);
//     try {
//       const result = await Loginto(loginData);
//       console.log(result);

//       context.setUser(result.user);

//       router.push("/profile/user");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className="grid grid-cols-12 border">
//         <div className="col-span-4 col-start-5 border ">
//           <h1 className="text-center text-2xl">Login Here</h1>
//           <form className="mt-4 text-white" onSubmit={handleLogin}>
//             <div className="m-2">
//               <label htmlFor="user_email" className="ps-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="w-full bg-gray-600 rounded-2xl focus:ring-gray-800 p-3"
//                 id="user_email"
//                 name="user_email"
//                 placeholder="Enter Here"
//                 onChange={(e) => {
//                   setLoginData({ ...loginData, email: e.target.value });
//                 }}
//                 value={loginData.email}
//               />
//             </div>
//             <div className="m-2">
//               <label htmlFor="user_password" className="ps-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="w-full bg-gray-600 rounded-2xl focus:ring-gray-800 p-3"
//                 id="user_password"
//                 name="user_password"
//                 placeholder="Enter Here"
//                 onChange={(e) => {
//                   setLoginData({ ...loginData, password: e.target.value });
//                 }}
//                 value={loginData.password}
//               />
//             </div>

//             <div className="flex justify-around">
//               <button
//                 type="button"
//                 //   onClick={handleClear}
//                 className="bg-amber-600 rounded-lg text-xl  px-3 py-2 hover:bg-amber-500 cursor-pointer "
//               >
//                 Reset
//               </button>
//               <button
//                 type="submit"
//                 onClick={handleLogin}
//                 className="bg-blue-900 rounded-lg text-xl px-3 py-2 hover:bg-blue-800 cursor-pointer "
//               >
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;




"use client";

import UserContext from "@/context/userContext";
import { Loginto } from "@/Services/userService";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // Import toast

const Login = () => {
  const context = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const result = await Loginto(loginData);
      console.log("Login result:", result);
      context.setUser(result.user);
      toast.success("Login successful!");
      router.push("/profile/user");
    } catch (error) {
      console.error("Login error:", error);
      // Access specific error message from backend
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  const handleClear = () => { // Added clear function
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="grid grid-cols-12 min-h-[calc(100vh-80px)] items-center"> {/* Added min-h and items-center for vertical centering */}
        <div className="col-span-10 md:col-span-6 lg:col-span-4 col-start-2 md:col-start-4 lg:col-start-5 p-8 bg-gray-700 rounded-lg shadow-xl text-white">
          <h1 className="text-center text-3xl font-bold mb-6">Login Here</h1>
          <form className="mt-4" onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="user_email" className="block text-sm font-semibold mb-2 text-gray-200">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-gray-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-colors duration-200"
                id="user_email"
                name="user_email"
                placeholder="Enter your email"
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                }}
                value={loginData.email}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="user_password" className="block text-sm font-semibold mb-2 text-gray-200">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-gray-800 text-white rounded-md focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-colors duration-200"
                id="user_password"
                name="user_password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                }}
                value={loginData.password}
                required
              />
            </div>

            <div className="flex justify-around">
              <button
                type="button"
                onClick={handleClear} // Linked to handleClear
                className="bg-amber-600 rounded-lg text-lg px-5 py-2 hover:bg-amber-700 cursor-pointer transition-colors duration-200 font-medium w-1/3"
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-blue-600 rounded-lg text-lg px-5 py-2 hover:bg-blue-700 cursor-pointer transition-colors duration-200 font-medium w-1/3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;