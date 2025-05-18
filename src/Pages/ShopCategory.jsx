import { useContext,useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './CSS/ShopCategory.css';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { products } = useContext(ShopContext);
  const [sortOrder, setSortOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  
  const filteredProducts = Array.isArray(products)
  ? products
      .filter((item) => props.category === item.category)
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  : [];

   const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'lowToHigh') return a.new_price - b.new_price;
    if (sortOrder === 'highToLow') return b.new_price - a.new_price;
    return b.id - a.id;
  });

  const displayedProducts = sortedProducts.slice(0,visibleCount);

  const  handleExploreMore = () =>{
        setVisibleCount((prev) => prev+12);
  };


  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />

      <div className="shopcategory-indexSort">
        <div className="shopcategory-search">
          <input
            type="text"
            placeholder="search-products"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(12); 
            }}
            className="search-input"
          />
        </div>
        <div className="shopcategory-sort">
          Sort by
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>


      <div className="shopcategory-products">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((item, i) => (
            <div className="product-card" key={i}>
              <Item
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      { visibleCount < sortedProducts.length && (
      <button
        className="shopcategory-loadmore"
        type="button"
        onClick={() => {
        handleExploreMore();
      }}
      >
        Explore More
      </button>
      )};

    </div>
  );
};

export default ShopCategory;
