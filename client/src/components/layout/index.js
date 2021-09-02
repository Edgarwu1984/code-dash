import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = ({ pageTitle, children }) => {
  document.title = `CodeDash ${pageTitle}`;
  return (
    <>
      <Navbar />
      <div className='content-wrapper'>{children}</div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  pageTitle: PropTypes.string,
};

Layout.defaultProps = {
  pageTitle: '',
};
