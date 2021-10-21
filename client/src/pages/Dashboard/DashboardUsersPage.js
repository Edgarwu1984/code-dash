import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
//COMPONENTS
import Layout from 'components/layout';
import Hero from 'components/layout/Hero';
import Loader from 'components/common/Loader';
import AlertMessage from 'components/common/AlertMessage';
import SectionTitle from 'components/common/SectionTitle';
// REACT ICONS
import { RiAdminFill } from 'react-icons/ri';
// UTILITIES
import DateFormatter from 'utils/DateFormatter';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from 'redux/actions/adminActions';
import { getCourseList } from 'redux/actions/courseActions';

function UserPage({ history }) {
  // REDUX
  const dispatch = useDispatch();
  // Get Auth Info
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  // Get User List
  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(getCourseList());
    // Redirect to Home page if Current User not an Admin or User haven't logged in;
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo]);

  return (
    <Layout pageTitle='- Profile'>
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
                          {!user.isAdmin && (
                            <Link
                              className='btn btn-outline-primary'
                              to={`/dashboard/users/${user._id}/edit`}
                            >
                              Edit
                            </Link>
                          )}
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
