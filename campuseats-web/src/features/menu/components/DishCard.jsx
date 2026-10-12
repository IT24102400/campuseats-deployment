import React from 'react';
import { Link } from 'react-router-dom';

function DishCard({ dish }) {
  return (
    <div className="dish-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h3>{dish.name}</h3>
      <p>Rs. {dish.price.toFixed(2)}</p>
      <small>{dish.category}</small>
      
      {!dish.available && <span style={{ color: 'red', marginLeft: '10px' }}>Sold out</span>}
      <br /><br />
      <Link to={`/dish/${dish.id}`}>View Details</Link>
    </div>
  );
}

export default DishCard;