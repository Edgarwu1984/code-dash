import React from 'react';
import Layout from '../components/layout';
import Hero from '../components/layout/Hero';

function AboutPage() {
  return (
    <Layout pageTitle='- About'>
      <Hero heroBg='/images/bg3.jpg'>
        <div className='hero__content'>
          <h1>About Us</h1>
          <p>
            Sollicitudin eros nulla mus donec quisque convallis integer
            condimentum volutpat.
          </p>
        </div>
      </Hero>
      <div className='container'>
        <h2>About</h2>
      </div>
    </Layout>
  );
}

export default AboutPage;
