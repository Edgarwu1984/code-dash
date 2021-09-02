import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdPin } from 'react-icons/io';
import { ImPhone } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';

export const Footer = () => {
  const getCurrentYear = new Date().getFullYear();
  return (
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
                <Link to='/about'>Privacy Policy</Link>
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
        <div className='footer__copyright'>
          &copy; {getCurrentYear} CodeDash Academy
        </div>
      </div>
    </footer>
  );
};
