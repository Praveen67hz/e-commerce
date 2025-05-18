import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from '../../Context/ShopContext';
import "./Login.css";

const Login = () => {
  const { loginUser } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async() => {
      const success = await loginUser(email,password);
      if(success)
      {
        localStorage.setItem("currentUserEmail",email);
        navigate("/");
      }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <div className="login-fields">
          <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Login</button>
        <p className="login-text">
          New user? <Link to = "/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
