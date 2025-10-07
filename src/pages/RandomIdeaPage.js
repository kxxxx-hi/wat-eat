import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dishes } from '../data/dishes';
import './RandomIdeaPage.css';

const RandomIdeaPage = ({ addToCart }) => {
  const navigate = useNavigate();
  const [currentDish, setCurrentDish] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const getRandomDish = () => {
    const randomIndex = Math.floor(Math.random() * dishes.length);
    return dishes[randomIndex];
  };

  const shuffleDish = () => {
    setIsShuffling(true);
    // Add a small delay for visual effect
    setTimeout(() => {
      const newDish = getRandomDish();
      setCurrentDish(newDish);
      setIsShuffling(false);
    }, 500);
  };

  useEffect(() => {
    // Set initial random dish when component mounts
    setCurrentDish(getRandomDish());
  }, []);

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };


  if (!currentDish) {
    return (
      <div className="random-idea-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="random-idea-page">
      <div className="idea-header">
        <button className="back-btn" onClick={() => navigate('/')} title="Back">
          ←
        </button>
      </div>
      
      <div className="idea-title-section">
        <h1>💡 Give me an idea</h1>
      </div>

      <div className="idea-content">
        <div className={`dish-suggestion ${isShuffling ? 'shuffling' : ''}`}>
          <div className="suggestion-emoji">
            {isShuffling ? '🎲' : (
              <img 
                src={currentDish.picture} 
                alt={currentDish.name}
                className="idea-dish-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            )}
            <span style={{display: 'none'}}>{currentDish.picture}</span>
          </div>
          
          <div className="suggestion-text">
            <h2>Fancy this, mate?</h2>
            <h3 className="dish-name">{currentDish.name}</h3>
            <p className="dish-description">{currentDish.description}</p>
            
            <div className="dish-ratings">
              <div className="rating">
                <span className="rating-label">Marco:</span>
                <span className="stars">{renderStars(currentDish.marcoLikeability)}</span>
              </div>
              <div className="rating">
                <span className="rating-label">Kexin:</span>
                <span className="stars">{renderStars(currentDish.kexinLikeability)}</span>
              </div>
            </div>
            
            <div className="dish-meta">
              <span className="cuisine-tag">{currentDish.cuisine}</span>
              <span className="cost">${currentDish.cost.toFixed(2)} SGD</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="reshuffle-btn" 
            onClick={shuffleDish}
            disabled={isShuffling}
          >
            {isShuffling ? '🎲 Shuffling...' : '🎲 Try Another'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomIdeaPage;


