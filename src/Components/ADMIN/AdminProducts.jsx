import { useContext,useState,useEffect } from 'react';
import './AdminProducts.css';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const AdminProducts = () => {
    const navigate = useNavigate();
    const { products } = useContext(ShopContext);
    const [adminProducts, setAdminProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const enhancedProducts = products.map(product => ({
                ...product,
                stock_quantity: Math.floor(Math.random() * 11), 
                is_out_of_stock: Math.random() < 0.3 
            }));
            setAdminProducts(enhancedProducts);
        }
    }, [products]);

    const handleStockChange = (id, quantity) => {
        const updated = adminProducts.map(product =>
            product._id === id
                ? {
                    ...product,
                    stock_quantity: quantity,
                    is_out_of_stock: quantity <= 0,
                }
                : product
        );
        setAdminProducts(updated);
    };

    return (
        <div className='admin-products-container'>
            <h1>ALL PRODUCTS</h1>

            <table className='products-table'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {adminProducts.map(product => (
                        <tr
                            key={product._id}
                            className={product.is_out_of_stock ? 'out-of-stock-row' : ''}
                        >
                            <td>
                                <img src={product.image} alt={product.name} width={50} />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.new_price}</td>
                            <td>
                                <input
                                    type="number"
                                    value={product.stock_quantity}
                                    onChange={(e) => {
                                        const qty = Math.max(0, parseInt(e.target.value) || 0);
                                        handleStockChange(product._id, qty);
                                    }}
                                    min="0"
                                    className="stock-input"
                                />
                            </td>
                            <td>
                                <span className={`status-badge ${product.is_out_of_stock ? 'out-of-stock' : 'in-stock'}`}>
                                    {product.is_out_of_stock ? 'Out of Stock' : 'In Stock'}
                                </span>
                            </td>
                            <td>
                                <button
                                    onClick={() => navigate(`/editproduct/${product.id}`)}
                                    className="edit-btn"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AdminProducts;
