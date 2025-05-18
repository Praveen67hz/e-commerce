import React, { useContext, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { toast } from "react-toastify";

const RemoveProduct = () => {
    const { id } = useParams();
    const { products, setProducts } = useContext(ShopContext);
    const navigate = useNavigate();
    const hasRun = useRef(false); 

    useEffect(() => {
        if (hasRun.current) return; 
        hasRun.current = true;

        const productId = id;
        const productExists = products.some((p) => p.id.toString() === productId);
        console.log("Product Exists:", productExists);

        if (!productExists) {
            toast.error("Product not found!");
            navigate("/");
            return;
        }

    
        const updatedProducts = products.filter((p) => p.id.toString() !== productId);
        console.log("Updated Products:", updatedProducts);

        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        toast.success("Product removed successfully!");
        navigate("/");
    }, [id, navigate, products, setProducts]);

    return <h2>Removing Product...</h2>;
};

export default RemoveProduct;
