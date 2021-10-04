import React, { useEffect } from 'react';
// COMPONENTS
import TestimonialCard from './cards/TestimonialCard';
import Loader from './common/Loader';
import AlertMessage from './common/AlertMessage';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getTopReviews } from '../redux/actions/reviewActions';

const TopReviewList = () => {
  // REDUX
  const dispatch = useDispatch();
  const topReviews = useSelector(state => state.topReviews);
  const { loading, error, reviews } = topReviews;

  useEffect(() => {
    dispatch(getTopReviews());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage message={error} type='danger' />
      ) : reviews?.length > 0 ? (
        <div className='grid col-3'>
          {reviews?.map(review => (
            <TestimonialCard
              key={review._id}
              comment={review.comment}
              userImage={review.user.photo}
              userName={review.user.username}
              rating={review.rating}
              commentDate={review.createdAt}
            />
          ))}
        </div>
      ) : (
        <div className='empty__reviews'>No reviews</div>
      )}
    </>
  );
};

export default TopReviewList;
