import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
//COMPONENTS
import Layout from '../components/layout';
import Hero from '../components/layout/Hero';
import SectionTitle from '../components/SectionTitle';
import ReviewCard from '../components/ReviewCard';
import AlertMessage from '../components/common/AlertMessage';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';
// UTILITIES
import DateFormatter from '../utils/DateFormatter';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserCourseReviews,
  getUserDetails,
  updateUserDetails,
} from '../redux/actions/userActions';
import Breadcrumb from '../components/common/Breadcrumb';

function ProfilePage({ history }) {
  // HANDLE MODAL
  const [show, setShow] = useState(false);
  const showModalHandler = () => setShow(!show);
  const closeModalHandle = () => setShow(false);

  // UPDATE PROFILE FORM
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password does not match.');
    } else {
      dispatch(
        updateUserDetails({
          id: user._id,
          isAdmin: user.isAdmin,
          username: username,
          email: email,
          password: password,
          photo: photo,
        })
      );
    }
  };

  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const userCourseReviews = useSelector(state => state.userCourseReviews);
  const {
    loading: reviewsLoading,
    error: reviewsError,
    myReviews,
  } = userCourseReviews;
  const userDetailsUpdate = useSelector(state => state.userDetailsUpdate);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = userDetailsUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else {
      dispatch(getUserDetails());
      dispatch(getUserCourseReviews(userInfo._id));
    }

    if (updateSuccess) {
      setShow(false);
      toast.success('User profile updated.');
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [dispatch, history, updateError, updateSuccess, userInfo]);

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

  return (
    <Layout pageTitle='- Profile'>
      <Modal show={show} onClose={closeModalHandle}>
        <form onSubmit={submitHandler}>
          {updateLoading && <Loader />}
          <div className='form-group'>
            <label htmlFor='name' className='form-label'>
              Username
            </label>
            <input
              type='text'
              className='form-control'
              defaultValue={user.username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='name' className='form-label'>
              Email
            </label>
            <input
              type='text'
              className='form-control'
              defaultValue={user.email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              defaultValue={user.password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description' className='form-label'>
              Confirm Password
            </label>
            <input
              type='password'
              className='form-control'
              defaultValue={user.password}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <img
              className='form-group__image'
              src={user.photo}
              alt='user_photo'
            />
            <label htmlFor='description' className='form-label'>
              Photo URL:
            </label>
            <input
              type='text'
              className='form-control'
              defaultValue={user.photo}
              onChange={e => setPhoto(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type='submit'
              className='btn btn-primary form-button'
              value='Update'
            />
          </div>
        </form>
      </Modal>
      <Hero heroBg='/images/bg6.jpg'>
        <div className='user-info__wrap'>
          <img className='photo' src={user && user.photo} alt='user_photo' />
          <h3 className='username'> {user && user.username} </h3>
          {user.isAdmin && <small className='admin__badge'>Admin</small>}
        </div>
      </Hero>
      <div className='container'>
        <section>
          <SectionTitle title='Personal Details' />
          <div className='profile__page-wrap'>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Updated At</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label='Username'>
                    {user.username && user.username}
                  </td>
                  <td data-label='Email'>{user.email && user.email}</td>
                  <td data-label='Updated At'>
                    {user.updatedAt && DateFormatter(user.updatedAt)}
                  </td>
                  <td>
                    <button
                      className='btn btn-outline-primary'
                      onClick={showModalHandler}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className='review__section'>
          <SectionTitle title='My Reviews' />
          {reviewsLoading ? (
            <Loader />
          ) : reviewsError ? (
            <AlertMessage message={reviewsError} type='danger' />
          ) : myReviews.length > 0 ? (
            myReviews.map(review => (
              <ReviewCard
                key={review._id}
                courseName={review.name}
                courseImage={review.image}
                rating={review.reviews[0].rating}
                comment={review.reviews[0].comment}
                commentDate={review.reviews[0].createdAt}
              />
            ))
          ) : (
            <div className='empty__reviews'>No reviews</div>
          )}
        </section>
      </div>
    </Layout>
  );
}

export default ProfilePage;
