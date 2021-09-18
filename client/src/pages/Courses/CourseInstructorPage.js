import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// COMPONENTS
import Layout from '../../components/layout';
import Hero from '../../components/layout/Hero';
import SectionTitle from '../../components/common/SectionTitle';
import AlertMessage from '../../components/common/AlertMessage';
import Loader from '../../components/common/Loader';
import ScrollToTop from '../../components/common/ScrollToTop';
import CourseList from '../../components/CourseList';
// UTILITIES
import ResetPagePosition from '../../utils/ResetPagePosition';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getInstructorDetails } from '../../redux/actions/instructorActions';

function CourseInstructorPage({ match }) {
  // RESET PAGE POSITION
  const pathname = useLocation().pathname;
  ResetPagePosition(pathname);

  const instructorId = match.params.id;

  // REDUX
  const dispatch = useDispatch();

  const instructorDetails = useSelector(state => state.instructorDetails);
  const {
    loading: instructorLoading,
    error: instructorError,
    instructor,
  } = instructorDetails;

  useEffect(() => {
    dispatch(getInstructorDetails(instructorId));
  }, [dispatch, instructorId]);

  return (
    <Layout pageTitle='- Course'>
      <ScrollToTop />
      <Hero heroBg='/images/bg7.jpg'>
        {instructorLoading ? (
          <Loader />
        ) : instructorError ? (
          <AlertMessage error={instructorError} />
        ) : (
          instructor && (
            <div className='user-info__wrap'>
              <img className='photo' src={instructor.photo} alt='user_photo' />
              <h3 className='username'>{instructor.fullName}</h3>
            </div>
          )
        )}
      </Hero>
      <div className='container'>
        <section className='courses__section'>
          <SectionTitle
            title={`${instructor.firstName && instructor.firstName}'s courses`}
          />
          <CourseList isInstructorCourses={true} instructorId={instructorId} />
          <div className='list-link__btn'>
            <Link className='btn btn-outline-primary' to='/courses'>
              See More Courses
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default CourseInstructorPage;
