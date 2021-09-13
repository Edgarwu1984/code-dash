import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import { getCourseCategoryList } from '../../redux/actions/courseActions';
import Breadcrumb from '../../components/common/Breadcrumb';

function CourseCategoryPage({ match }) {
  // RESET PAGE POSITION
  const pathname = useLocation().pathname;
  ResetPagePosition(pathname);

  const category = match.params.category;

  // REDUX
  const dispatch = useDispatch();
  const courseCategoryList = useSelector(state => state.courseCategoryList);
  const { loading, error, courses } = courseCategoryList;

  useEffect(() => {
    dispatch(getCourseCategoryList(category));
  }, [dispatch, category]);

  return (
    <Layout pageTitle='- Course'>
      <ScrollToTop />
      <Hero
        heroBg={
          category === 'web-dev' ? ' /images/bg7.jpg' : ' /images/bg8.jpg'
        }
      >
        <div className='hero__content'>
          <Breadcrumb match={match} />
          <div className='hero__content-text'>
            <h1>Learning That Gets You</h1>
            <p>
              Skills for your present (and your future). Get started with us.
            </p>
          </div>
        </div>
      </Hero>
      <div className='container'>
        <section className='courses__section'>
          <SectionTitle
            title={
              category === 'web-dev'
                ? 'web development courses'
                : 'game development courses'
            }
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
                    courseTutorId={
                      course.instructor._id && course.instructor._id
                    }
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
        </section>
      </div>
    </Layout>
  );
}

export default CourseCategoryPage;
