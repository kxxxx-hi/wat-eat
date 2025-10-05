import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dishes } from '../data/dishes';
import DishCard from '../components/DishCard';
import Cart from '../components/Cart';
import './MenuPage.css';

const MenuPage = ({ cart, addToCart, removeFromCart, updateQuantity, getSubtotal, submitOrder }) => {
  const navigate = useNavigate();
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  // Get unique cuisine types
  const cuisineTypes = ['All', ...new Set(dishes.map(dish => dish.cuisine))];

  // Filter dishes based on selected cuisine
  const filteredDishes = selectedCuisine === 'All' 
    ? dishes 
    : dishes.filter(dish => dish.cuisine === selectedCuisine);

  const handleOrderSuccess = () => {
    navigate('/success');
  };

  // Override submitOrder to include navigation
  const handleSubmitOrder = () => {
    submitOrder();
    setTimeout(() => {
      handleOrderSuccess();
    }, 100);
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <button className="back-btn" onClick={() => navigate('/')} title="Back">
          ←
        </button>
        <h1>What's on the Menu?</h1>
        <div className="menu-stats">
          <span>{filteredDishes.length} delicious dishes</span>
        </div>
      </div>

      <div className="cuisine-tabs">
        {cuisineTypes.map(cuisine => (
          <button
            key={cuisine}
            className={`cuisine-tab ${selectedCuisine === cuisine ? 'active' : ''}`}
            onClick={() => setSelectedCuisine(cuisine)}
          >
            {cuisine}
          </button>
        ))}
      </div>

      <div className="menu-content">
        <div className="dishes-grid">
          {filteredDishes.map(dish => (
            <DishCard 
              key={dish.id} 
              dish={dish} 
              addToCart={addToCart}
            />
          ))}
        </div>
        
        <div className="cart-sidebar">
          <Cart 
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            getSubtotal={getSubtotal}
            submitOrder={handleSubmitOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
