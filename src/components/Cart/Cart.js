import React, { useContext, useState } from 'react';
import './Cart.css';
import { FaCartPlus } from "react-icons/fa";
import StoreContext from '../../hooks/storeContext';

export default function Cart() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartItems, removeFromCart } = useContext(StoreContext); 

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className="cart">
            <div className="cart-icon" onClick={toggleCart}>
                <FaCartPlus />
                <div className="cart-badge">{cartItems.length}</div>
            </div>
            {isCartOpen && cartItems.length > 0 && ( // Check if cart is open and has items
                <ul className="cart-list">
                    {cartItems.map((item, index) => (
                        <li className="cart-item" key={index}>
                            <img src={process.env.REACT_APP_APP_URL + item.attributes.image.data.attributes.url} alt={item.attributes.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <span className="cart-item-title">{item.attributes.title}</span>
                                <span className="cart-item-price">{item.attributes.price} $</span>
                                <button onClick={() => removeFromCart(item.id)} className="remove-item-button">
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {isCartOpen && cartItems.length === 0 && ( 
                <div className="empty-cart-message"></div>
            )}
        </div>
    );
}