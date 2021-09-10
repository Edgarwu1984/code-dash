import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// COMPONENTS
import Layout from '../../components/layout';
import Hero from '../../components/layout/Hero';
import SectionTitle from '../../components/SectionTitle';
import AlertMessage from '../../components/common/AlertMessage';
import Loader from '../../components/common/Loader';
import CourseCard from '../../components/CourseCard';
import ScrollToTop from '../../components/common/ScrollToTop';
// UTILITIES
import ResetPagePosition from '../../utils/ResetPagePosition';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getInstructorCourseList } from '../../redux/actions/courseActions';
import { getInstructorDetails } from '../../redux/actions/instructorActions';

function CourseInstructorPage({ match }) {
  // RESET PAGE POSITION
  const pathname = useLocation().pathname;
  ResetPagePosition(pathname);

  const instructorId = match.params.id;

  // REDUX
  const dispatch = useDispatch();
  const instructorCourseList = useSelector(state => state.instructorCourseList);
  const { loading, error, courses } = instructorCourseList;
  const instructorDetails = useSelector(state => state.instructorDetails);
  const {
    loading: instructorLoading,
    error: instructorError,
    instructor,
  } = instructorDetails;

  useEffect(() => {
    dispatch(getInstructorDetails(instructorId));
    dispatch(getInstructorCourseList(instructorId));
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
              <h3 className='username'>
                {instructor.firstName} {instructor.lastName}
              </h3>
              <small>Total Courses: {courses.length}</small>
            </div>
          )
        )}
      </Hero>
      <div className='container'>
        <section className='courses__section'>
          <SectionTitle
            title={`${instructor.firstName && instructor.firstName}'s courses`}
          />
          {loading ? (
            <Loader />
          ) : error ? (
            <AlertMessage message={error} type='danger' />
          ) : (
            <div className='grid col-4'>
              {courses &&
                courses.map(course => (
                  <CourseCard
                    key={course._id}
                    courseId={course._id}
                    category={course.category}
                    courseCategory={course.courseCategory}
                    courseImg={course.image}
                    courseName={course.name}
                    courseTutorId={course.instructor._id}
                    courseTutorFirstName={
                      course.instructor.firstName && course.instructor.firstName
                    }
                    courseTutorLastName={
                      course.instructor.lastName && course.instructor.lastName
                    }
                    courseDescription={course.description}
                    courseRating={course.rating}
                    numReviews={course.numReviews}
                  />
                ))}
            </div>
          )}
          <div className='list-link__btn'>
            <Link className='btn' to='/courses'>
              See More Courses
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default CourseInstructorPage;
