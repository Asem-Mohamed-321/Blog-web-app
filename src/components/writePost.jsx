import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getImageURL } from "../libraries/imageppApi";

export default function WritePost({ userId, username, profilePic }) {
  const location = useLocation(); //I used useLocation to send a value/object using the navLink to change the mode of the writing of the post
  const navigate = useNavigate(); //to navigate to the home page after the logic
  const [isLoading, setIsLoading] = useState(false);
  function handleFormCancel() {
    navigate("/page1");
  }

  async function handleFormPost(e) {
    e.preventDefault();
    const imgUrl = await getImageURL(e.target.file, setIsLoading);

    //saving the data in the db
    let newObj = {
      title: e.target.title.value,
      body: e.target.body.value,
      image: imgUrl,
      postedBy: { userId: userId, username: username, profilePic: profilePic },
      date: new Date().toLocaleString(),
    };
    if (location.state.mode === "create") {
      //if you are creating a new post use this logic
      // console.log("create mode")
      axios
        .post("http://localhost:3000/posts", newObj)
        .then((res) => console.log(res));
    } else if (location.state.mode === "edit") {
      //if you are editing an existing post use this logic
      // console.log("edit mode");
      const image = location.state.obj.img;
      if (!imgUrl || imgUrl === "") {
        const newObjSameImage = { ...newObj, image: location.state.obj.image };
        axios
          .put(
            "http://localhost:3000/posts/" + location.state.id,
            newObjSameImage
          )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } else {
        axios
          .put("http://localhost:3000/posts/" + location.state.id, newObj)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      // if(!image){console.log("there is image");console.log(image)}else{console.log("no image")}
    }
    navigate("/page1");
  }

  return (
    <>
      <div className="m-auto bg-slate-900 p-3 w-3/4 mt-10 rounded-2xl ">
        {isLoading && (
          <div className="flex justify-center items-center border-2 border-slate-600 rounded-3xl h-20">
            <span className="loading loading-spinner loading-xl text-white  m-auto"></span>
          </div>
        )}
        {isLoading || (
          <form
            className=" border-2 border-slate-600 rounded-3xl m-2 px-10 pb-5"
            onSubmit={handleFormPost}
          >
            <div className="space-y-1">
              <div className=" pb-12"></div>
              <h2 className="text-base/7 font-semibold text-white">
                Write your Post
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm/6 font-medium text-white"
                  >
                    Title:
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-slate-700 pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                      <input
                        required
                        type="text"
                        name="title"
                        id="title"
                        className="caret-white block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-400 bg-slate-700 focus:outline-none sm:text-sm/6"
                        placeholder="post title"
                        defaultValue={
                          location.state &&
                          location.state.obj &&
                          location.state.obj.title
                        }
                      ></input>
                    </div>
                  </div>
                </div>
                {/* <div><input type="file" name="file" className="file-input"></input></div> */}

                <div className="col-span-full">
                  <label
                    htmlFor="body"
                    className="block text-sm/6 font-medium text-white"
                  >
                    Body:
                  </label>
                  <div className="mt-2">
                    <textarea
                      required
                      name="body"
                      id="body"
                      rows="3"
                      className="block w-full rounded-md bg-slate-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      placeholder="What's in your mind ?.."
                      defaultValue={
                        location.state &&
                        location.state.obj &&
                        location.state.obj.body
                      }
                    ></textarea>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="imageURL"
                    className="block text-sm/6 font-medium text-white"
                  >
                    Image URL:
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-slate-700 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                      <input
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        className="cursor-pointer pl-3 caret-white block min-w-0 grow py-1.5 pr-3 text-base text-white placeholder:text-gray-400 bg-slate-700  hover:bg-slate-500 focus:outline-none sm:text-sm/6"
                        placeholder="./myImage.png (ex: src/images/1.png)"
                      ></input>
                      {/* defaultValue={location.state && location.state.obj && location.state.obj.image} */}
                    </div>
                    <p
                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="file_input_help"
                    >
                      JPG, PNG, BMP, GIF, TIF, WEBP, HEIC, AVIF, PDF, 32 MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="cursor-pointer  rounded-md bg-indigo-900 px-3 py-1.5 text-sm/6 font-semibold text-white"
                onClick={handleFormCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Post
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
