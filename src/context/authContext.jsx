import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

const login = async (inputs) => {
  try {
    const res = await axios.post("http://localhost:3000/api/auth/login", inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data); // Must update context
  } catch (err) {
    throw err;
  }
};

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
