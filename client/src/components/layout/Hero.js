import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ heroBg, heroHeight, children }) => {
  return (
    <header
      className='hero'
      style={{ backgroundImage: `url(${heroBg})`, height: `${heroHeight}` }}
    >
      <img className='triangle' src='/images/triangle.svg' alt='triangle' />
      <div className='container'>{children}</div>
    </header>
  );
};

Hero.propTypes = {
  heroBg: PropTypes.string.isRequired,
  heroHeight: PropTypes.string.isRequired,
};

Hero.defaultProps = {
  heroBg: '/images/bg1.jpg',
  heroHeight: '400px',
};

export default Hero;
