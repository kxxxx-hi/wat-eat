import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import SuccessPage from './pages/SuccessPage';
import RandomIdeaPage from './pages/RandomIdeaPage';
import { sendOrderNotification } from './services/emailService';

function App() {
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const addToCart = (dish) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === dish.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== dishId));
  };

  const updateQuantity = (dishId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  const handleShowModal = () => {
    console.log('Showing modal from App.js');
    setShowConfirmModal(true);
  };

  const handleHideModal = () => {
    setShowConfirmModal(false);
  };

  const submitOrder = async () => {
    const orderData = {
      items: cart,
      subtotal: getSubtotal(),
      timestamp: new Date().toISOString()
    };
    
    setOrderData(orderData);
    setCart([]);
    setShowConfirmModal(false);
    
    // Send email notification
    try {
      await sendOrderNotification(orderData);
      console.log('Order notification email sent successfully');
    } catch (error) {
      console.error('Failed to send order notification email:', error);
      // Don't prevent order completion if email fails
    }
  };

  return (
    <Router>
      <div className="App">
        {/* Test Modal at App level */}
        {showConfirmModal && (
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'red',
              color: 'white',
              padding: '50px',
              fontSize: '24px',
              zIndex: 999999,
              border: '5px solid yellow'
            }}
          >
            TEST MODAL FROM APP.JS - CAN YOU SEE THIS?
            <button onClick={handleHideModal}>Close</button>
          </div>
        )}
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/menu" 
            element={
              <MenuPage 
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                getSubtotal={getSubtotal}
                submitOrder={submitOrder}
                showModal={handleShowModal}
                hideModal={handleHideModal}
                showConfirmModal={showConfirmModal}
              />
            } 
          />
          <Route 
            path="/success" 
            element={<SuccessPage orderData={orderData} />} 
          />
          <Route 
            path="/idea" 
            element={<RandomIdeaPage addToCart={addToCart} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
