import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register=()=>{

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "", 
    password: ""
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();   
    try {
      await axios.post("http://localhost:3000/api/auth/register", inputs);
      navigate("/");
    }catch (err) {
      setErr(err.response.data);
    }
  };

    return(
        <div className="register">
            <div className="card">
        <div className="left">
          <h1>Have an Account?</h1>
          <Link to="/login">
          <button>Login</button>
                    </Link>
          
        </div>
        <div className="right">
          <h1>Create Your Account</h1>
          <form>
            <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            {err && <p>{err}</p>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
        </div>
    )
}

export default Register;