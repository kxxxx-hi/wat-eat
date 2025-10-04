import React from 'react';
import './DishCard.css';

const DishCard = ({ dish, addToCart }) => {
  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="dish-card">
      <div className="dish-image">
        <span className="dish-emoji">{dish.picture}</span>
        <span className="cuisine-tag-overlay">{dish.cuisine}</span>
      </div>
      
      <div className="dish-info">
        <h3 className="dish-name">{dish.name}</h3>
        <p className="dish-description">{dish.description}</p>
        
        <div className="dish-ratings">
          <div className="rating">
            <span className="rating-label">Marco:</span>
            <span className="stars">{renderStars(dish.marcoLikeability)}</span>
          </div>
          <div className="rating">
            <span className="rating-label">Kexin:</span>
            <span className="stars">{renderStars(dish.kexinLikeability)}</span>
          </div>
        </div>
        
        <div className="dish-meta">
          <span className="cost">${dish.cost.toFixed(2)} SGD</span>
        </div>
        
        <button 
          className="add-to-cart-btn"
          onClick={() => addToCart(dish)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default DishCard;
