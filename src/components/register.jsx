import axios from "axios";
import { useNavigate } from "react-router";
import { getImageURL } from "../libraries/imageppApi";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate(); //to navigate to the home page after the logic
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    if (e.target.password.value === e.target.confirmPass.value) {
      const uploadedImage = e.target.file.files[0]
        ? await getImageURL(e.target.file, setIsLoading)
        : "src/assets/better.svg";
      console.log(uploadedImage);

      axios
        .post("http://localhost:3000/signup", {
          email: e.target.email.value,
          password: e.target.password.value,
          username: e.target.username.value,
          profilePic: uploadedImage,
        })
        .then((res) => {
          console.log(res), navigate("/login");
        })
        .catch((err) => alert(err.response.data));
    } else {
      alert("passwords don't match .. please rewrite your password");
    }
  }
  return (
    <>
      <form onSubmit={handleRegister}>
        <div className="m-auto bg-slate-900 p-3 w-1/2 mt-10 rounded-2xl ">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* left column */}
            <div className="sm:col-span-3">
              <div className="mt-3">
                <p className="font-extrabold">Create an account</p>
              </div>
              <div className="mt-10">
                {/* email input */}
                <div className="mt-4">
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
                          d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                        />
                      </svg>
                    </div>

                    <input
                      required
                      type="text"
                      name="email"
                      id="email"
                      className="block min-w-0  grow py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                      placeholder="Email address"
                    ></input>
                  </div>
                </div>
                {/* name input */}
                <div className="mt-4">
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
                      required
                      type="text"
                      name="username"
                      id="username"
                      className="block min-w-0  grow py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                      placeholder="Username"
                    ></input>
                  </div>
                </div>
                {/* password input */}
                <div className="mt-4">
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
                      required
                      type="password"
                      name="password"
                      id="password"
                      className="block min-w-0  grow py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                      placeholder="Password"
                    ></input>
                  </div>
                </div>
                {/* confirm password input */}
                <div className="mt-4">
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
                      required
                      type="password"
                      name="confirmPass"
                      id="confirmPass"
                      className="block min-w-0  grow py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                      placeholder="Confirm password"
                    ></input>
                  </div>
                </div>

                {/* profile pic:  */}
                <div className="mt-4">
                  <div className="flex items-center rounded-md bg-gray-800 outline-1 pl-3 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                    <div className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="gray"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      accept="image/*"
                      className="  cursor-pointer pl-1 caret-indigo-600 block min-w-0 grow py-1.5 pr-3 text-base text-gray-500 placeholder:text-gray-500 bg-gray-800  focus:outline-none sm:text-sm/6"
                      placeholder="./myImage.png (ex: src/images/1.png)"
                    ></input>

                    {/* defaultValue={location.state && location.state.obj && location.state.obj.image} */}
                  </div>
                  <p
                    className="mt-1 text-xs text-gray-500 dark:text-gray-500"
                    id="file_input_help"
                  >
                    JPG, PNG, BMP, GIF, TIF, WEBP, HEIC, AVIF, PDF, 32 MB
                  </p>
                </div>
                {/* Login button */}
                <div className="mt-6 flex items-center justify-start gap-x-6">
                  {isLoading && (
                    <button
                      type="submit"
                      disabled
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {" "}
                      <span className="loading loading-spinner loading-xs text-white  m-auto"></span>
                    </button>
                  )}
                  {isLoading || (
                    <button
                      type="submit"
                      className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign up{" "}
                    </button>
                  )}
                </div>
                <hr className="mt-10 w-2/3 m-auto"></hr>
                <div className="w-full text-center">
                  <p className="mt-3  text-sm">
                    Already have an acount ?{" "}
                    <a href="/login" className="text-blue-400 underline">
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* right column */}
            <div className="sm:col-span-3  w-full border-l">
              <img className="" src="src/assets/register.svg"></img>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
