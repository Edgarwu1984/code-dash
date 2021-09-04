import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// COMPONENTS
import Layout from '../../components/layout';
import Hero from '../../components/layout/Hero';
import SectionTitle from '../../components/SectionTitle';
import AlertMessage from '../../components/AlertMessage';
import Loader from '../../components/Loader';
import CourseCard from '../../components/CourseCard';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getCourseList } from '../../redux/actions/courseActions';

function CoursesPage() {
  const dispatch = useDispatch();

  const courseList = useSelector(state => state.courseList);
  const { loading, error, courses } = courseList;

  useEffect(() => {
    dispatch(getCourseList());
  }, [dispatch]);

  const webCourses = courses && courses.filter(c => c.category === 'web-dev');
  const gameCourses = courses && courses.filter(c => c.category === 'game-dev');

  return (
    <Layout pageTitle='- Course'>
      <Hero heroBg='/images/bg2.jpg'>
        <div className='hero__content'>
          <h1>Learning That Gets You</h1>
          <p>Skills for your present (and your future). Get started with us.</p>
        </div>
      </Hero>
      <div className='container'>
        <section className='courses__section'>
          <SectionTitle title='web development courses' />
          {loading ? (
            <Loader />
          ) : error ? (
            <AlertMessage message={error} type='danger' />
          ) : (
            <div className='grid col-4'>
              {webCourses &&
                webCourses.map(course => (
                  <CourseCard
                    key={course._id}
                    courseId={course._id}
                    category={course.category}
                    courseCategory={course.courseCategory}
                    courseImg={course.image}
                    courseName={course.name}
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
            <Link className='btn' to='/course/web-development'>
              See More
            </Link>
          </div>
        </section>
        <section className='courses__section'>
          <SectionTitle title='game development courses' />
          {loading ? (
            <Loader />
          ) : error ? (
            <AlertMessage message={error} type='danger' />
          ) : (
            <div className='grid col-4'>
              {gameCourses &&
                gameCourses.map(course => (
                  <CourseCard
                    key={course._id}
                    courseId={course._id}
                    category={course.category}
                    courseCategory={course.courseCategory}
                    courseImg={course.image}
                    courseName={course.name}
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
            <Link className='btn' to='/course/game-development'>
              See More
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default CoursesPage;
