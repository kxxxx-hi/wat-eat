import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/menu');
  };

  return (
    <div className="homepage">
      <div className="homepage-content">
        <div className="title-container fade-in-up">
          <h1 className="main-title">Wat eat??</h1>
          <p className="subtitle">click to order</p>
          <button className="order-btn" onClick={handleClick}>
            🍽️ Start Ordering
          </button>
        </div>
        
        <div className="food-illustrations">
          <div className="food-item">🍕</div>
          <div className="food-item">🍜</div>
          <div className="food-item">🍱</div>
          <div className="food-item">🍔</div>
          <div className="food-item">🥘</div>
          <div className="food-item">🍣</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
