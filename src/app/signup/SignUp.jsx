"use client";

import { signUp } from "@/Services/userService";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      const result = await signUp(data);
      console.log(result);
      toast.success("user signed up succesfully");
    } catch (error) {
      console.log(error);
      toast.error("error in signUp");
    }
    handleClear();
  };

  const handleClear = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <div>
        <div className="grid grid-cols-12 border">
          <div className="col-span-4 col-start-5 border ">
            <div>
              <h1 className="text-center text-2xl">Sign UP Here</h1>
            </div>
            <form className="mt-4 text-white" onSubmit={handleSignUp}>
              <div className="m-2">
                <label htmlFor="user_name" className="ps-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-600 rounded-2xl focus:ring-gray-800 p-3"
                  id="user_name"
                  name="user_name"
                  placeholder="Enter Here"
                  onChange={(e) => {
                    setData({
                      ...data,
                      name: e.target.value,
                    });
                  }}
                  value={data.name}
                />
              </div>
              <div className="m-2">
                <label htmlFor="user_email" className="ps-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-600 rounded-2xl focus:ring-gray-800 p-3"
                  id="user_email"
                  name="user_email"
                  placeholder="Enter Here"
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                  value={data.email}
                />
              </div>
              <div className="m-2">
                <label htmlFor="user_password" className="ps-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-600 rounded-2xl focus:ring-gray-800 p-3"
                  id="user_password"
                  name="user_password"
                  placeholder="Enter Here"
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                  value={data.password}
                />
              </div>
              <div className="m-2">
                <label htmlFor="user_email" className="ps-2">
                  About
                </label>
                <textarea
                  className="w-full bg-gray-600 rounded-2xl focus:ring-gray-800 p-3"
                  id="user_about"
                  name="user_about"
                  placeholder="Enter Here"
                  rows={5}
                  onChange={(e) => {
                    setData({ ...data, about: e.target.value });
                  }}
                  value={data.about}
                />
              </div>
              <div className="flex justify-around">
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-amber-600 rounded-lg text-xl  px-3 py-2 hover:bg-amber-500 cursor-pointer "
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-blue-900 rounded-lg text-xl px-3 py-2 hover:bg-blue-800 cursor-pointer "
                >
                  SignUp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
