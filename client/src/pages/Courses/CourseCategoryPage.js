import React from 'react';
import { useLocation } from 'react-router-dom';
// COMPONENTS
import Layout from '../../components/layout';
import Hero from '../../components/layout/Hero';
import SectionTitle from '../../components/common/SectionTitle';
import CourseList from '../../components/CourseList';
import ScrollToTop from '../../components/common/ScrollToTop';
import Breadcrumb from '../../components/common/Breadcrumb';
// UTILITIES
import ResetPagePosition from '../../utils/ResetPagePosition';

function CourseCategoryPage({ match }) {
  // RESET PAGE POSITION
  const pathname = useLocation().pathname;
  ResetPagePosition(pathname);

  const category = match.params.category;

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
          <CourseList category={category} />
        </section>
      </div>
    </Layout>
  );
}

export default CourseCategoryPage;
