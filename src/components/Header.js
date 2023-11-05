import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import MeetingId from "./MeetingId";
import "./Header.css";
import { UserDataProvider } from "./UserDataContext";
import CreateMeeting from "./CreateMeeting";
import JoinMeeting from "./JoinMeeting";
import UserInMeeting from "./UserInMeeting";
import MeetingFinal from "./MeetingFinal";
import MeetEase from "../assets/MeetEase.png";
import MeetEaseHome from "../assets/MeetEaseHome.png";

const Header = () => {
  const location = useLocation();
  //console.log(location);

  return (
    <>
      <nav className="nav-links">
        <div className="logo">
          <Link to="/">
            {location.pathname === "/home" || location.pathname === "/" ? (
              <img src={MeetEaseHome} alt="MeetEase" />
            ) : (
              <img src={MeetEase} alt="MeetEase" />
            )}
          </Link>
        </div>
        {location.pathname === "/" && (
          <div className="login-container">
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <UserDataProvider>
              <Home />
            </UserDataProvider>
          }
        />

        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route
          exact
          path="/meeting/:id"
          element={
            <UserDataProvider>
              <MeetingId />
            </UserDataProvider>
          }
        />
        <Route exact path="/create-meeting" element={<CreateMeeting />} />
        <Route
          exact
          path="/join-meeting"
          element={
            <UserDataProvider>
              <JoinMeeting />
            </UserDataProvider>
          }
        />
        <Route
          exact
          path="/user-in-meeting"
          element={
            <UserDataProvider>
              <UserInMeeting />
            </UserDataProvider>
          }
        />
        <Route
          exact
          path="/meeting-final/:meetingId"
          element={
            <UserDataProvider>
              <MeetingFinal />
            </UserDataProvider>
          }
        />
      </Routes>
    </>
  );
};
export default Header;
