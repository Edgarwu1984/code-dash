import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// COMPONENTS
import Layout from 'components/layout';
import Hero from 'components/layout/Hero';
import FeatureCard from 'components/cards/FeatureCard';
import ScrollToTop from 'components/common/ScrollToTop';
import TopCourseList from 'components/TopCourseList';
import TopReviewList from 'components/TopReviewList';
// UTILITIES
import ResetPagePosition from 'utils/ResetPagePosition';

function HomePage() {
  // RESET PAGE POSITION
  const pathname = useLocation().pathname;
  ResetPagePosition(pathname);

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
          <TopCourseList />
          {/* <CourseList isTopCourses={true} /> */}
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
          <TopReviewList />
        </div>
      </section>
    </Layout>
  );
}

export default HomePage;
