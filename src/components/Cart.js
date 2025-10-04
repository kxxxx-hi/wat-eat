import React from 'react';
import './Cart.css';

const Cart = ({ cart, removeFromCart, updateQuantity, getSubtotal, submitOrder }) => {
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const handleCheckout = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmOrder = () => {
    submitOrder();
    setShowConfirmModal(false);
  };

  const handleCancelOrder = () => {
    setShowConfirmModal(false);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h3>Cart</h3>
          <span className="cart-count">0 items</span>
        </div>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p className="empty-cart-subtitle">Add some delicious dishes!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h3>Cart</h3>
        <span className="cart-count">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
      </div>
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <span className="cart-item-emoji">{item.picture}</span>
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
      
      <div className="cart-footer">
        <div className="subtotal">
          <span>Subtotal:</span>
          <span className="subtotal-amount">${getSubtotal().toFixed(2)} SGD</span>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal">
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
    </div>
  );
};

export default Cart;
