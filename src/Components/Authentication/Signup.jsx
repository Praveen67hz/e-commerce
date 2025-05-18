import React, { useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ShopContext } from '../../Context/ShopContext';
import "./Signup.css";

const Signup = () => {
  const { signupUser } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    signupUser(name, email, password, isAdmin);
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <div className="signup-fields">
          <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="admin-checkbox">
          <input type="checkbox" id="admin" onChange={(e) => setIsAdmin(e.target.checked)} />
          <label htmlFor="admin">Register as Admin</label>
        </div>
        <button onClick={handleSignup}>Sign Up</button>
        <p className="signup-text">
          Already have an account? <Link to = "/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
