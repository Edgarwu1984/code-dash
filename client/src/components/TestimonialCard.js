import React from 'react';
import PropTypes from 'prop-types';
import { FaQuoteLeft } from 'react-icons/fa';

export const TestimonialCard = ({
  comment,
  userImage,
  userName,
  commentDate,
}) => {
  return (
    <figure className='testimonial-card'>
      <p className='testimonial-card__comment'>
        <FaQuoteLeft className='quote-icon' />
        {comment}
      </p>
      <div className='testimonial-card__user'>
        <img className='user__image' src={userImage} alt='userImage' />
        <div className='user__info'>
          <h4 className='username'>{userName}</h4>
          <small className='date'>{commentDate}</small>
        </div>
      </div>
    </figure>
  );
};

TestimonialCard.propTypes = {
  comment: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  commentDate: PropTypes.string.isRequired,
};

TestimonialCard.defaultProps = {
  comment:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.',
  userImage: '/images/user_photo_default.jpg',
  userName: 'Username',
  commentDate: '12 Aug 2021',
};
