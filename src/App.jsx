import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";
import { DarkModeContext } from "./context/darkModeContext";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Comment from "./pages/comments/Comment";
import Create from "./pages/create/create";
import "./style.scss";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    document.body.className = darkMode ? "theme-dark" : "theme-light";
  }, [darkMode]);

  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Leftbar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/create", element: <Create /> },
        { path: "/profile/:username", element: <Profile/> },
        { path: "/post/:id", element: <Comment /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;
