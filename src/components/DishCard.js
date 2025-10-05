import React from 'react';
import './DishCard.css';

const DishCard = ({ dish, addToCart }) => {
  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="dish-card">
      <div className="dish-image">
        <img 
          src={dish.picture} 
          alt={dish.name}
          className="dish-img"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <span className="dish-emoji" style={{display: 'none'}}>{dish.picture}</span>
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
          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(dish)}
            style={{
              width: '10px',
              height: '10px',
              minWidth: '10px',
              minHeight: '10px',
              maxWidth: '10px',
              maxHeight: '10px',
              aspectRatio: '1',
              flex: 'none',
              flexShrink: '0',
              flexGrow: '0'
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
