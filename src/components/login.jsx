import * as cookieLib from "../libraries/cookieslib.js";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Login({ handleLogin }) {
  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="m-auto bg-slate-900 p-3 w-1/2 mt-10 rounded-2xl ">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* left column */}
            <div className="sm:col-span-3">
              <div className="mt-3">
                <p className="font-extrabold">
                  Sign in to the blog app to continue
                </p>
              </div>
              <div className="mt-20">
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-gray-800 pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="mr-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gray"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </div>

                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="block min-w-0  grow py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                      placeholder="Username or email address"
                    ></input>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-gray-800 pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gray"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="block min-w-0  grow py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                      placeholder="Password"
                    ></input>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-start gap-x-6">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                  >
                    Login
                  </button>
                </div>
                <hr className="mt-10 w-2/3 m-auto"></hr>
                <div className="w-full text-center">
                  <p className="mt-3  text-sm">
                    you don't have an acount ?{" "}
                    <a href="/register" className="text-blue-400 underline">
                      Create a new one
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* right column */}
            <div className="sm:col-span-3  w-full border-l">
              <img className="" src="src/assets/blog.svg"></img>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
