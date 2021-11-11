import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
//COMPONENTS
import Layout from 'components/layout';
import Hero from 'components/layout/Hero';
import Loader from 'components/common/Loader';
import AlertMessage from 'components/common/AlertMessage';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from 'redux/actions/adminActions';

function EditUserPage({ match, history }) {
  const userId = match.params.id;
  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  // Get User Details
  const singleUser = useSelector(state => state.singleUser);
  const { loading: userLoading, error: userError, user } = singleUser;
  // Update User
  const userUpdate = useSelector(state => state.userUpdate);
  const {
    loading: userUpdateLoading,
    success: userUpdateSuccess,
    error: userUpdateError,
  } = userUpdate;

  // USER FORM STATES
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActivated, setIsActivated] = useState(true);
  const [activeBtn, setActiveBtn] = useState(false);

  useEffect(() => {
    if (!userInfo || !userInfo?.isAdmin) {
      history.push('/404');
    } else {
      if (user._id !== userId) {
        dispatch(getUser(userId));
      } else {
        setUsername(user.username);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setIsActivated(user.isActivated);
      }

      // Notification Messages
      if (userUpdateSuccess) {
        toast.success('User updated.');
        history.push('/dashboard/users');
      } else if (userUpdateError) {
        toast.error(userUpdateError);
      }
    }
  }, [
    dispatch,
    history,
    user?._id,
    user?.email,
    user?.isActivated,
    user?.isAdmin,
    user?.username,
    userId,
    userInfo,
    userUpdateError,
    userUpdateSuccess,
  ]);

  // Update Button State Check
  useEffect(() => {
    if (!username || !email) {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
    }
  }, [username, email]);

  // USER UPDATE HANDLER
  // EMAIL FORMAT VALIDATOR
  const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  const submitHandler = e => {
    e.preventDefault();
    if (!email || !username) {
      toast.error('Input field can not be empty.');
    } else if (!emailFormat) {
      toast.error('Invalid Email format.');
    } else {
      dispatch(updateUser(user._id, { username, email, isAdmin, isActivated }));
    }
  };

  return (
    <Layout pageTitle='- Dashboard_Edit_User'>
      <Hero heroBg='/images/bg9.jpg'>
        <div className='hero__content'>
          <h1>Edit User</h1>
        </div>
      </Hero>
      <div className='container'>
        <div className='page__nav'>
          <Link className='back-btn' to='/dashboard/users'>
            {' '}
            {'<'} Back
          </Link>
        </div>
        <section>
          {/* USER EDIT FORM */}
          {userLoading ? (
            <Loader />
          ) : userError ? (
            <AlertMessage message={userError} type='danger' />
          ) : (
            <form onSubmit={submitHandler} className='edit__form'>
              {userUpdateLoading && <Loader />}
              <div className='form-group'>
                <div className='form-group__image'>
                  <img src={user.photo} alt='user_photo' />
                </div>
                <div>
                  <strong>User_ID:</strong>
                  <span> {user._id}</span>
                </div>
                <div>
                  <strong>Username:</strong>
                  <span> {user.username}</span>
                </div>
                <div>
                  <strong>Email:</strong>
                  <span> {user.email}</span>
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='username' className='form-label'>
                  Username
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className='form-group radio'>
                <label htmlFor='isActivated' className='form-label'>
                  isActivated
                </label>
                <input
                  type='checkbox'
                  checked={isActivated}
                  onChange={e => setIsActivated(e.target.checked)}
                />
              </div>

              <div className='form-group radio'>
                <label htmlFor='isAdmin' className='form-label'>
                  isAdmin
                </label>
                <input
                  type='checkbox'
                  checked={isAdmin}
                  onChange={e => setIsAdmin(e.target.checked)}
                />
              </div>

              <div className='form-group'>
                {activeBtn ? (
                  <input
                    type='submit'
                    className='btn btn-primary form-button'
                    value='Update'
                  />
                ) : (
                  <input
                    type='submit'
                    disabled
                    className='btn btn-primary form-button'
                    value='Update'
                  />
                )}
              </div>
            </form>
          )}
        </section>
      </div>
    </Layout>
  );
}

export default EditUserPage;
