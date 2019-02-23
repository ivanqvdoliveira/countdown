import React from 'react';
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
    </nav>
  )
}

export default Menu
