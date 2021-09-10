import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const CourseCard = ({
  courseId,
  category,
  courseImg,
  courseName,
  courseTutorId,
  courseTutorFirstName,
  courseTutorLastName,
  courseCategory,
  courseDescription,
  courseRating,
  numReviews,
}) => {
  return (
    <figure className='course-card'>
      <div className='course-card__image-wrap'>
        <div className={`badge ${courseCategory}`}>{courseCategory}</div>
        <img className='image' src={courseImg} alt='featureIcon' />
      </div>

      <div className='course-card__body'>
        <Link to={`/courses/${category}/${courseId}&&${courseName}`}>
          <h4 className='title'>{courseName}</h4>
        </Link>
        <small className='tutor'>
          <Link to={`/courses/instructors/${courseTutorId}`}>
            <span>{courseTutorFirstName}</span>{' '}
            <span>{courseTutorLastName}</span>
          </Link>{' '}
        </small>
        <Rating rating={courseRating} showReview={true} reviews={numReviews} />
        <p>{courseDescription}</p>
      </div>
    </figure>
  );
};

CourseCard.propTypes = {
  category: PropTypes.string,
  courseId: PropTypes.string,
  courseImg: PropTypes.string.isRequired,
  courseName: PropTypes.string.isRequired,
  courseTutorFirstName: PropTypes.string.isRequired,
  courseTutorLastName: PropTypes.string.isRequired,
  courseCategory: PropTypes.string.isRequired,
  courseDescription: PropTypes.string.isRequired,
  courseRating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
};

CourseCard.defaultProps = {
  courseImg: '/images/courses/php.jpg',
  courseName: 'Course name',
  courseTutorFirstName: 'FirstName',
  courseTutorLastName: 'LastName',
  courseCategory: 'php',
  courseDescription:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy et magna.',
  courseRating: 5,
  numReviews: 0,
};

export default CourseCard;
