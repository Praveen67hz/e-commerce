import { useState, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
    const { addProduct } = useContext(ShopContext);
    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        id: Date.now().toString(),
        name: "",
        old_price: 0,
        new_price: 0,
        category: "women",
        image: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formdata,
            [name]: (name === 'new_price' || name === 'old_price') ? parseFloat(value) : value,
        });
    };

    
    const handleSubmit = (e) => {
    e.preventDefault();
    if (!formdata.name || !formdata.image || !formdata.category) {
        alert("Name, Image URL, and Category are required!");
        return;
    }
    addProduct(formdata);
    navigate('/');
    };

    return (
        <div className='add-product'>
            <h2>Add Product</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-row">
                        <div className="input-group">
                            <label>Name</label>
                            <input type="text" name="name" value={formdata.name} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Old Price</label>
                            <input type="number" name="old_price" value={formdata.old_price} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>New Price</label>
                            <input type="number" name="new_price" value={formdata.new_price} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Category</label>
                            <input type="text" name="category" value={formdata.category} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="input-group full-width">
                        <label>Image URL</label>
                        <input type="text" name="image" value={formdata.image} onChange={handleChange} />
                    </div>

                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
