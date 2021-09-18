import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
//COMPONENTS
import Layout from '../../components/layout';
import Hero from '../../components/layout/Hero';
import Loader from '../../components/common/Loader';
import AlertMessage from '../../components/common/AlertMessage';
import Modal from '../../components/common/Modal';
import SectionTitle from '../../components/common/SectionTitle';
// REACT ICONS
import { RiAdminFill } from 'react-icons/ri';
// UTILITIES
import DateFormatter from '../../utils/DateFormatter';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  getUser,
  getUserList,
  updateUser,
} from '../../redux/actions/adminActions';
import { getCourseList } from '../../redux/actions/courseActions';

function UserPage({ history }) {
  // REDUX
  const dispatch = useDispatch();
  // Get Auth Info
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  // Get User List
  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;
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

  // MODAL STATE
  const [show, setShow] = useState(false);

  // USER FORM STATES
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [admin, setAdmin] = useState(false);
  const [isActivated, setIsActivated] = useState(true);
  const [activeBtn, setActiveBtn] = useState(false);

  useEffect(() => {
    dispatch(getCourseList());
    // Redirect to Home page if Current User not an Admin or User haven't logged in;
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      history.push('/');
    }

    // Notification Messages
    if (userUpdateSuccess) {
      setShow(false);
      toast.success('User updated.');
    } else if (userUpdateError) {
      toast.error(userUpdateError);
    }
  }, [dispatch, history, userInfo, userUpdateError, userUpdateSuccess]);

  // Update Button State Check
  useEffect(() => {
    if (!username || !email) {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
    }
  }, [username, email]);

  // MODAL HANDLER
  const showModalHandler = id => {
    setShow(!show);
    dispatch(getUser(id));
  };
  const closeModalHandle = () => setShow(false);

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
      dispatch(
        updateUser(user._id, { username, email, isAdmin: admin, isActivated })
      );
    }
  };

  return (
    <Layout pageTitle='- Profile'>
      <Modal show={show} onClose={closeModalHandle}>
        {userLoading ? (
          <Loader />
        ) : userError ? (
          <AlertMessage message={userError} type='danger' />
        ) : (
          <form onSubmit={submitHandler}>
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
                New Username
              </label>
              <input
                type='text'
                className='form-control'
                placeholder={user.username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email' className='form-label'>
                New Email
              </label>
              <input
                type='text'
                className='form-control'
                placeholder={user.email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group radio'>
              <label htmlFor='isActivated' className='form-label'>
                isActivated
              </label>
              <input
                type='checkbox'
                onChange={e => setIsActivated(e.target.checked)}
              />
            </div>
            {/* PREVENT ADMIN USER CHANGE ADMIN-SELF "isAdmin" DATA */}
            {userInfo._id !== user._id && userInfo.isAdmin && (
              <div className='form-group radio'>
                <label htmlFor='isAdmin' className='form-label'>
                  isAdmin
                </label>
                <input
                  type='checkbox'
                  onChange={e => setAdmin(e.target.checked)}
                />
              </div>
            )}

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
      </Modal>

      <Hero heroBg='/images/bg9.jpg'>
        <div className='hero__content'>
          <h1>Users</h1>
        </div>
      </Hero>
      <div className='container'>
        <div className='page__nav'>
          <Link className='back-btn' to='/dashboard'>
            {' '}
            {'<'} Back
          </Link>
        </div>
        <section>
          <SectionTitle title='User List' />
          <div className='profile__page-wrap'>
            {loading ? (
              <Loader />
            ) : error ? (
              <AlertMessage message={error} type='danger' />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Activated</th>
                    <th>Last Logged In</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map(user => (
                      <tr key={user._id}>
                        <td data-label='Username'>
                          {user.isAdmin && <RiAdminFill />} {user.username}
                        </td>
                        <td data-label='Email'>{user.email}</td>
                        <td data-label='Admin'>
                          {user.isAdmin ? (
                            <span className='text-success'>Yes</span>
                          ) : (
                            <span className='text-danger'>No</span>
                          )}
                        </td>
                        <td data-label='Activated'>
                          {user.isActivated ? (
                            <span className='text-success'>Yes</span>
                          ) : (
                            <span className='text-danger'>No</span>
                          )}
                        </td>
                        <td data-label='Updated At'>
                          {user.lastTimeLogin &&
                            DateFormatter(user.lastTimeLogin)}
                        </td>
                        <td>
                          <button
                            className='btn btn-outline-primary'
                            onClick={() => showModalHandler(user._id)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default UserPage;
