import React, { useState, useEffect } from 'react';

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = React.useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotalAmount(total);
    }, [cartItems]);

    const addToCart = (newItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === newItem._id);

            if (existingItem) {
                return prevItems.map(item =>
                    item._id === newItem._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...newItem, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== id));
    };

    const increaseQuantity = (id) => {
        setCartItems(prevItems => prevItems.map(item =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (id) => {
        setCartItems(prevItems => {
            const targetItem = prevItems.find(item => item._id === id);
            if (targetItem.quantity === 1) {
                return prevItems.filter(item => item._id !== id);
            } else {
                return prevItems.map(item =>
                    item._id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
        });
    };

    const value = { cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, totalAmount };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
