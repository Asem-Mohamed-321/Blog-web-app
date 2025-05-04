import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import { hasCookie } from "../libraries/cookieslib";

export default function Page1({ userData }) {
  const [postsArray, setPostsArray] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!hasMore) return;
    axios
      .get("http://localhost:3000/posts?_start=" + page + "&_limit=5")
      .then((res) => {
        setPostsArray([...postsArray, ...res.data]);
        if (res.data.length < 5) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  function handleDeletePost(id) {
    axios.delete("http://localhost:3000/posts/" + id);
  }

  function handleScrolling() {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 5);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrolling);
  }, []);

  // if not logged in :
  if (!hasCookie("accessToken")) {
    return (
      <>
        <div className="bg-slate-900 text-white font-sans min-h-screen ">
          {/* <!-- Hero Section --> */}
          <section className="text-center px-6 py-20 relative">
            <h1 className="text-5xl font-extrabold leading-tight">
              Blog Application
              <br />
              <span className="text-indigo-400">
                ITI project focusing on<u> React js </u>
              </span>
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-gray-300">
              A blog app projec where you can add posts and see others' posts
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-[#1e1b4b] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 hover:cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-500 hover:cursor-pointer"
              >
                Register
              </button>
            </div>
          </section>

          <section className="py-10 text-center border-t border-indigo-900 mt-20">
            <p className="text-sm text-gray-400 mb-4">Made by : Asem Mohamed</p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="https://github.com/Asem-Mohamed-321/">
                <img
                  src="src/assets/github.png"
                  className="h-10 fill-blue-50"
                />
              </a>
              <a href="https://www.linkedin.com/in/asem-as321">
                <img src="src/assets/linkedin.png" className="h-10" />
              </a>
              <a href="mailto:asem.student.321@gmail.com">
                <img src="src/assets/email.png" className="h-10" />
              </a>
            </div>
          </section>
        </div>
      </>
    );
  }
  // if logged in :
  return (
    <>
      {postsArray.map((post) => (
        <Post
          key={post.id}
          postData={post}
          handleDeletePost={handleDeletePost}
          userData={userData}
        />
      ))}
      <div
        onClick={() => navigate("/page2", { state: { mode: "create" } })}
        className="fixed bottom-5 right-10  bg-blue-900 hover:bg-blue-700 cursor-pointer w-15 h-15 rounded-full flex items-center justify-center "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </div>
      {/* <Post /> */}
    </>
  );
}
