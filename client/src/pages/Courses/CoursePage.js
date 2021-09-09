import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
// COMPONENTS
import Layout from '../../components/layout';
import Hero from '../../components/layout/Hero';
import Loader from '../../components/Loader';
import AlertMessage from '../../components/AlertMessage';
import Rating from '../../components/Rating';
import SectionTitle from '../../components/SectionTitle';
import Accordion from '../../components/Accordion';
import ScrollToTop from '../../components/ScrollToTop';
import Modal from '../../components/Modal';
import ReviewCard from '../../components/ReviewCard';
// UTILITIES
import ResetPagePosition from '../../utils/ResetPagePosition';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getCourseDetails } from '../../redux/actions/courseActions';
import { addCourseReview } from '../../redux/actions/courseActions';
import { getUserDetails } from '../../redux/actions/userActions';

function CoursePage({ match, history }) {
  // RESET PAGE POSITION
  const pathname = useLocation().pathname;
  ResetPagePosition(pathname);

  // HANDLE MODAL
  const [show, setShow] = useState(false);
  const showModalHandler = () => setShow(!show);
  const closeModalHandle = () => setShow(false);

  // ROUTE VARIABLES
  const id = match.params.id;
  const category = match.params.category;
  const courseName = match.params.name;

  // REDUX
  const dispatch = useDispatch();
  const courseDetails = useSelector(state => state.courseDetails);
  const { loading, error, course } = courseDetails;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector(state => state.userDetails);
  const { user } = userDetails;
  const courseReview = useSelector(state => state.courseReview);
  const {
    loading: reviewLoading,
    success: reviewSuccess,
    error: reviewError,
  } = courseReview;

  useEffect(() => {
    dispatch(getCourseDetails(category, id));
    if (reviewSuccess) {
      toast.success('Thanks for your review.');
      setShow(false);
    } else if (reviewError) {
      toast.error(reviewError);
    }

    if (!user) {
      dispatch(getUserDetails());
    }
  }, [
    dispatch,
    category,
    id,
    reviewSuccess,
    reviewError,
    userInfo,
    history,
    user,
  ]);

  // ADD REVIEW FORM
  const [ratingState, setRatingState] = useState(1);
  const [comment, setComment] = useState('');

  const addReviewHandler = e => {
    e.preventDefault();
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!ratingState || !comment) {
        toast.error('Rating or Comment can not be empty.');
      } else {
        dispatch(
          addCourseReview(id, { rating: Number(ratingState), comment: comment })
        );
      }
    }
  };

  if (loading) {
    return (
      <div className='full__screen-message'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='full__screen-message'>
        <AlertMessage message={error} type='danger' />
      </div>
    );
  }

  const {
    name,
    description,
    image,
    rating,
    numReviews,
    duration,
    instructor,
    features,
    language,
    content,
    reviews,
    updatedAt,
  } = course;

  // CHECK HAS REVIEWED
  const reviewed =
    reviews && reviews.find(review => review.user === user._id) ? true : false;

  return (
    <Layout pageTitle={`- ${courseName}`}>
      <ScrollToTop />
      {/* REVIEW MODAL */}
      <Modal show={show} onClose={closeModalHandle}>
        <form onSubmit={addReviewHandler}>
          {reviewLoading && <Loader />}
          <div className='form-group'>
            <label htmlFor='rating' className='form-label'>
              Rating
            </label>
            <input
              type='number'
              step='.1'
              max='5'
              min='1'
              className='form-control'
              onChange={e => setRatingState(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='comment' className='form-label'>
              Comment
            </label>
            <textarea
              type='text'
              className='form-control'
              name='comment'
              cols='30'
              rows='10'
              placeholder='Write comment here...'
              onChange={e => setComment(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <input
              type='submit'
              className='btn btn-primary form-button'
              value='Submit'
            />
          </div>
        </form>
      </Modal>
      {course && (
        <>
          <Hero heroBg={image}>
            <div className='hero__content course__page-header'>
              <div className='breadcrumb'>
                <Link to='/courses'>courses</Link> /{' '}
                <Link to={`/courses/${category}`}>{category}</Link> /{' '}
                <span>{courseName}</span>
              </div>
              <div className='course'>
                <h2 className='course__name'>{name}</h2>
                <p className='course__description'>{description}</p>
                <Rating
                  rating={rating}
                  showReview={true}
                  reviews={numReviews}
                />
                <div className='course__instructor'>
                  Created By:{' '}
                  <span>
                    {instructor && instructor.firstName}{' '}
                    {instructor && instructor.lastName}
                  </span>
                </div>

                <div className='course__info'>
                  <div className='update__date'>
                    Last Updated:
                    <span>{updatedAt && updatedAt.slice(0, 10)}</span>
                  </div>
                  <div className='language'>
                    Language: <span>{language}</span>
                  </div>
                  <div className='duration'>
                    Total Time: <span>{duration}</span>
                  </div>
                </div>
              </div>
              <div className='review__btn'>
                {!userInfo ? (
                  <Link to='/login' className='btn btn-primary'>
                    Review
                  </Link>
                ) : reviewed ? (
                  <button
                    className='btn btn-primary'
                    onClick={showModalHandler}
                    disabled
                  >
                    Reviewed
                  </button>
                ) : (
                  <button
                    className='btn btn-primary'
                    onClick={showModalHandler}
                  >
                    Review
                  </button>
                )}
              </div>
            </div>
          </Hero>
          <div className='course__features'>
            <div className='container'>
              <h3>What You Will Learn</h3>
              <div className='grid col-2 feature__list'>
                {features &&
                  features.map((f, index) => <li key={index}>{f}</li>)}
              </div>
            </div>
          </div>
          <div className='container'>
            <section className='content__section'>
              <SectionTitle title='course contents' />
              <Accordion data={content} />
            </section>
            <section className='review__section'>
              <SectionTitle title='latest reviews' />
              {reviews && reviews.length === 0 ? (
                <div className='empty__reviews'>No reviews</div>
              ) : (
                reviews &&
                reviews.map(review => (
                  <ReviewCard
                    key={review._id}
                    rating={review.rating}
                    comment={review.comment}
                    userImage={review.user.photo}
                    userName={review.user.username}
                    commentDate={review.createdAt}
                  />
                ))
              )}
            </section>
          </div>
        </>
      )}
    </Layout>
  );
}

export default CoursePage;
