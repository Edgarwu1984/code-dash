import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// REACT-ICONS
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [collapse, setCollapse] = useState(true);
  const [navStyleChanged, setNavStyleChanged] = useState(false);

  // HANDLE HAMBURGER MENU
  const collapseHandler = () => setCollapse(!collapse);

  // HANDLE NAVBAR STYLE WHILE SCROLLING
  const navStyleHandler = () => {
    if (window.scrollY > 400) {
      setNavStyleChanged(true);
    } else {
      setNavStyleChanged(false);
    }
  };

  useEffect(() => {
    // NAVAR SCROLL EVENT
    window.addEventListener('scroll', navStyleHandler);
    return () => window.removeEventListener('scroll', navStyleHandler);
  });

  return (
    <nav className={navStyleChanged ? 'navbar navbar-scrolled' : 'navbar'}>
      <div className='navbar__menu'>
        <Link to='/' className='navbar__menu-brand'>
          <img className='logo' src='/images/logo.png' alt='logo' />
        </Link>
        <button className='navbar__menu-toggler' onClick={collapseHandler}>
          {collapse ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      <div className={collapse ? 'navbar-nav' : 'navbar-nav collapse'}>
        <ul className='nav__list'>
          <li className='nav__list-item'>
            <NavLink className='nav__list-item__link' exact to='/'>
              Home
            </NavLink>
          </li>
          <li className='nav__list-item'>
            <NavLink className='nav__list-item__link' to='/courses'>
              Course
            </NavLink>
          </li>
          <li className='nav__list-item'>
            <NavLink className='nav__list-item__link' to='/about'>
              About
            </NavLink>
          </li>
        </ul>
        <ul className='nav__list'>
          <li className='nav__list-item'>
            <Link className='btn btn-outline-primary' to='/login'>
              Login
            </Link>
          </li>
          <li className='nav__list-item'>
            <Link className='btn btn-primary' to='/login'>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
