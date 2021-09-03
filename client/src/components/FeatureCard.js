import React from 'react';
import PropTypes from 'prop-types';

export const FeatureCard = ({ featureIcon, featureTitle, featureText }) => {
  return (
    <figure className='feature-card'>
      <img
        className='feature-card__image'
        src={featureIcon}
        alt='featureIcon'
      />
      <h4 className='feature-card__title'>{featureTitle}</h4>
      <p className='feature-card__text'>{featureText}</p>
    </figure>
  );
};

FeatureCard.propTypes = {
  featureIcon: PropTypes.string.isRequired,
  featureTitle: PropTypes.string.isRequired,
  featureText: PropTypes.string.isRequired,
};

FeatureCard.defaultProps = {
  featureIcon: '/images/icons/online-education.png',
  featureTitle: 'Title',
  featureText: 'Text content here...',
};
