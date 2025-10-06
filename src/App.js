import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import SuccessPage from './pages/SuccessPage';
import RandomIdeaPage from './pages/RandomIdeaPage';
import { sendOrderNotification } from './services/emailService';

// Menu wrapper component with navigation access
function MenuPageWrapper({ cart, addToCart, removeFromCart, updateQuantity, getSubtotal, submitOrder, showModal, hideModal, showConfirmModal, onOrderSubmit }) {
  const navigate = useNavigate();
  
  const handleSubmitOrder = async () => {
    await submitOrder();
    navigate('/success');
  };

  return (
    <MenuPage 
      cart={cart}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      updateQuantity={updateQuantity}
      getSubtotal={getSubtotal}
      submitOrder={handleSubmitOrder}
      showModal={showModal}
      hideModal={hideModal}
      showConfirmModal={showConfirmModal}
    />
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

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

  // Add body class when modal is open for global dimming
  useEffect(() => {
    if (showConfirmModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showConfirmModal]);

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

  console.log('App render - showConfirmModal:', showConfirmModal);

  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/menu" 
            element={
              <MenuPageWrapper 
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
      
      {/* Portal Modal - renders directly to document.body */}
      {showConfirmModal && createPortal(
        <>
          {/* Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              zIndex: 999999,
              backdropFilter: 'blur(5px)'
            }}
            onClick={handleHideModal}
          />
          
          {/* Modal Content */}
          <div 
            className="app-modal-content"
            style={{
              position: 'fixed',
              top: '50vh',
              left: '50vw',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              padding: '30px',
              borderRadius: '20px',
              textAlign: 'center',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              zIndex: 1000000
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: '#4a4a4a', marginBottom: '15px', fontSize: '1.2rem' }}>
              Are you sure you wanna submit??
            </h3>
            <p style={{ color: '#6b6b6b', marginBottom: '20px', fontSize: '1rem' }}>
              Total: ${getSubtotal().toFixed(2)} SGD
            </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button 
                onClick={handleHideModal}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '25px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  background: 'linear-gradient(45deg, #8a9a8a, #a8b5a8)',
                  color: 'white',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={async () => {
                  await submitOrder();
                  handleHideModal();
                  window.location.href = '/success';
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '25px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  background: 'linear-gradient(45deg, #8a9a8a, #a8b5a8)',
                  color: 'white',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                OK
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
    </Router>
  );
}

export default App;
