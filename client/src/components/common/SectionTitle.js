import React from 'react';
import PropTypes from 'prop-types';

const SectionTitle = ({ title }) => {
  return (
    <div className='section__title'>
      <h3>{title}</h3>
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

SectionTitle.defaultProps = {
  title: 'Section Title',
};

export default SectionTitle;
