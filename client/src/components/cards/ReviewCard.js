import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DateFormatter from '../../utils/DateFormatter';
import Rating from '../common/Rating';

const ReviewCard = ({
  courseId,
  courseCategory,
  comment,
  userImage,
  userName,
  rating,
  commentDate,
  courseName,
  courseImage,
}) => {
  return (
    <figure className='review-card'>
      <div className='review-card__user'>
        {courseImage ? (
          <img className='course__image' src={courseImage} alt='userImage' />
        ) : (
          <img className='user__image' src={userImage} alt='userImage' />
        )}

        <div className='user__info'>
          {courseName ? (
            <Link
              className='course-link'
              to={`/courses/${courseCategory}/${courseId}&&${courseName}`}
            >
              <h4 className='username'>{courseName}</h4>
            </Link>
          ) : (
            <h4 className='username'>{userName}</h4>
          )}

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
  commentDate: PropTypes.string.isRequired,
  userName: PropTypes.string,
  courseName: PropTypes.string,
  courseId: PropTypes.string,
  courseCategory: PropTypes.string,
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
