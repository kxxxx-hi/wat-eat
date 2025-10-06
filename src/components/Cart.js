import React, { useEffect } from 'react';
import './Cart.css';

const Cart = ({ cart, removeFromCart, updateQuantity, getSubtotal, submitOrder }) => {
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleCheckout = () => {
    console.log('Checkout clicked, showing modal');
    console.log('Current cart length:', cart.length);
    setShowConfirmModal(true);
    console.log('Modal state set to true');
  };

  const handleConfirmOrder = () => {
    submitOrder();
    setShowConfirmModal(false);
  };

  const handleCancelOrder = () => {
    setShowConfirmModal(false);
  };

  // Add body class when modal is open
  useEffect(() => {
    console.log('Modal state changed:', showConfirmModal);
    if (showConfirmModal) {
      document.body.classList.add('modal-open');
      console.log('Added modal-open class to body');
    } else {
      document.body.classList.remove('modal-open');
      console.log('Removed modal-open class from body');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showConfirmModal]);

  return (
    <>
    <div className="cart-container">
      <div className="cart-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>Cart</h3>
        <span className="cart-count">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
        <span className="cart-toggle-icon">{isExpanded ? '▲' : '▼'}</span>
      </div>
      
      {/* Always show cart footer with subtotal and checkout button */}
      <div className="cart-footer">
        <div className="subtotal">
          <span>Subtotal:</span>
          <span className="subtotal-amount">${getSubtotal().toFixed(2)} SGD</span>
        </div>
        <button 
          className={`checkout-btn ${cart.length === 0 ? 'disabled' : ''}`} 
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
      
      {/* Collapsible cart items section */}
      {isExpanded && cart.length > 0 && (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <img 
                  src={item.picture} 
                  alt={item.name}
                  className="cart-item-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="cart-item-emoji" style={{display: 'none'}}>{item.picture}</span>
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <span className="cart-item-price">${item.cost.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="cart-item-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Show empty message when expanded and cart is empty */}
      {isExpanded && cart.length === 0 && (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p className="empty-cart-subtitle">Add some delicious dishes!</p>
        </div>
      )}

      </div>

      {showConfirmModal && (
        <div 
          className="modal-overlay" 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999
          }}
        >
          <div 
            className="modal"
            style={{
              background: 'white',
              padding: '30px',
              borderRadius: '20px',
              textAlign: 'center',
              maxWidth: '400px',
              width: '90%'
            }}
          >
            <h3>Are you sure you wanna submit??</h3>
            <p>Total: ${getSubtotal().toFixed(2)} SGD</p>
            <div className="modal-buttons">
              <button className="btn btn-secondary" onClick={handleCancelOrder}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleConfirmOrder}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      
      {console.log('Modal should show:', showConfirmModal)}
    </>
  );
};

export default Cart;
