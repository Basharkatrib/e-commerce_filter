import './App.css';
import { useState } from 'react';
import Product from './components/Product/Product';
import Categories from './components/Categories/Categories';
import StoreContext from './hooks/storeContext';
import Cart from './components/Cart/Cart';

function App() {
    const [filter, setFilter] = useState({
        query: "/products?populate=*",
        selectedCategories: []
    });

    // Initialize cartItems from localStorage
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCartItems = localStorage.getItem('cartItems');
            return savedCartItems ? JSON.parse(savedCartItems) : [];
        } catch (error) {
            console.error('Error parsing cartItems from localStorage', error);
            return [];
        }
    });

    const addToCart = (product) => {
        const updatedCartItems = [...cartItems, product];
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    return (
        <StoreContext.Provider value={{ filter, setFilter, cartItems, addToCart, removeFromCart }}>
            <div className="App">
                <Cart />
                <Categories />
                <Product />
            </div>
        </StoreContext.Provider>
    );
}

export default App;