import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import InstructorCard from '../components/InstructorCard';
// COMPONENTS
import Layout from '../components/layout';
import Hero from '../components/layout/Hero';
import ScrollToTop from '../components/ScrollToTop';
// UTILITIES
import ResetPagePosition from '../utils/ResetPagePosition';
// REACT ICONS
import { FaQuoteRight } from 'react-icons/fa';

function AboutPage() {
  // RESET PAGE POSITION
  const pathname = useLocation();
  ResetPagePosition(pathname);

  useEffect(() => {}, []);
  return (
    <Layout pageTitle='- About'>
      <ScrollToTop />
      <Hero heroBg='/images/bg3.jpg'>
        <div className='hero__content'>
          <h1>About Us</h1>
          <p>
            Sollicitudin eros nulla mus donec quisque convallis integer
            condimentum volutpat.
          </p>
        </div>
      </Hero>
      <section className='about-intro__wrap'>
        <div className='container'>
          <div className='about__intro'>
            <h3>Industry Standards Course</h3>
            <p>
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
              Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
              Erat, Sed Diam.
            </p>
            <hr />
          </div>
          <div className='about__comment'>
            <blockquote className='about__comment-blockquote'>
              <FaQuoteRight className='quote__icon' />
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam.
            </blockquote>
            <div className='about__comment-avatar__info'>
              <img
                className='avatar__img'
                src='https://randomuser.me/api/portraits/men/21.jpg'
                alt='ceo-roy-webb'
              />
              <div className='avatar__name'>
                <h4>Roy Webb</h4>
                <small>Executive Chairman</small>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='about-instructor__wrap'>
        <div className='container'>
          <h3>Learn with our popular Instructors</h3>
          <div className='grid col-2'>
            <InstructorCard />
            <InstructorCard />
            <InstructorCard />
            <InstructorCard />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;
