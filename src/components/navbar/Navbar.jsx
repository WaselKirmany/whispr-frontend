import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {

    const { currentUser } = useContext(AuthContext);

    const {toggle,darkMode}=useContext(DarkModeContext)
  return (
    <div className="navbar">
        <div className="left">
            <Link to="/" style={{textDecoration:"none"}}>
                <span>whispr</span>
            </Link>
            <Link to="/" style={{textDecoration:"none"}}>
                <HomeOutlinedIcon/> 
            </Link>
            {darkMode?<DarkModeOutlinedIcon onClick={toggle}/>:<WbSunnyOutlinedIcon onClick={toggle}/>}
            <GridViewOutlinedIcon/>
            <div className="search">
                <SearchOutlinedIcon/>
                <input type="text" placeholder="Search Whispr"/>
            </div>
        </div>
        <div className="right">
            <PersonOutlinedIcon/>
            <EmailOutlinedIcon/>
            <NotificationsOutlinedIcon/>
            <div className="user">
                <img
                    src={`https://api.dicebear.com/9.x/bottts/svg?seed=${currentUser.username}`}
                    alt=""
                />
                <span>{currentUser.username}</span>

            </div>

        </div>

    </div>
  );
};

export default Navbar;
