import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// REACT-ICONS
import { FaBars, FaTimes } from 'react-icons/fa';
import { RiArrowDownSFill, RiLogoutBoxRLine } from 'react-icons/ri';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';
import { toast } from 'react-toastify';

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

  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // NAVAR SCROLL EVENT
    window.addEventListener('scroll', navStyleHandler);
    return () => window.removeEventListener('scroll', navStyleHandler);
  }, []);

  const logoutHandler = () => {
    dispatch(logoutUser());
    toast.success('Logged out.');
  };

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
        {userInfo ? (
          <li className='nav__list-item dropdown__item'>
            <div className='user__info-link'>
              <img
                className='user__photo'
                src={userInfo.photo}
                alt='user_photo'
              />
              <RiArrowDownSFill className='dropdown__arrow' size='1.2rem' />
            </div>
            <ul className='nav__dropdown'>
              <li className='nav__dropdown-item'>
                <div>Signed in as</div>
                <div>{userInfo.username}</div>
              </li>
              {/* ONLY SHOW DASHBOARD WHEN SIGNED IN AS ADMIN */}
              {userInfo.isAdmin && (
                <li className='nav__dropdown-item'>
                  <Link to='/profile'>Dashboard</Link>
                </li>
              )}
              <li className='nav__dropdown-item'>
                <Link to='/profile'>Profile</Link>
              </li>
              <li className='nav__dropdown-item'>
                <Link to='#' onClick={logoutHandler}>
                  Logout <RiLogoutBoxRLine size='1.2rem' />
                </Link>
              </li>
            </ul>
          </li>
        ) : (
          <ul className='nav__list'>
            <li className='nav__list-item'>
              <Link className='btn btn-outline-primary' to='/login'>
                Login
              </Link>
            </li>
            <li className='nav__list-item'>
              <Link className='btn btn-primary' to='/register'>
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
