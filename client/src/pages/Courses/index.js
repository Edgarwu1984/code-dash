import React from 'react';
import { Layout } from '../../components/layout';
import { Hero } from '../../components/layout/Hero';

function CoursesPage() {
  return (
    <Layout pageTitle='- Course'>
      <Hero heroBg='/images/bg2.jpg'>
        <div className='hero__content'>
          <h1>Learning That Gets You</h1>
          <p>Skills for your present (and your future). Get started with us.</p>
        </div>
      </Hero>
      <div className='container'>
        <h2>Courses</h2>
      </div>
    </Layout>
  );
}

export default CoursesPage;
