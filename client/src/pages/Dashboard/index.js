import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
//COMPONENTS
import Layout from '../../components/layout';
import Hero from '../../components/layout/Hero';
// REACT-ICONS
import { ImUsers, ImBook } from 'react-icons/im';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getCourseList } from '../../redux/actions/courseActions';

function DashboardPage({ history }) {
  // REDUX
  const dispatch = useDispatch();
  // Get Auth Info
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getCourseList());
    // Redirect to Home page if Current User not an Admin or User haven't logged in;
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/');
    }
  }, [dispatch, history, userInfo]);

  return (
    <Layout pageTitle='- Profile'>
      <Hero heroBg='/images/bg9.jpg'>
        <div className='hero__content'>
          <h1>Admin Dashboard</h1>
        </div>
      </Hero>
      <div className='container'>
        <section>
          <div className='grid col-2'>
            <Link className='nav__card' to='/dashboard/users'>
              <ImUsers /> Users
            </Link>
            <Link className='nav__card' to='/dashboard/courses'>
              <ImBook /> Courses
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default DashboardPage;
