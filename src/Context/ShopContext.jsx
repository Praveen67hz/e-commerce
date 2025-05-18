import  { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../API/axios";

export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {

    const [shippingMethod, setShippingMethod] = useState(() => {
        return localStorage.getItem("shippingMethod") || "Standard";
      });
      
      const [shippingCost, setShippingCost] = useState(() => {
        return Number(localStorage.getItem("shippingCost")) || 5;
      });

      useEffect(() => {
        localStorage.setItem("shippingMethod", shippingMethod);
        localStorage.setItem("shippingCost", shippingCost);
      }, [shippingMethod, shippingCost]);
       
      const [shippingDetails, setShippingDetails] = useState(() => {
        return JSON.parse(localStorage.getItem("shippingDetails")) || {
          name: "",
          address: "",
          city: "",
          postalCode: "",
          country: "",
        };
      });
      
      useEffect(() => {
        localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));
      }, [shippingDetails]);
      

    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem("cartItems")) || getDefaultCart();
    });

    
    const clearCart =()=>{
        setCartItems(getDefaultCart);
        localStorage.setItem('cartItems' , JSON.stringify(getDefaultCart()));
    };


    const [couponCode, setCouponCode] = useState(() => {
        return localStorage.getItem("couponCode") || "";
      });
      
      const [discountAmount, setDiscountAmount] = useState(() => {
        return Number(localStorage.getItem("discountAmount")) || 0;
      });


     // dark mode 
     const [darkMode , setDarkMode] = useState(()=>{
        const saved = localStorage.getItem("darkMode");
        return saved ? JSON.parse(saved) : false;
     });      

     const toggleDarkMode = () =>{
           setDarkMode((prev) => !prev);
     };

     useEffect(() =>{
        localStorage.setItem("darkMode",JSON.stringify(darkMode));
        document.body.className = darkMode ? 'dark' : '';
     },[darkMode]);

     const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored && stored !== "undefined" ? JSON.parse(stored) : null;
        } catch (e) {
            console.error("Failed to parse user from localStorage:", e);
            return null;
        }
    });
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
             try{
                const response = await axios.get("/api/product/all");
                setProducts(response.data);
             }
             catch(err){
                console.error("No products found");
            }
        };
        fetchProducts();
    }, []);

    const migrateProductstoDB = async () => {
         const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
         for(let product of storedProducts)
         {
         try{
             await axios.post("/api/product/addproduct" , product);
             console.log(`Migrated product ID : ${product.id}`);
         }
         catch(err){
             console.log(`Skipped product ID : ${product.id}`,err.response?.data?.message);
         }
    }
    toast.success(" Product migration completed! ");
};

     //useEffect(() => {
    //migrateProductstoDB();
   //}, []);


    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const loginUser = async (email, password) => {
        try{
           const response = await axios.post("/api/auth/login",{email,password});
           const {token, user} = response.data;

           localStorage.setItem("token",token);
           localStorage.setItem("user",JSON.stringify(user));

           setUser(user);
           toast("Login Successfull!");
           return true;
        }
        catch(err){
            toast.error(err.response?.data?.message || "Login failed");
            return false;
        }
    };

    const signupUser = async (name, email, password, isAdmin = false) => {
        try{
            const response = await axios.post("/api/auth/signup",{
                name,
                email,
                password,
                role: isAdmin? "admin" : "user" ,
            });

            const {token, user} = response.data;
            localStorage.setItem("token",token);
            localStorage.setItem("user",JSON.stringify(user));
            setUser(user);
            toast("Signup Successfull!");
            return true;
        }
        catch(err){
           toast.error(err.response?.data?.message || "Signup failed");
           return false;
        };
    };

    const logoutUser = () => {
        localStorage.removeItem("token"); 
        localStorage.removeItem("user");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUserEmail");
        setUser(null);
        toast("Logged Out Successfully!");
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            localStorage.setItem("cartItems", JSON.stringify(updatedCart)); 
            return updatedCart;
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: Math.max(0, (prev[itemId] || 0) - 1) };
            localStorage.setItem("cartItems", JSON.stringify(updatedCart)); 
            return updatedCart;
        });
    };

    
const getDefaultCart = () => {
    let cart = {};
    if(!products || products.length === 0) return cart;

    for (let index = 0; index < products.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let iteminfo = products.find((product) => product.id === Number(item));
                if (iteminfo) {
                    totalAmount += iteminfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const addProduct = async(newProduct) => {
         try{
            const response = await axios.post("/api/product/addproduct",newProduct);
            const savedProduct = response.data;

            setProducts((prev) => {
               const updated = [...prev , savedProduct];
               localStorage.setItem("products",JSON.stringify(updated));
               return updated;
            });
            toast.success("Product added successfully!");
         }
         catch(err)
         {
           toast.error(err.response?.data?.message || "Failed to add product.");    
         }
    };


    const editProduct = (updatedProduct) => {
        setProducts((prev) => {
            const updatedProducts = prev.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            localStorage.setItem("products", JSON.stringify(updatedProducts));
             toast.success("Edited succesfull!");
            return updatedProducts;
        }
    );
};


    const contextValue = {
        addProduct,
        editProduct,
        products,
        setProducts,
        user,
        loginUser,
        signupUser,
        logoutUser,
        getTotalCartItems,
        getTotalCartAmount,
        cartItems,
        addToCart,
        removeFromCart,
        couponCode,
        setCouponCode,
        discountAmount,
        setDiscountAmount,
        darkMode,
        toggleDarkMode,
        clearCart,
        shippingMethod,
        setShippingMethod,
        shippingCost,
        setShippingCost,
        shippingDetails,
        setShippingDetails
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
