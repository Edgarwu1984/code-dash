import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
//COMPONENTS
import Layout from 'components/layout';
import Hero from 'components/layout/Hero';
import SectionTitle from 'components/common/SectionTitle';
import ReviewCard from 'components/cards/ReviewCard';
import AlertMessage from 'components/common/AlertMessage';
import Loader from 'components/common/Loader';
import Modal from 'components/common/Modal';
// UTILITIES
import DateFormatter from 'utils/DateFormatter';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getUserDetails,
  updateUserDetails,
} from '../redux/actions/userActions';
import { deleteCourseReview } from '../redux/actions/reviewActions';

function ProfilePage({ history }) {
  // HANDLE MODAL
  const [show, setShow] = useState(false);
  const showModalHandler = () => setShow(true);
  const modalOnCloseHandler = () => setShow(false);

  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const userDetailsUpdate = useSelector(state => state.userDetailsUpdate);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = userDetailsUpdate;
  const userDelete = useSelector(state => state.userDelete);
  const { loading: deleteLoading, error: deleteError } = userDelete;
  const deleteReview = useSelector(state => state.deleteReview);
  const {
    loading: deleteReviewLoading,
    success: deleteReviewSuccess,
    error: deleteReviewError,
  } = deleteReview;

  // UPDATE PROFILE FORM
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [deactivated] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else {
      setUsername(user.username);
      setEmail(user.email);
      setPassword(user.password);
      setPhoto(user.photo);
      if (!user || user._id !== userInfo._id) {
        dispatch(getUserDetails());
      }
    }

    if (updateSuccess) {
      setShow(false);
      toast.success('User profile updated.');
    } else if (updateError) {
      toast.error(updateError);
    }

    if (deleteReviewSuccess) {
      toast.success('Review deleted.');
    } else if (deleteReviewError) {
      toast.error(deleteReviewError);
    }
  }, [
    dispatch,
    history,
    userInfo,
    updateError,
    updateSuccess,
    deleteReviewError,
    deleteReviewSuccess,
    user.username,
    user.email,
    user.password,
    user.photo,
    user,
  ]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password does not match.');
    } else {
      dispatch(
        updateUserDetails({
          id: user._id,
          username: username,
          email: email,
          password: password,
          photo: photo,
        })
      );
    }
  };

  const deleteUserHandler = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(
        deleteUser({
          id: user._id,
          isActivated: deactivated,
        })
      );
    }
  };

  const deleteReviewHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCourseReview(id));
      dispatch(getUserDetails());
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage message={error} type='danger' />
      ) : (
        user && (
          <Layout pageTitle='- Profile'>
            <Modal show={show} onClose={modalOnCloseHandler}>
              <form onSubmit={submitHandler}>
                {updateLoading && <Loader />}
                {deleteLoading && <Loader />}
                {deleteError && (
                  <AlertMessage message={deleteError} type='danger' />
                )}
                <div className='form-group'>
                  <label htmlFor='name' className='form-label'>
                    Username
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    value={username || ''}
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
                    value={email || ''}
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
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <img
                    className='form-group__image'
                    src={user?.photo}
                    alt='user_photo'
                  />
                  <label htmlFor='description' className='form-label'>
                    Photo URL:
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    value={photo || ''}
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
                {!user.isAdmin && (
                  <div className='form-group'>
                    <input
                      onClick={deleteUserHandler}
                      type='button'
                      className='btn btn-danger form-button'
                      value='Delete Account'
                    />
                  </div>
                )}
              </form>
            </Modal>
            <Hero heroBg='/images/bg6.jpg'>
              <div className='user-info__wrap'>
                <img className='photo' src={user?.photo} alt='user_photo' />
                <h3 className='username'> {user?.username} </h3>
                {user?.isAdmin && <small className='admin__badge'>Admin</small>}
                <small className='last-login'>
                  Latest Logged In: {DateFormatter(user?.lastTimeLogin)}
                </small>
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
                        <td data-label='Username'>{user?.username}</td>
                        <td data-label='Email'>{user?.email}</td>
                        <td data-label='Updated At'>
                          {DateFormatter(user?.updatedAt)}
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
                {loading || deleteReviewLoading ? (
                  <Loader />
                ) : error ? (
                  <AlertMessage message={error} type='danger' />
                ) : user.reviews?.length > 0 ? (
                  user.reviews?.map(review => (
                    <ReviewCard
                      key={review._id}
                      courseCategory={review.course.category}
                      courseId={review.course._id}
                      courseName={review.course.name}
                      courseImage={review.course.image}
                      rating={review.rating}
                      comment={review.comment}
                      commentDate={review.createdAt}
                      isProfile={true}
                      onDelete={() => deleteReviewHandler(review._id)}
                    />
                  ))
                ) : (
                  <div className='empty__reviews'>No reviews</div>
                )}
              </section>
            </div>
          </Layout>
        )
      )}
    </>
  );
}

export default ProfilePage;
