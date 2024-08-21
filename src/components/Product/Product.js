import { useContext, useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import './Product.css';
import StoreContext from '../../hooks/storeContext';

export default function Product() {
    const [products, setProducts] = useState([]);
    const { filter, addToCart } = useContext(StoreContext);
    const { data, loading, error } = useFetch(filter.query);

    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data]);

    return (
        <div className='container'>
            {loading ? "Loading" : products.map(product => (
                <div className="product_card" key={product.id}>
                    <h3 className="product_title">{product.attributes.title}</h3>
                    <div className="container_image">
                        <p className="product_price">{product.attributes.price} $</p>
                        <img src={process.env.REACT_APP_APP_URL + product.attributes.image.data.attributes.url} alt={product.attributes.title} />
                        <p className="product_desc">{product.attributes.desc}</p>
                    </div>
                    <button onClick={() => addToCart(product)}>Add to cart</button>
                </div>
            ))}
        </div>
    );
}