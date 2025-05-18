import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import './EditProduct.css';

const EditProduct = () => {
    const { id } = useParams();
    const { products, editProduct } = useContext(ShopContext);
    const navigate = useNavigate();

    const productToEdit = products?.find((p) => p.id?.toString() === id) || null;

    const [formdata, setFormData] = useState({
        id: Number(id),
        name: "",
        old_price: 0,
        new_price: 0,
        category: "",
        image: ""
    });

    useEffect(() => {
        if (productToEdit) {
            setFormData(productToEdit);
        }
    }, [productToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formdata,
            [name]: (name === 'new_price' || name === 'old_price') ? parseFloat(value) : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editProduct(formdata);
        navigate('/');
    };

    if (!productToEdit) {
        return <div style={{ padding: '1rem' }}>Product Not Found!</div>;
    }

    return (
        <div className='edit-product'>
            <h2>Edit Product</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-row">
                        <div className="input-group">
                            <label>Product Name</label>
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

                    <button type="submit">Edit Product</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
