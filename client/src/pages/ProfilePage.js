import React, { useEffect } from 'react';
//COMPONENTS
import Layout from '../components/layout';
import Hero from '../components/layout/Hero';
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';
// UTILITIES
import DateFormatter from '../utils/DateFormatter';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../redux/actions/userActions';

function ProfilePage({ history }) {
  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else {
      dispatch(getUserDetails());
    }
  }, [dispatch, history, userInfo]);

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
      <Hero heroBg='/images/bg6.jpg'>
        <div className='user-info__wrap'>
          <img className='photo' src={user && user.photo} alt='user_photo' />
          <h3 className='username'> {user && user.username} </h3>
          {user.isAdmin && <small className='admin__badge'>Admin</small>}
        </div>
      </Hero>
      <div className='container'>
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
                <td data-label='Username'>{user.username && user.username}</td>
                <td data-label='Email'>{user.email && user.email}</td>
                <td data-label='Updated At'>
                  {user.updatedAt && DateFormatter(user.updatedAt)}
                </td>
                <td>
                  <button className='btn btn-outline-primary'>Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
