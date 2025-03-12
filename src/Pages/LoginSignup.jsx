  import React, { useState,useContext} from 'react'
  import { useNavigate} from 'react-router-dom';
  import { ShopContext } from '../Context/ShopContext';
  import './CSS/LoginSignup.css'
  import { toast } from 'react-toastify';
  const LoginSignup = () => {
    const{loginUser,signupUser}=useContext(ShopContext);
    const[isLogin,setIsLogin]=useState(true); 
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState(""); 
    const[name,setName]=useState(""); 
    const navigate=useNavigate(); 

    const handleSubmit = ()=>{
     if(isLogin)
     {
       if(loginUser(email,password))
       {
         navigate("/")
       }
       else{
        toast("Invalid email or password");
       }
     }
     else{
      signupUser(name,email,password);
      setIsLogin(true);
     }
    };

    return (
      <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>

          <div className="loginsignup-fields">
            
            {!isLogin &&(
              <input type='text' placeholder='Your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            )}

            <input type='text' placeholder='Email Address' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='text' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

            <button onClick={handleSubmit}>Continue</button>

            <p className="loginsignup-login" onClick={()=>setIsLogin(!isLogin)}>
              {isLogin ? "New user?" : "Already have an account?"}
              <span>{isLogin ? "Sign Up" : "Login here"}</span>
            </p>

            {!isLogin &&(
              <div className="loginsignup-agree">
              <input type='checkbox' name='' id=''/>
              <p>By continuing i agree to terms of use and privacy policy.</p>
            </div>
            )}
          
          </div>
        </div>
        
      </div>
    )
  };
  
  export default LoginSignup
   