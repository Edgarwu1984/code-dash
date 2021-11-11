import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
//COMPONENTS
import Layout from 'components/layout';
import Hero from 'components/layout/Hero';
import Loader from 'components/common/Loader';
import AlertMessage from 'components/common/AlertMessage';
import SectionTitle from 'components/common/SectionTitle';
// UTILITIES
import DateFormatter from 'utils/DateFormatter';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getCourseList } from 'redux/actions/courseActions';

function DashboardCoursesPage({ history }) {
  // REDUX
  const dispatch = useDispatch();
  // Get Auth Info
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  // Get Course List
  const courseList = useSelector(state => state.courseList);
  const { loading, error, courses } = courseList;

  useEffect(() => {
    // Redirect to Home page if Current User not an Admin or User haven't logged in;
    if (userInfo || userInfo?.isAdmin) {
      dispatch(getCourseList());
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo]);

  return (
    <Layout pageTitle='- Profile'>
      <Hero heroBg='/images/bg9.jpg'>
        <div className='hero__content'>
          <h1>Courses</h1>
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
                          {course.instructor.fullName}
                        </td>
                        <td data-label='Rating'>{course.rating.toFixed(1)}</td>
                        <td data-label='Reviews'>{course.numReviews}</td>
                        <td data-label='Last Updated'>
                          {course.updatedAt && DateFormatter(course.updatedAt)}
                        </td>
                        <td>
                          <Link
                            className='btn btn-outline-primary'
                            to={`/dashboard/courses/edit/${course.category}/${course._id}`}
                          >
                            Edit
                          </Link>
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

export default DashboardCoursesPage;
