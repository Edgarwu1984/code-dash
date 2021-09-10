import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// REACT ICONS
import { FaLinkedinIn, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { CgArrowRight } from 'react-icons/cg';

const InstructorCard = ({ photo, name, intro, id }) => {
  return (
    <figure className='instructor-card'>
      <img className='portrait' src={photo} alt={name} />
      <div className='instructor__info'>
        <h4 className='instructor__info-name'>{name}</h4>
        <p className='instructor__info-intro'>{intro}</p>
        <Link
          className='instructor__info-link'
          to={`/courses/instructors/${id}`}
        >
          See Courses{' '}
          <span>
            <CgArrowRight />
          </span>
        </Link>
        <div className='instructor__info-social'>
          <FaLinkedinIn className='social__icon' />
          <FaFacebookF className='social__icon' />
          <FaTwitter className='social__icon' />
        </div>
      </div>
    </figure>
  );
};

InstructorCard.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
};

InstructorCard.defaultProps = {
  photo: '/images/instructors/instructor_01.jpg',
  name: 'Name',
  intro:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
};

export default InstructorCard;
