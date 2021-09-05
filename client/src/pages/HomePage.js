import React, { useEffect } from 'react';
// COMPONENTS
import Layout from '../components/layout';
import Hero from '../components/layout/Hero';
import CourseCard from '../components/CourseCard';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
// UTILITIES
import ResetPagePosition from '../utils/ResetPagePosition';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getCourseList } from '../redux/actions/courseActions';
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';
import { Link, useLocation } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

function HomePage() {
  // RESET PAGE POSITION
  const pathname = useLocation().pathname;
  ResetPagePosition(pathname);

  // REDUX
  const dispatch = useDispatch();
  const courseList = useSelector(state => state.courseList);
  const { loading, error, courses } = courseList;

  useEffect(() => {
    dispatch(getCourseList());
  }, [dispatch]);

  const topCourses = courses.filter(c => c.rating >= 4.9);

  return (
    <Layout>
      <ScrollToTop />
      <Hero heroHeight='720px'>
        <div className='hero__content hero__main'>
          <h1>Learn From Industry Experts</h1>
          <p style={{ marginBottom: '3rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            maximus tortor at diam gravida posuere. Curabitur et malesuada mi.
          </p>

          <div>
            <Link to='/courses' className='btn'>
              Get Started
            </Link>
          </div>
        </div>
      </Hero>
      <section className='feature-card__wrap'>
        <div className='container'>
          <div className='grid col-3'>
            <FeatureCard
              featureTitle='Actionable Training'
              featureText='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy et magna.'
            />
            <FeatureCard
              featureIcon='/images/icons/plugin.png'
              featureTitle='Interesting Quizzes'
              featureText='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy et magna.'
            />
            <FeatureCard
              featureIcon='/images/icons/school-material.png'
              featureTitle='Premium Material'
              featureText='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy et magna.'
            />
          </div>
        </div>
      </section>
      <section className='top-course__wrap'>
        <div className='container'>
          <header className='section__header'>
            <h3>Most Popular Courses</h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna.
            </p>
          </header>

          {loading ? (
            <Loader />
          ) : error ? (
            <AlertMessage message={error} type='danger' />
          ) : (
            <div className='grid col-4'>
              {topCourses &&
                topCourses.map(course => (
                  <CourseCard
                    key={course._id}
                    category={course.category}
                    courseId={course._id}
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
        </div>
      </section>
      <section className='industry-brand__wrap'>
        <div className='container'>
          <header className='section__header'>
            <h3>Industry Relation</h3>
          </header>
          <div className='industry-icon__wrap'>
            <img className='icon' src='/images/icons/logo-1.svg' alt='logo1' />
            <img className='icon' src='/images/icons/logo-2.svg' alt='logo2' />
            <img className='icon' src='/images/icons/logo-3.svg' alt='logo3' />
            <img className='icon' src='/images/icons/logo-4.svg' alt='logo4' />
            <img className='icon' src='/images/icons/logo-5.svg' alt='logo5' />
          </div>
        </div>
      </section>
      <section className='testimonial__wrap'>
        <div className='container'>
          <header className='section__header'>
            <h3>What Our Students Said</h3>
          </header>
          <div className='grid col-3'>
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default HomePage;
