import React from 'react';
import PropTypes from 'prop-types';

const CardListSkeleton = ({ col }) => {
  const numCards = col;
  let list = [];
  const createList = () => {
    for (let i = 1; i <= numCards; i++) {
      list.push(i);
    }
    return list;
  };

  createList();

  return (
    <div className={`grid col-${col}`}>
      {list.map(index => (
        <figure key={index} className='course-card skeleton-card'>
          <div className='course-card__image-wrap skeleton-card__image'>
            <div className='badge' />
          </div>
          <div className='course-card__body skeleton-card__body'>
            <div className='title' />
            <div className='tutor' />
            <div className='rating'>
              <div className='stars' />
              <div className='reviews' />
            </div>
            <div className='description' />
          </div>
        </figure>
      ))}
    </div>
  );
};

CardListSkeleton.propTypes = {
  col: PropTypes.string.isRequired,
};

CardListSkeleton.defaultProps = {
  col: '4',
};

export default CardListSkeleton;
