import React, { useState } from 'react';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="wrapper">
        <div className="logo">
          <Link to="/home">
            <img src={logo} alt="Company Logo" className="logo-img" />
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
          <ul>
            <li><Link to="/home">Home</Link></li>
            
            {/* About Us with Dropdown */}
            <li className="dropdown">
              <a 
                href="#about" 
                className="dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  toggleAboutDropdown();
                }}
              >
                About
                <svg 
                  className={`dropdown-arrow ${isAboutDropdownOpen ? 'rotate' : ''}`}
                  width="12" 
                  height="12" 
                  fill="currentColor" 
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
              </a>
              <ul className={`dropdown-menu ${isAboutDropdownOpen ? 'show' : ''}`}>
                <li><Link to="/aboutus">About Us</Link></li>
                <li><Link to="/ourteam">Our Team</Link></li>
              </ul>
            </li>
            
            <li><Link to="/product">Product</Link></li>
            <li><Link to="/ecosystem">Ecosystem</Link></li>
            <li><Link to="/career">Career</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="http://127.0.0.1:8000/login" className="tbl-biru">Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
