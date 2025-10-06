import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = ({ orderData }) => {
  const navigate = useNavigate();

  const handleBackToMenu = () => {
    navigate('/menu');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-animation">
          <div className="checkmark">
            <div className="checkmark-circle">
              <div className="checkmark-stem"></div>
              <div className="checkmark-kick"></div>
            </div>
          </div>
          <div className="success-text">
            <h1>Order Submitted Successfully!</h1>
            <p>Your delicious meal is being prepared</p>
          </div>
        </div>

        {orderData && (
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {orderData.items.map(item => (
                <div key={item.id} className="order-item">
                  <img 
                    src={item.picture} 
                    alt={item.name}
                    className="order-item-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="order-item-emoji" style={{display: 'none'}}>{item.picture}</span>
                  <div className="order-item-details">
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-quantity">x{item.quantity}</span>
                  </div>
                  <span className="order-item-price">
                    ${(item.cost * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total: ${orderData.subtotal.toFixed(2)} SGD</span>
            </div>
            <div className="order-time">
              <span>Order placed at: {new Date(orderData.timestamp).toLocaleString()}</span>
            </div>
          </div>
        )}

        <div className="success-actions">
          <button className="btn btn-secondary" onClick={handleBackToMenu}>
            Order More
          </button>
          <button className="btn" onClick={handleBackToHome}>
            Back to Home
          </button>
        </div>

        <div className="celebration-emojis">
          <span className="celebration-emoji">🎉</span>
          <span className="celebration-emoji">🍽️</span>
          <span className="celebration-emoji">😋</span>
          <span className="celebration-emoji">🎊</span>
          <span className="celebration-emoji">✨</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
