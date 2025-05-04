import { NavLink } from "react-router";
import { hasCookie, getCookie, deleteCookie } from "../libraries/cookieslib.js";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NavBar({ loggedIn, userData, handleLogOut }) {
  // console.log(userData)
  return (
    <>
      <div className="navbar bg-gray-500 shadow-sm">
        <div className="flex-1">
          <NavLink className="btn btn-ghost text-xl" to="/page1" end>
            Blog App
          </NavLink>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/page1" end>
                Posts
              </NavLink>
            </li>
            {/* <li>
                <NavLink to="/page2" state={{mode : "create"}}  end>
                    page2
                </NavLink>
            </li> */}
            {!hasCookie("accessToken") && (
              <li>
                <NavLink to="/login" end>
                  Login / Register
                </NavLink>
              </li>
            )}
            {loggedIn && (
              <li>
                <NavLink to="/login" onClick={(e) => handleLogOut(e)} end>
                  {userData.username} / Log out
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
