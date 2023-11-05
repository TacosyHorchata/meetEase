import React, { useContext } from "react";
//import { Redirect } from "react-router-dom";
//import firebaseConfig from "../config.js";
import appFirebase from "../config";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";

import { AuthContext } from "./Auth";
import { Navigate } from "react-router-dom";

const auth = getAuth(appFirebase);

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="dashboard-container">
      <h1>Welcome</h1>
      <p>This is the dashboard, if you can see this you're logged in.</p>
      <button onClick={() => signOut(auth)}>Sign out</button>
    </div>
  );
};

export default Dashboard;
