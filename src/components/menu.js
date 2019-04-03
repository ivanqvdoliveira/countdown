import React from 'react';
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/exemples">Exemples</Link></li>
      </ul>
    </nav>
  )
}

export default Menu

