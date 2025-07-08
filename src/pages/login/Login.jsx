import { Link } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login=()=>{

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    const [err, setErr] = useState(null);

    const navigate = useNavigate();


    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const {login}= useContext(AuthContext);

    const handleLogin = async (e) => {
    e.preventDefault();   
    try {
        console.log("🟡 Attempting login with:", inputs);
        await login(inputs);
        console.log("✅ Login successful. Navigating to /");
        navigate("/");
    } catch (err) {
        console.log("❌ Login error:", err);
        setErr(err.response?.data || "Login failed");
    }
    };


    return(
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>New Here?</h1>
                    <p>Sign up to confess. Disappear after.</p>
                    <Link to="/register">
                    <button>Register</button>
                    </Link>
                    
                </div>
                <div className="right">
                    <h1>Login to Your Account</h1>
                    <form>
                        <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        {err && <p className="error">{err}</p>}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;