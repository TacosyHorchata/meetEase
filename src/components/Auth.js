import React, { useEffect, useState } from "react";
//import firebaseConfig from "../config.js";
import appFirebase from "../config.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(appFirebase);
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
