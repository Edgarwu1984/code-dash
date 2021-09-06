import React from 'react';
import PropTypes from 'prop-types';
import DateFormatter from '../utils/DateFormatter';
import Rating from './Rating';

const ReviewCard = ({ comment, userImage, userName, rating, commentDate }) => {
  return (
    <figure className='review-card'>
      <div className='review-card__user'>
        <img className='user__image' src={userImage} alt='userImage' />
        <div className='user__info'>
          <h4 className='username'>{userName}</h4>
          <small className='date'>
            Reviewed At: {DateFormatter(commentDate)}
          </small>
          <Rating rating={rating} />
        </div>
      </div>
      <p className='review-card__comment'>{comment}</p>
    </figure>
  );
};

ReviewCard.propTypes = {
  comment: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  userImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  commentDate: PropTypes.string.isRequired,
};

ReviewCard.defaultProps = {
  comment:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.',
  rating: 5,
  userImage: '/images/user_photo_default.jpg',
  userName: 'Username',
  commentDate: '12 Aug 2021',
};

export default ReviewCard;
