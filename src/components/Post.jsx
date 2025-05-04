import { NavLink } from "react-router";

export default function Post({ postData, handleDeletePost, userData }) {
  return (
    <>
      {/* <div className="border-2 border-solid my-2.5 px-3"> */}
      <div className="m-auto bg-slate-900 p-3 w-2/3 mt-10 rounded-2xl border-2 border-solid border-slate-600">
        {userData.id === postData.postedBy.userId && (
          <div className="dropdown  float-right">
            <div tabIndex={0} role="button" className="btn m-1">
              <p className="text-2xl">...</p>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
            >
              <li>
                <NavLink
                  to="/page2"
                  state={{ mode: "edit", id: postData.id, obj: postData }}
                  end
                >
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm  btn-ghost justify-start"
                    aria-label="Edit"
                    value="Edit"
                  />
                </NavLink>
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller w-full btn btn-sm  btn-ghost justify-start"
                  aria-label="Delete"
                  value="Delete"
                  onClick={() => handleDeletePost(postData.id)}
                />
              </li>
            </ul>
          </div>
        )}

        {/* poster profile :  */}
        <div className="flex items-center">
          <img
            src={postData.postedBy.profilePic}
            className="w-10 h-10  rounded-full inline my-2"
          ></img>
          <div className="my-0.5">
            <div>
              <p className="ml-3 text-sm"> {postData.postedBy.username}</p>
            </div>
            <div>
              <p className="ml-3 text-xs text-gray-500">
                Date : {postData.date}{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="my-2">
          <b>title : {postData.title}</b>
        </div>
        <div className="text-gray-300">body: {postData.body}</div>
        {postData.image && (
          <div className=" mt-5">
            <img
              src={postData.image || "src/images/1.png"}
              alt="here is the img."
              width={400}
            ></img>
          </div>
        )}
      </div>
    </>
  );
}
