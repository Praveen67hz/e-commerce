import React, { createContext,useState} from "react";
import all_product from "../Components/Assets/all_product";
import { toast } from "react-toastify";

export const ShopContext = createContext(null);

const  getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) 
    {
        cart[index]=0; 
    }
    return cart;
}
const ShopContextProvider=(props)=>{
    const[cartItems,setCartItems]=useState(getDefaultCart());
    const[user,setUser]=useState(localStorage.getItem("user")|| null);

    const loginUser=(email,password)=>{
         const storedUser = JSON.parse(localStorage.getItem("user")) || {};
         if(storedUser.email === email && storedUser.password === password)
        {
            setUser(storedUser);
            localStorage.setItem("loggedIn","true"); 
            return true;
        }
        return false;
    };

    const signupUser =(name,email,password)=>{
        const existinguser = JSON.parse(localStorage.getItem("user"));
        if(existinguser && existinguser.name === name && existinguser.email === email)
        {
            toast("User with same name and same email already exits");
        }
        else{
         localStorage.setItem("user", JSON.stringify({name,email,password}));
         toast("Signup Successfull!,Please log in")
        }
    };

    const logoutUser = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("loggedIn");
        setUser(null);
    }
  
    const addToCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
    }

    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    
    const getTotalCartAmount = ()=>{
          let totalAmount = 0;
          for(const item in cartItems)
          {
            if(cartItems[item]>0)
            {
                let iteminfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += iteminfo.new_price*cartItems[item];
            }
          }
          return totalAmount;
    }
    
    const getTotalCartItems =()=>{
          let totalItem=0;
          for(const item in cartItems)
          {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
          }
          return totalItem;
    }

    const contextValue = {user,loginUser,signupUser,logoutUser,getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return(
        <ShopContext.Provider value={contextValue} >
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;