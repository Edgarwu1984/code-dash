import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
//COMPONENTS
import Layout from '../../components/layout';
import Hero from '../../components/layout/Hero';
import Loader from '../../components/common/Loader';
import AlertMessage from '../../components/common/AlertMessage';
import Modal from '../../components/common/Modal';
import SectionTitle from '../../components/SectionTitle';
// REACT ICONS
import { RiAdminFill } from 'react-icons/ri';
// UTILITIES
import DateFormatter from '../../utils/DateFormatter';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserList } from '../../redux/actions/adminActions';
import { getCourseList } from '../../redux/actions/courseActions';

function CourseEditPage({ history }) {
  // REDUX
  const dispatch = useDispatch();
  // Get Auth Info
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  // Get Course List
  const courseList = useSelector(state => state.courseList);
  const { loading, error, courses } = courseList;

  // MODAL STATE
  const [show, setShow] = useState(false);

  // USER FORM STATES
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [admin, setAdmin] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);

  useEffect(() => {
    dispatch(getCourseList());
    // Redirect to Home page if Current User not an Admin or User haven't logged in;
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo]);

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

  //   const submitHandler = e => {
  //     e.preventDefault();
  //     if (!email || !username) {
  //       toast.error('Input field can not be empty.');
  //     } else if (!emailFormat) {
  //       toast.error('Invalid Email format.');
  //     } else {
  //       dispatch(updateUser(user._id, { username, email, isAdmin: admin }));
  //     }
  //   };

  return (
    <Layout pageTitle='- Profile'>
      <Modal show={show} onClose={closeModalHandle}>
        {/* <form onSubmit={submitHandler}> */}
        {/* {userLoading && <Loader />}
          {userUpdateLoading && <Loader />}
          {userError && <AlertMessage message={userError} type='danger' />} */}
        {/* <div className='form-group'>
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
          </div> */}
        {/* PREVENT ADMIN USER CHANGE ADMIN-SELF "isAdmin" DATA */}
        {/* {userInfo._id !== user._id && userInfo.isAdmin && (
            <div className='form-group radio'>
              <label htmlFor='isAdmin' className='form-label'>
                isAdmin
              </label>
              <input
                type='checkbox'
                defaultChecked={user.isAdmin}
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
        </form> */}
      </Modal>

      <Hero heroBg='/images/bg9.jpg'>
        <div className='hero__content'>
          <h1>Admin Dashboard</h1>
          <ul className='dashboard__nav'>
            <li className='dashboard__nav-item'>
              <Link className='dashboard__nav-item__link' to='/dashboard'>
                User
              </Link>
            </li>
            <li className='dashboard__nav-item'>
              <Link
                className='dashboard__nav-item__link active'
                to='/dashboard/course'
              >
                Course
              </Link>
            </li>
          </ul>
        </div>
      </Hero>
      <div className='container'>
        <section>
          <SectionTitle title='Course List' />
          <div className='profile__page-wrap'>
            {loading ? (
              <Loader />
            ) : error ? (
              <AlertMessage message={error} type='danger' />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Course name</th>
                    <th>Instructor</th>
                    <th>Rating</th>
                    <th>Reviews</th>
                    <th>Last Updated</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {courses &&
                    courses.map(course => (
                      <tr key={course._id}>
                        <td data-label='Course Name'>{course.name}</td>
                        <td data-label='Instructor'>
                          {course.instructor.firstName}{' '}
                          {course.instructor.lastName}
                        </td>
                        <td data-label='Rating'>{course.rating}</td>
                        <td data-label='Reviews'>{course.numReviews}</td>
                        <td data-label='Last Updated'>
                          {course.updatedAt && DateFormatter(course.updatedAt)}
                        </td>
                        <td>
                          <button
                            className='btn btn-outline-primary'
                            // onClick={() => showModalHandler(course._id)}
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

export default CourseEditPage;
