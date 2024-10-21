"use client";

import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { SignIn as SignInUser } from "../lib/Authenciation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // State to handle errors
  const [success,setSuccess] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await SignInUser(email, password); // Sign in the user
      setSuccess("Logged In Sucesfully ...") 
      Cookies.set("loggedIn", JSON.stringify({ isLoggedIn: true, userEmailId: email }), { expires: 30 });
      router.push('/dashboard')
    } catch (err) {
      setError("Wrong Email or Password");
      console.log("path = loginpage handle submit function",err) 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full h-[500px] max-w-md space-y-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Login to your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <div className="flex items-center">
              {showPassword ? (
                <LuEyeOff
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <LuEye
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
              <label htmlFor="show-password" className="ml-2 block text-sm text-gray-900">
                {showPassword ? "Hide" : "Show"} Password
              </label>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-500 text-sm text-center">
              {success}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
