import { useState, useEffect } from "react";
import {
  hasCookie,
  getCookie,
  deleteCookie,
  setCookie,
} from "./libraries/cookieslib.js";
import axios from "axios";
import { useNavigate } from "react-router";

import "./App.css";
import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar";
import Page1 from "./components/pag1";
import Page2 from "./components/page2";
import Login from "./components/login";
import Register from "./components/register";
import Error from "./components/error";
import WritePost from "./components/writePost.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (hasCookie("accessToken")) {
      setLoggedIn(true);
      const token = getCookie("accessToken");
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      axios
        .get("http://localhost:3000/users/" + decoded.sub)
        .then((res) => {
          setUserData(res.data), setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    // console.log(e.target.username.value);
    // console.log(e.target.password.value);
    axios
      .post("http://localhost:3000/login", {
        email: e.target.username.value,
        password: e.target.password.value,
      })
      .then((res) => {
        // alert(res.data.accessToken)
        const token = res.data.accessToken;
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        // console.log(decoded),
        setCookie("accessToken", token);
        // localStorage.setItem("accessToken", res.data.accessToken);
        setLoggedIn(true);
        navigate("/page1");
      })
      .catch((err) => alert(err.response.data));
    //   navigate('/login')
  }

  function handleLogOut(e) {
    e.preventDefault();
    setLoggedIn(false);
    setUserData({});
    deleteCookie("accessToken");
    navigate("/login");
  }

  // console.log(userData.profilePic)
  return (
    <>
      {/* <p>Hello World!</p> */}
      <NavBar
        loggedIn={loggedIn}
        userData={userData}
        handleLogOut={handleLogOut}
      />
      <Routes>
        <Route path="/" element={<Page1 userData={userData} />} />
        <Route path="/page1" element={<Page1 userData={userData} />} />

        <Route
          path="/page2"
          element={
            <WritePost
              userId={userData.id}
              username={userData.username}
              profilePic={userData.profilePic}
            />
          }
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
