import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// COMPONENTS
import Layout from 'components/layout';
import Hero from 'components/layout/Hero';
import SectionTitle from 'components/common/SectionTitle';
import ScrollToTop from 'components/common/ScrollToTop';
import CourseCategoryList from 'components/CourseCategoryList';
// UTILITIES
import ResetPagePosition from 'utils/ResetPagePosition';

function CoursesPage() {
  // RESET PAGE POSITION
  const pathname = useLocation().pathname;
  ResetPagePosition(pathname);

  return (
    <Layout pageTitle='- Course'>
      <ScrollToTop />
      <Hero heroBg='/images/bg2.jpg'>
        <div className='hero__content'>
          <h1>Learning That Gets You</h1>
          <p>Skills for your present (and your future). Get started with us.</p>
        </div>
      </Hero>
      <div className='container'>
        <section className='courses__section'>
          <SectionTitle title='web development courses' />
          <CourseCategoryList />
          <div className='list-link__btn'>
            <Link className='btn btn-outline-primary' to='/courses/web-dev'>
              See More
            </Link>
          </div>
        </section>
        <section className='courses__section'>
          <SectionTitle title='game development courses' />
          <CourseCategoryList category='game-dev' />
          <div className='list-link__btn'>
            <Link className='btn btn-outline-primary' to='/courses/game-dev'>
              See More
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default CoursesPage;
