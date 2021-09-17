import React from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ rating, reviews, showReview, dark }) => {
  return (
    <div className='rating'>
      <div className='rating-star'>
        <span className={dark ? 'rating__value dark' : 'rating__value'}>
          {rating.toFixed(1)}
        </span>
        <span className='rating__icon'>
          {rating >= 1 ? (
            <FaStar />
          ) : rating >= 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className='rating__icon'>
          {rating >= 2 ? (
            <FaStar />
          ) : rating >= 1.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className='rating__icon'>
          {rating >= 3 ? (
            <FaStar />
          ) : rating >= 2.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className='rating__icon'>
          {rating >= 4 ? (
            <FaStar />
          ) : rating >= 3.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className='rating__icon'>
          {rating >= 5 ? (
            <FaStar />
          ) : rating >= 4.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      </div>
      {showReview && (
        <div className={dark ? 'rating-review dark' : 'rating-review'}>
          {reviews && reviews} {reviews > 1 ? 'reviews' : 'review'}
        </div>
      )}
    </div>
  );
};

Rating.defaultProps = {
  rating: 5,
  reviews: 0,
  showReview: false,
  dark: false,
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  showReview: PropTypes.bool,
  dark: PropTypes.bool,
};

export default Rating;
