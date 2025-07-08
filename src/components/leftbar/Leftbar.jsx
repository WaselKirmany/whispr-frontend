import "./leftbar.scss";
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
 import { makeRequest } from "../../axios"; // your Axios instance

const Leftbar=()=>{

    const { currentUser } = useContext(AuthContext);
   

    const handleLogout = async () => {
        try {
            await makeRequest.post("/auth/logout");
            localStorage.removeItem("user"); // optional: clear frontend state
            window.location.href = "/login"; // or use navigate("/login")
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return(
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img
                            src={`https://api.dicebear.com/9.x/bottts/svg?seed=${currentUser.username}`}
                            alt=""
                        />
                        <span>{currentUser.username}</span>
                    </div>
                    <div className="createButton">
                            <Link to={'/create'}style={{textDecoration:"none"}}>
                            <button><AddIcon/>whispr</button>
                            </Link> 
                    </div>
                    <div className="item">
                        <HomeIcon/>
                        <span>Home</span>
                    </div>
                    <div className="item">
                        <WhatshotIcon/>
                        <span>Trending</span>
                    </div>
                    <div className="item">
                        <PeopleIcon/>
                        <span>Followers</span>
                    </div>
                    <div className="item">
                        <GroupsIcon/>
                        <span>Groups</span>
                    </div>
                    
                    <div className="item">
                        <ChatOutlinedIcon/>
                        <span>Messages</span>
                    </div>
                    <div className="item">
                        <SettingsIcon/>
                        <span onClick={handleLogout}  style={{ cursor: "pointer" }}>Logout</span>
                    </div>
                </div>
              </div>
          </div>
  );
};


export default Leftbar;