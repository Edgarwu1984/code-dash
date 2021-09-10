import React from 'react';
import { Link } from 'react-router-dom';
// REACT ICONS
import { IoMdPin } from 'react-icons/io';
import { ImPhone } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
// REDUX
import { useSelector } from 'react-redux';

const Footer = () => {
  const getCurrentYear = new Date().getFullYear();

  // REDUX
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <div
        className='container join-link'
        style={{ backgroundImage: 'url(/images/bg4.jpg)' }}
      >
        {userInfo ? (
          <>
            <h3>Find Our Top Rated Courses</h3>
            <div>
              <Link to='/Course' className='btn'>
                Find Course
              </Link>
            </div>
          </>
        ) : (
          <>
            <h3>Join Our 8302 Happy Students Today!</h3>
            <div>
              <Link to='/register' className='btn'>
                Join Now
              </Link>
            </div>
          </>
        )}
      </div>
      <footer>
        <div className='container'>
          <div className='footer__content'>
            <div className='footer__content-info'>
              <img src='/images/logo.png' alt='logo' />
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla,
                minus!.
              </p>
            </div>
            <div className='footer__content-links'>
              <h4>About</h4>
              <ul>
                <li>
                  <Link to='/about'>About Us</Link>
                </li>
                <li>
                  <Link to='/policy'>Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div className='footer__content-contact'>
              <h4>Contact Info</h4>
              <ul>
                <li>
                  <IoMdPin /> 123 Street, Melbourne VIC 3000
                </li>
                <li>
                  <ImPhone /> 1300 000 000
                </li>
                <li>
                  <MdEmail /> info@codedash.com.au
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='footer__copyright'>
          &copy; {getCurrentYear} CodeDash Academy
        </div>
      </footer>
    </>
  );
};

export default Footer;
