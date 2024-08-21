import { createContext, useState, useEffect } from 'react';

const StoreContext = createContext({
    filter: {
        query: "/products?populate=*",
        selectedCategories: []
    },
    setFilter: () => {},
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {}
});

export const StoreProvider = ({ children }) => {
    const [filter, setFilter] = useState({
        query: "/products?populate=*",
        selectedCategories: []
    });

    
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

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <StoreContext.Provider value={{ filter, setFilter, cartItems, addToCart, removeFromCart }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContext;